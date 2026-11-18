// Writes the OpenAPI description of Gotenberg, built from the docs' reference
// data (scripts/openapi.mjs), to static/openapi.yaml, which the site serves.
//
//   npm run sync:openapi

import { writeFileSync } from "node:fs";
import path from "node:path";
import { openapi } from "./openapi.mjs";

const root = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "..",
);

const out = path.join(root, "static/openapi.yaml");
writeFileSync(out, await openapi(out));
console.log(`OpenAPI description written to ${path.relative(root, out)}`);
