// Checks the reference data against Gotenberg itself, so the docs can't drift
// from the API:
//
// - src/data/stages.json against the stage structs of a Gotenberg checkout
//   (GOTENBERG_SOURCE, default ../gotenberg): every op, every option name.
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
console.log(
  `${stages.length} stages and ${data.length} flags match Gotenberg.`,
);
