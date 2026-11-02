import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import styles from "./Options.module.css";

// Turns `backtick` spans of the data's text into code.
export function inline(text) {
  return text
    .split("`")
    .map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part));
}

// Stage options or route form fields, one row each: name, type, whether it's
// required, what it does, its default. Anchored rows take their name as id,
// so other pages can link to a field. className restyles the panel, such as
// inside an endpoint card.
export default function Options({ options, anchored = false, className }) {
  // Tells the build these anchors exist, so links to a field are checked.
  const brokenLinks = useBrokenLinks();
  if (anchored) options.forEach((o) => brokenLinks.collectAnchor(o.name));

  return (
    <div className={clsx(styles.options, className)}>
      {options.map((option) => (
        <div
          key={option.name}
          id={anchored ? option.name : undefined}
          className={styles.option}
        >
          <div className={styles.head}>
            {anchored ? (
              <a className={styles.name} href={`#${option.name}`}>
                {option.name}
              </a>
            ) : (
              <code className={styles.name}>{option.name}</code>
            )}
            <span className={styles.type}>
              {option.type === "pages" ? (
                <Link to="/docs/reference/stages#page-selections">pages</Link>
              ) : (
                option.type
              )}
            </span>
            {option.required && (
              <span className={styles.required}>required</span>
            )}
          </div>
          <p className={styles.description}>{inline(option.description)}</p>
          {option.default !== undefined && (
            <p className={styles.default}>
              Default: <code>{option.default}</code>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export function NoOptions() {
  return <p className={styles.none}>No options.</p>;
}
