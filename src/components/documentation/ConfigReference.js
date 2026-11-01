import React, { useState } from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import data from "@site/src/data/flags.json";
import styles from "./ConfigReference.module.css";

const known = new Set(data.flags.map((flag) => flag.name));

const TYPES = {
  bool: "boolean",
  strings: "list",
  int: "integer",
  string: "string",
  duration: "duration",
};

// Links the flags a description names to their entries.
function linkFlags(text) {
  return text.split(/(--[a-z0-9-]+)/g).map((part, i) =>
    part.startsWith("--") && known.has(part.slice(2)) ? (
      <a key={i} href={`#${part.slice(2)}`}>
        {part}
      </a>
    ) : (
      part
    ),
  );
}

// The flags of one module, as src/data/flags.json lists them: generated from
// the image's --help by npm run sync:flags. Each flag is an anchor.
export default function ConfigReference({ module }) {
  const flags = data.flags.filter((flag) => flag.module === module);
  // Tells the build these anchors exist, so links to a flag are checked.
  const brokenLinks = useBrokenLinks();
  flags.forEach((flag) => brokenLinks.collectAnchor(flag.name));
  return (
    <div className={styles.list}>
      {flags.map((flag) => (
        <div
          key={flag.name}
          id={flag.name}
          className={styles.flag}
          data-flag={`${flag.name} ${flag.env} ${flag.description}`.toLowerCase()}
        >
          <div className={styles.head}>
            <a className={styles.name} href={`#${flag.name}`}>
              --{flag.name}
            </a>
            <code className={styles.env}>{flag.env}</code>
            <span className={styles.type}>{TYPES[flag.type] ?? flag.type}</span>
          </div>
          <p className={styles.description}>{linkFlags(flag.description)}</p>
          {flag.default !== null && (
            <p className={styles.default}>
              Default: <code>{flag.default}</code>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// Hides the flags that don't match what the reader types.
export function FlagFilter() {
  const [query, setQuery] = useState("");
  const filter = (value) => {
    setQuery(value);
    const q = value.trim().toLowerCase();
    document.querySelectorAll("[data-flag]").forEach((row) => {
      row.hidden = q !== "" && !row.dataset.flag.includes(q);
    });
  };
  return (
    <input
      className={styles.filter}
      type="search"
      placeholder="Filter flags: timeout, CHROMIUM_, proxy…"
      aria-label="Filter flags"
      value={query}
      onChange={(event) => filter(event.target.value)}
    />
  );
}
