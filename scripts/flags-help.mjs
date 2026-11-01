// Reads the flags of a Gotenberg image from its --help, shared by
// sync-flags.mjs and check-api.mjs.

import { spawnSync } from "node:child_process";

export function flagsFromHelp(image) {
  // The help goes to stderr.
  const run = spawnSync(
    "docker",
    ["run", "--rm", image, "gotenberg", "--help"],
    {
      encoding: "utf8",
    },
  );
  if (run.error) throw run.error;

  const flags = [];
  for (const line of (run.stdout + run.stderr).split("\n")) {
    // "      --api-port int      Set the port ... (default 3000)". A boolean
    // flag has no type; the description sits two or more spaces away.
    const m = line.match(/^\s+--([a-z0-9-]+)(?: ([a-zA-Z0-9]+))?\s{2,}(.*)$/);
    if (!m) continue;
    const [, name, type = "bool", text] = m;
    const d = text.match(/^(.*?)\s*\(default (.*)\)$/);
    let defaultValue = d ? d[2] : null;
    if (defaultValue?.startsWith('"') && defaultValue.endsWith('"')) {
      defaultValue = defaultValue.slice(1, -1);
    }
    flags.push({
      name,
      module: name.split("-")[0],
      env: name.toUpperCase().replaceAll("-", "_"),
      type,
      default: defaultValue,
      description: (d ? d[1] : text).trim(),
    });
  }
  if (flags.length === 0) throw new Error(`no flag in the help of ${image}`);
  return flags;
}
