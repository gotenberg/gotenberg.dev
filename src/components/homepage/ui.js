import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import cx from "./cx";

export function StartButton() {
  return (
    <Link className={cx("btn btn--go")} to="/docs/getting-started/first-pdf">
      Getting started
      <span className={cx("btn__icon")}>
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

export function GitHubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function StarIcon({ size }) {
  return (
    <svg
      className={cx("btn__star")}
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

// Says "Copied" only once the clipboard took the text.
export function CopyButton({ text, label = "Copy the command" }) {
  const [done, setDone] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setDone(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 1400);
  };

  return (
    <button
      type="button"
      className={cx("copy", done && "is-done")}
      onClick={copy}
      aria-label={done ? "Copied" : label}
    >
      <svg
        className={cx("copy__i")}
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
        className={cx("copy__ok")}
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
      <span className={cx("copy__tip")} aria-hidden="true">
        Copied
      </span>
    </button>
  );
}

// "More than 100 million": Docker Hub reported 105,406,813 pulls of
// gotenberg/gotenberg on 2026-11-11 (hub.docker.com/v2/repositories/
// gotenberg/gotenberg, pull_count). Each sentence holds together: where
// both don't fit one line, the line breaks between them.
export function Facts({ className }) {
  return (
    <p className={cx("facts", className)}>
      <span>
        Open source under the{" "}
        <Link href="https://github.com/gotenberg/gotenberg/blob/main/LICENSE">
          MIT license
        </Link>
        .
      </span>{" "}
      <span>
        Pulled from{" "}
        <Link href="https://hub.docker.com/r/gotenberg/gotenberg">
          Docker Hub
        </Link>{" "}
        more than 100 million times.
      </span>
    </p>
  );
}

const RUN = 'docker run --rm -p "3000:3000" gotenberg/gotenberg:9';

// The command that starts Gotenberg, with its copy button.
export function RunCommand() {
  return (
    <div className={cx("run")}>
      <div className={cx("code__lines")}>
        <div className={cx("ln pr wrap")}>
          <span className={cx("t-c")}>docker run</span>{" "}
          <span className={cx("t-f")}>--rm -p</span>{" "}
          <span className={cx("t-s")}>"3000:3000"</span> gotenberg/gotenberg:9
        </div>
      </div>
      <CopyButton text={RUN} />
    </div>
  );
}

// A line that may wrap does so between its words only: each word is kept
// whole, so a URL or a header name never breaks in two. The backslash that
// continues a line stays with the word before it.
const words = (text) =>
  text === " \\" ? (
    <span className={cx("word")}>{text}</span>
  ) : (
    text.split(/(\s+)/).map((word, i) =>
      word.trim() ? (
        <span key={i} className={cx("word")}>
          {word}
        </span>
      ) : (
        word
      ),
    )
  );

// A URL may break between its origin and its path, where a narrow panel
// lets its lines wrap: the route then starts its own row, whole.
const url = (text) => {
  const [, origin, path] = text.match(/^(\w+:\/\/[^/]+)(\/.+)$/) || [];
  return path ? (
    <>
      {origin}
      <wbr />
      {path}
    </>
  ) : (
    text
  );
};

const text = (line, p) =>
  /\bwrap\b/.test(line.cls) ? words(p.t) : p.c === "t-u" ? url(p.t) : p.t;

// Highlighted lines from requests.js. A line with an `indent` hangs: its
// next rows start under its first one (.hang).
export function CodeLines({ lines }) {
  return (
    <div className={cx("code__lines")} data-scroller="">
      {lines.map((line, i) => (
        <div
          key={i}
          className={cx(line.cls)}
          style={line.indent == null ? undefined : { "--indent": line.indent }}
        >
          {line.parts.map((p, j) => (
            <span key={j} className={cx(p.c) || undefined}>
              {text(line, p)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// A request with its copy button, or lines to read when there is no text
// to copy, then what Gotenberg answers when the part shows it.
export function CodePanel({ title, request, reply }) {
  return (
    <div className={cx("code")}>
      <div className={cx("code__bar")}>
        <span>{title}</span>
        {request.text && (
          <CopyButton text={request.text} label="Copy the request" />
        )}
      </div>
      <CodeLines lines={request.lines} />
      {reply && (
        <>
          <div className={cx("code__bar code__bar--res")}>{reply.status}</div>
          <CodeLines lines={reply.lines} />
        </>
      )}
    </div>
  );
}
