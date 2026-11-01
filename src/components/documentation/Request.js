import React from "react";
import CodeBlock from "@theme/CodeBlock";
import { curl } from "@site/src/lib/requests";
import styles from "./Request.module.css";

// A request as copyable cURL, built from its parts, then its response when
// given. Files are names, or { field, name } for a field other than "files".
// Fields that hold an array print one item per line. The cURL text also lands
// in data-curl: scripts/check-examples.mjs runs it against a Gotenberg
// container and expects data-status, unless run is false.
export default function Request({
  route,
  files = [],
  fields = {},
  stages,
  headers = {},
  output,
  response,
  responseLanguage = "text",
  status = 200,
  run = true,
}) {
  const args = files.map((file) =>
    typeof file === "string"
      ? ["form", "files", file, "file"]
      : ["form", file.field, file.name, "file"],
  );
  Object.entries(fields).forEach(([name, value]) => {
    if (Array.isArray(value)) args.push(["form", name, value, "list"]);
    else if (typeof value === "object") {
      args.push(["form", name, JSON.stringify(value)]);
    } else args.push(["form", name, String(value)]);
  });
  if (stages) args.push(["form", "stages", stages, "list"]);
  Object.entries(headers).forEach(([name, value]) =>
    args.push(["header", name, value]),
  );
  const { text } = curl(route, args, output);

  return (
    <div
      className={styles.request}
      data-curl={text}
      data-status={status}
      data-run={run ? undefined : "false"}
    >
      <CodeBlock language="bash">{text}</CodeBlock>
      {response && (
        <CodeBlock language={responseLanguage} title="Response">
          {response.trim()}
        </CodeBlock>
      )}
    </div>
  );
}
