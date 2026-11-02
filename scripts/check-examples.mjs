// Runs every <Request> example of a built site against a Gotenberg container,
// exactly as a reader would copy it, from the examples/ folder that holds the
// files the examples upload.
//
//   npm run build
//   docker run --rm -p "3000:3000" gotenberg/gotenberg:9
//   npm run check:examples
//
// GOTENBERG_URL points at another container (default http://localhost:3000).
// BUILD_DIR points at another build (default build).

import { execFileSync } from "node:child_process";
import {
  cpSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const root = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "..",
);
const buildDir = path.resolve(root, process.env.BUILD_DIR ?? "build");
const fixtures = path.join(root, "examples");
const gotenberg = process.env.GOTENBERG_URL ?? "http://localhost:3000";

const unescape = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(p);
    return entry.name.endsWith(".html") ? [p] : [];
  });
}

// One example per distinct command, with the pages that show it.
const examples = new Map();
for (const file of htmlFiles(buildDir)) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(/<div[^>]*\bdata-curl="([^"]*)"[^>]*>/g)) {
    const tag = m[0];
    const command = unescape(m[1]);
    const status = tag.match(/\bdata-status="(\d+)"/)?.[1] ?? "200";
    const run = !/\bdata-run="false"/.test(tag);
    const sub = tag.match(/\bdata-dir="([^"]*)"/)?.[1] ?? "";
    const host =
      tag.match(/\bdata-host="([^"]*)"/)?.[1] ?? "http://localhost:3000";
    const page = "/" + path.relative(buildDir, file).replace(/\.html$/, "");
    const example = examples.get(command) ?? {
      status,
      run,
      sub,
      host,
      pages: [],
    };
    example.pages.push(page);
    examples.set(command, example);
  }
}

let failed = 0;
let skipped = 0;
for (const [command, { status, run, sub, host, pages }] of examples) {
  const where = [...new Set(pages)].join(", ");
  if (!run) {
    skipped++;
    console.log(`SKIP ${where}\n${command}\n`);
    continue;
  }
  const dir = mkdtempSync(path.join(tmpdir(), "gotenberg-example-"));
  cpSync(fixtures, dir, { recursive: true });
  // The reader's command, pointed at the container, writing its status out.
  const script = `${command.replaceAll(host, gotenberg)} --silent --show-error --write-out '%{http_code}' --output /dev/null`;
  let got;
  try {
    got = execFileSync("sh", ["-c", script], {
      cwd: path.join(dir, sub),
      encoding: "utf8",
    })
      .trim()
      .slice(-3);
  } catch (error) {
    got = `error: ${error.stderr || error.message}`.trim();
  }
  rmSync(dir, { recursive: true, force: true });
  if (got === status) {
    console.log(`OK   ${status} ${where}`);
  } else {
    failed++;
    console.log(`FAIL ${where}: want ${status}, got ${got}\n${command}\n`);
  }
}

console.log(
  `\n${examples.size} examples: ${examples.size - failed - skipped} passed, ${failed} failed, ${skipped} skipped.`,
);
process.exit(failed ? 1 : 0);
