// Builds the requests and responses the homepage's code panels and the docs'
// <Request> show. A line is { cls, parts }, a part is { t: text, c: highlight
// class }.

const part = (t, c = "") => ({ t, c });
const flat = (value) => JSON.stringify(value, null, 1).replace(/\n\s*/g, " ");

// A curl request as highlighted lines, plus its plain text for the
// clipboard. Each arg is [flag, name, value, kind]: kind "file" uploads,
// "url" highlights, "list" prints a JSON array one item per line. A HEAD
// request uses --head, since curl --request HEAD waits for a body.
export function curl(route, args, out, method = "POST") {
  const lines = [
    { cls: "ln pr", parts: [part("curl", "t-c")] },
    {
      cls: "ln in",
      parts: [
        ...(method === "HEAD"
          ? [part("--head", "t-f"), part(" ")]
          : [part("--request", "t-f"), part(` ${method} `)]),
        part("http://localhost:3000" + route, "t-u"),
      ],
    },
  ];
  args.forEach(([flag, name, value, kind]) => {
    if (flag === "header") {
      lines.push({
        cls: "ln in wrap",
        parts: [part("--header", "t-f"), part(` '${name}: ${value}'`, "t-s")],
      });
    } else if (kind === "list") {
      lines.push({
        cls: "ln in",
        open: true,
        parts: [part("--form", "t-f"), part(` '${name}=[`, "t-s")],
      });
      value.forEach((item, i) =>
        lines.push({
          cls: "ln in2 wrap",
          open: true,
          parts: [part(flat(item) + (i < value.length - 1 ? "," : ""), "t-s")],
        }),
      );
      lines.push({ cls: "ln in", parts: [part("]'", "t-s")] });
    } else if (kind === "file") {
      lines.push({
        cls: "ln in",
        parts: [part("--form", "t-f"), part(` ${name}=@${value}`)],
      });
    } else if (/[\s"'{[]/.test(value)) {
      lines.push({
        cls: "ln in wrap",
        parts: [part("--form", "t-f"), part(` '${name}=${value}'`, "t-s")],
      });
    } else {
      lines.push({
        cls: "ln in",
        parts: [
          part("--form", "t-f"),
          part(` ${name}=`),
          part(value, kind === "url" ? "t-u" : "t-s"),
        ],
      });
    }
  });
  if (out)
    lines.push({ cls: "ln in", parts: [part("-o", "t-f"), part(" " + out)] });
  lines.forEach((line, i) => {
    if (i < lines.length - 1 && !line.open) line.parts.push(part(" \\", "t-p"));
  });
  const pad = (cls) =>
    /\bin2\b/.test(cls) ? "    " : /\bin\b/.test(cls) ? "  " : "";
  const text = lines
    .map((line) => pad(line.cls) + line.parts.map((p) => p.t).join(""))
    .join("\n");
  return { lines, text };
}

// Highlights response rows: status, headers, comments and JSON.
export function response(rows) {
  return rows.map((row) => {
    if (row.startsWith("#")) return { cls: "ln wrap t-m", parts: [part(row)] };
    let m = row.match(/^(HTTP\/1\.1) (.*)$/);
    if (m)
      return { cls: "ln", parts: [part(m[1], "t-p"), part(" " + m[2], "t-u")] };
    m = row.match(/^([A-Z][A-Za-z-]+): (.*)$/);
    if (m) {
      return {
        cls: "ln wrap",
        parts: [
          part(m[1], "t-f"),
          part(": ", "t-p"),
          part(m[2], /^\d+$/.test(m[2]) ? "t-u" : ""),
        ],
      };
    }
    const parts = [];
    const re =
      /("(?:[^"\\]|\\.)*")(\s*:)?|(\btrue\b|\bfalse\b|-?\d+(?:\.\d+)?)|([{}[\],])|([^"{}[\],]+)/g;
    let t;
    while ((t = re.exec(row))) {
      if (t[1] && t[2]) parts.push(part(t[1], "t-f"), part(t[2], "t-p"));
      else if (t[1]) parts.push(part(t[1], "t-s"));
      else if (t[3]) parts.push(part(t[3], "t-u"));
      else if (t[4]) parts.push(part(t[4], "t-p"));
      else parts.push(part(t[5]));
    }
    return { cls: "ln", parts };
  });
}

// Pretty-prints JSON as rows, keeping short objects and arrays on one line.
export function json(value, indent = "", head = "") {
  const one = flat(value);
  if (
    value === null ||
    typeof value !== "object" ||
    indent.length + head.length + one.length <= 84
  ) {
    return [indent + head + one];
  }
  const isArray = Array.isArray(value);
  const keys = isArray ? value.map((_, i) => i) : Object.keys(value);
  const out = [indent + head + (isArray ? "[" : "{")];
  keys.forEach((k, i) => {
    const sub = json(
      value[k],
      indent + "  ",
      isArray ? "" : JSON.stringify(k) + ": ",
    );
    if (i < keys.length - 1) sub[sub.length - 1] += ",";
    out.push(...sub);
  });
  out.push(indent + (isArray ? "]" : "}"));
  return out;
}
