// Checks the reference data against Gotenberg itself, so the docs can't drift
// from the API:
//
// - src/data/stages.json against the stage structs of a Gotenberg checkout
//   (GOTENBERG_SOURCE, default ../gotenberg): every op, every option name.
// - src/data/routes.json against the same checkout: every route path, every
//   form field the Chromium and LibreOffice routes read, every extension
//   LibreOffice converts.
// - src/data/flags.json against the --help of a Gotenberg image
//   (GOTENBERG_IMAGE, default gotenberg/gotenberg:9).
//
//   npm run check:api

import { readFileSync } from "node:fs";
import path from "node:path";
import { flagsFromHelp } from "./flags-help.mjs";

const root = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "..",
);
const source = path.resolve(
  root,
  process.env.GOTENBERG_SOURCE ?? "../gotenberg",
);
const image = process.env.GOTENBERG_IMAGE ?? "gotenberg/gotenberg:9";
const json = (p) => JSON.parse(readFileSync(path.join(root, p), "utf8"));

const problems = [];
const compare = (what, want, got) => {
  const missing = [...want].filter((x) => !got.has(x));
  const extra = [...got].filter((x) => !want.has(x));
  if (missing.length) problems.push(`${what}: missing ${missing.join(", ")}`);
  if (extra.length)
    problems.push(`${what}: not in Gotenberg ${extra.join(", ")}`);
};

