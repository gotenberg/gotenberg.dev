import React, { useState } from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import data from "@site/src/data/flags.json";
import styles from "./ConfigReference.module.css";

const known = new Set(data.flags.map((flag) => flag.name));

// The zero value --help leaves unprinted, per type. Strings and lists have
// none worth printing.
const ZERO = { bool: "false", int: "0", duration: "0s" };

const TYPES = {
  bool: "boolean",
  strings: "list",
  int: "integer",
  string: "string",
  duration: "duration",
};

// The literal values a --help description holds, which its plain text can't
// mark: a flag, a regex, a URL, an environment variable, a size, a quoted
// claim name, a bare number.
const VALUE =
  /(--[a-z0-9-]+)|(\^\S+)|(https?:\/\/[^\s,]+)|\b([A-Z][A-Z0-9]*_[A-Z0-9_]+)\b|\b(\d+(?:KB|MB|GB))\b|'([^'\s]+)'|(?<![\w.-])(\d+)(?![\w.])/g;

// Links the flags a description names to their entries, and sets its other
// values apart, so a regex or a variable name reads as one token.
function describe(text) {
  const parts = [];
  let last = 0;
  for (const m of text.matchAll(VALUE)) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [whole, flag] = m;
    if (flag && known.has(flag.slice(2))) {
      parts.push(
        <a key={m.index} href={`#${flag.slice(2)}`}>
          {flag}
        </a>,
      );
    } else if (flag) {
      parts.push(flag);
    } else {
      parts.push(
        <code key={m.index} className={styles.value}>
          {m.slice(2).find(Boolean)}
        </code>,
      );
    }
    last = m.index + whole.length;
  }
  parts.push(text.slice(last));
  return parts;
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
          <p className={styles.description}>{describe(flag.description)}</p>
          {/* --help prints no default for zero values, so a missing default
              reads as the type's zero value, not as an omission. */}
          <p className={styles.default}>
            Default:{" "}
            {(flag.default ?? ZERO[flag.type]) !== undefined ? (
              <code>{flag.default ?? ZERO[flag.type]}</code>
            ) : (
              "none"
            )}
          </p>
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
