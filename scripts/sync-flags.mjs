// Writes src/data/flags.json from the help of a Gotenberg image, so the
// configuration reference lists exactly the flags the binary knows, with its
// own types, defaults and descriptions.
//
//   npm run sync:flags
//
// GOTENBERG_IMAGE picks the image (default gotenberg/gotenberg:9).

import { writeFileSync } from "node:fs";
import path from "node:path";
import { flagsFromHelp } from "./flags-help.mjs";

const root = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "..",
);
const image = process.env.GOTENBERG_IMAGE ?? "gotenberg/gotenberg:9";
const flags = flagsFromHelp(image);

const out = path.join(root, "src/data/flags.json");
writeFileSync(out, JSON.stringify({ image, flags }, null, 2) + "\n");
console.log(
  `${flags.length} flags from ${image} written to ${path.relative(root, out)}`,
);