// Stages: op() names each struct's op; json tags name its options.
const go = readFileSync(
  path.join(source, "pkg/modules/pdf/stage_types.go"),
  "utf8",
);
const opOf = new Map(
  [
    ...go.matchAll(
      /func \((?:\w+ )?\*?(\w+)\) op\(\) string\s*\{\s*return "([a-z-]+)"\s*\}/g,
    ),
  ].map((m) => [m[1], m[2]]),
);
const sourceStages = new Map();
for (const m of go.matchAll(/type (\w+) struct\s*\{([^]*?)\n?\}/g)) {
  const op = opOf.get(m[1]);
  if (!op) continue;
  sourceStages.set(
    op,
    new Set([...m[2].matchAll(/json:"([A-Za-z]+)/g)].map((t) => t[1])),
  );
}
const stages = json("src/data/stages.json").stages;
compare(
  "stages",
  new Set(sourceStages.keys()),
  new Set(stages.map((s) => s.op)),
);
for (const stage of stages) {
  const want = sourceStages.get(stage.op);
  if (want)
    compare(
      `stage ${stage.op}`,
      want,
      new Set(stage.options.map((o) => o.name)),
    );
}

// Routes: the paths the modules register. A stage route counts once, as
// {op}; the favicon, and the removed /forms/pdfengines paths that answer 404
// with their replacement, aren't documented.
const modules = (p) =>
  readFileSync(path.join(source, "pkg/modules", p), "utf8");
const sourceRoutes = new Set();
for (const file of [
  "chromium/routes.go",
  "libreoffice/routes.go",
  "pdf/routes.go",
]) {
  const go = modules(file);
  for (const m of go.matchAll(/Path:\s+"([^"]+)"(?:\s*\+\s*(\w+))?/g)) {
    if (!m[2] && !m[1].startsWith("/forms/pdfengines")) sourceRoutes.add(m[1]);
    else if (m[2] === "op") sourceRoutes.add(m[1] + "{op}");
  }
  for (const m of go.matchAll(/readRoute\(processor, "([a-z]+)"/g)) {
    sourceRoutes.add("/forms/pdf/" + m[1]);
  }
}
const api = modules("api/api.go");
if (/a\.srv\.GET\(\s*a\.rootPath,/.test(api)) sourceRoutes.add("/");
for (const m of api.matchAll(
  /a\.srv\.(?:GET|HEAD)\(\s*fmt\.Sprintf\("%s%s", a\.rootPath, "([a-z.]+)"\)/g,
)) {
  if (m[1] !== "favicon.ico") sourceRoutes.add("/" + m[1]);
}
const routes = json("src/data/routes.json");
compare("routes", sourceRoutes, new Set(routes.routes.map((r) => r.path)));

// Fields: the names each form-parsing function binds.
const bound = (go, fn) => {
  const body = go.match(new RegExp(`\\nfunc ${fn}\\([^]*?\\n\\}\\n`))?.[0];
  if (!body) {
    problems.push(`fields: no func ${fn} in Gotenberg`);
    return new Set();
  }
  return new Set(
    [
      ...body.matchAll(
        /(?:\.|\n\s*)(?:Mandatory)?(?:Bool|String|Strings|Custom|Int|Float64|Duration|Inches|Content|PaperSize|Path|Paths)\("([A-Za-z.]+)"/g,
      ),
      ...body.matchAll(/api\.JSON\(form, "([A-Za-z]+)"/g),
    ].map((m) => m[1]),
  );
};
const chromium = modules("chromium/routes.go");
const libreoffice = modules("libreoffice/routes.go");
for (const [group, want] of [
  ["chromium", bound(chromium, "FormDataChromiumOptions")],
  ["chromium-pdf", bound(chromium, "FormDataChromiumPdfOptions")],
  ["chromium-screenshot", bound(chromium, "FormDataChromiumScreenshotOptions")],
  ["libreoffice", bound(libreoffice, "convertRoute")],
]) {
  const got = new Set((routes.fields[group] ?? []).map((f) => f.name));
  compare(`fields ${group}`, want, got);
}

// Inputs: each field a route's card lists, beyond files and stages, is one
// its handler reads. A read route also reads readRoute's password.
const pdfGo = modules("pdf/routes.go");
const handlers = [chromium, libreoffice, pdfGo].flatMap((go) =>
  [...go.matchAll(/\nfunc (\w+)\([^]*?\n\}\n/g)].map((m) => ({
    go,
    fn: m[1],
    body: m[0],
  })),
);
for (const r of routes.routes) {
  const names = (r.input ?? [])
    .map((f) => f.name)
    .filter((name) => name !== "files" && name !== "stages");
  if (!names.length) continue;
  const marker = new RegExp(
    `Path:\\s+"${r.path}"|readRoute\\(processor, "${r.path.split("/").pop()}"`,
  );
  const handler = handlers.find((h) => marker.test(h.body));
  if (!handler) {
    problems.push(`input ${r.path}: no handler in Gotenberg`);
    continue;
  }
  const read = bound(handler.go, handler.fn);
  if (handler.go === pdfGo) {
    bound(pdfGo, "readRoute").forEach((name) => read.add(name));
  }
  const missing = names.filter((name) => !read.has(name));
  if (missing.length) {
    problems.push(`input ${r.path}: not in Gotenberg ${missing.join(", ")}`);
  }
}

// Extensions: what LibreOffice accepts.
const extensions = modules("libreoffice/api/api.go").match(
  /func \(a \*Api\) Extensions\(\) \[\]string \{([^]*?)\n\}/,
)?.[1];
compare(
  "libreoffice extensions",
  new Set(
    [...(extensions ?? "").matchAll(/"\.([a-z0-9]+)"/g)].map((m) => m[1]),
  ),
  new Set(routes.libreofficeExtensions),
);

// Flags: generated, so any difference means src/data/flags.json is stale.
const help = flagsFromHelp(image);
const data = json("src/data/flags.json").flags;
compare(
  "flags",
  new Set(help.map((f) => f.name)),
  new Set(data.map((f) => f.name)),
);
const byName = new Map(data.map((f) => [f.name, f]));
for (const flag of help) {
  const ours = byName.get(flag.name);
  if (ours && JSON.stringify(ours) !== JSON.stringify(flag)) {
    problems.push(
      `flag ${flag.name}: differs from the help, run npm run sync:flags`,
    );
  }
}

if (problems.length) {
  console.log(problems.join("\n"));
  process.exit(1);
}
const fields = Object.values(routes.fields).flat().length;
console.log(
  `${stages.length} stages, ${routes.routes.length} routes, ${fields} fields, ${routes.libreofficeExtensions.length} extensions and ${data.length} flags match Gotenberg.`,
);
