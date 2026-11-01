import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import cx from "./cx";

export function Section({ id, children }) {
  return (
    <section className={cx("cb-sec")} id={id}>
      <div className={cx("g9-wrap")}>{children}</div>
    </section>
  );
}

export function SectionHead({ n, kicker, title, accent, lede, children }) {
  return (
    <div className={cx("xb-head")}>
      <div>
        <span className={cx("xb-kicker")}>
          <b className={cx("xb-kicker__n")}>{n}</b>
          {kicker}
        </span>
        <h2 className={cx("cb-h2")}>
          {title} <span>{accent}</span>
        </h2>
      </div>
      <div>
        <p className={cx("xb-head__lede")}>{lede}</p>
        <p className={cx("xb-head__p")}>{children}</p>
      </div>
    </div>
  );
}

// A row of buttons where exactly one is on. Options are [value, label].
export function Segmented({ label, options, value, onChange, className }) {
  return (
    <div className={cx("xb-seg", className)} role="group" aria-label={label}>
      {options.map(([v, text]) => (
        <button
          key={v}
          type="button"
          className={cx(v === value && "is-on") || undefined}
          aria-pressed={v === value}
          onClick={() => onChange(v)}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

export function Switch({ on, onToggle, className, children }) {
  return (
    <button
      type="button"
      className={cx(className, on && "is-on")}
      aria-pressed={on}
      onClick={onToggle}
    >
      <span className={cx("xb-switch")} aria-hidden="true" />
      {children}
    </button>
  );
}

export function StartButton() {
  return (
    <Link
      className={cx("xb-btn xb-btn--primary")}
      to="/docs/getting-started/introduction"
    >
      Getting started
      <span className={cx("xb-btn__icon")}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

export function StarIcon({ size }) {
  return (
    <svg
      className={cx("xb-btn__star")}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
    </svg>
  );
}

export function CopyButton({ text }) {
  const [done, setDone] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setDone(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 1400);
  };

  return (
    <button
      type="button"
      className={cx("xb-copy", done && "is-done")}
      onClick={copy}
      aria-label={done ? "Copied" : "Copy the command"}
    >
      <svg
        className={cx("xb-copy__i")}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="9" y="9" width="11" height="11" rx="2.5" />
        <path d="M5 15V6.5A1.5 1.5 0 0 1 6.5 5H15" />
      </svg>
      <svg
        className={cx("xb-copy__ok")}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
      <span className={cx("xb-copy__tip")} aria-hidden="true">
        Copied
      </span>
    </button>
  );
}

// Highlighted lines from requests.js.
export function CodeLines({ lines }) {
  return (
    <div className={cx("g9-code")}>
      {lines.map((line, i) => (
        <div key={i} className={cx(line.cls)}>
          {line.parts.map((p, j) => (
            <span key={j} className={cx(p.c) || undefined}>
              {p.t}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function CodeBar({ title, copy }) {
  return (
    <div className={cx("xb-code__bar")}>
      <span>{title}</span>
      {copy && <CopyButton text={copy} />}
    </div>
  );
}

// A request, with its copy button, and its response when given.
export function CodePanel({ title, request, res }) {
  return (
    <div className={cx("xb-code")}>
      <CodeBar title={title} copy={request.text} />
      <CodeLines lines={request.lines} />
      {res && (
        <>
          <div className={cx("xb-sep")}>Response</div>
          <CodeLines lines={res} />
        </>
      )}
    </div>
  );
}
