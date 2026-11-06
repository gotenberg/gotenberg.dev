import React from "react";
import Link from "@docusaurus/Link";
import cx from "./cx";
import { GitHubIcon, RunCommand, StartButton } from "./ui";

function Stat({ href, n, label }) {
  // The arrow travels with the last word: a narrow column wraps the label
  // between its words, never before the arrow.
  const cut = label.lastIndexOf(" ") + 1;
  return (
    <Link className={cx("xb-stat")} href={href}>
      <span className={cx("xb-stat__n")}>{n}</span>
      <span className={cx("xb-stat__l")}>
        {label.slice(0, cut)}
        <span className={cx("xb-stat__end")}>
          {label.slice(cut)}
          <svg
            className={cx("xb-stat__icon")}
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17L17 7M8 7h9v9" />
          </svg>
        </span>
      </span>
    </Link>
  );
}

export default function Closing() {
  return (
    <section className={cx("cb-end")}>
      <div className={cx("g9-wrap")}>
        <div className={cx("cb-end__box xb-endbox")}>
          <div className={cx("xb-endbox__main")}>
            <h2>
              Start with <span>one command.</span>
            </h2>
            <RunCommand />
            <div className={cx("xb-btns")}>
              <StartButton />
              <Link
                className={cx("xb-btn xb-btn--ghost")}
                href="https://github.com/gotenberg/gotenberg"
              >
                <GitHubIcon />
                Star on GitHub
              </Link>
            </div>
          </div>
          <div className={cx("xb-endbox__stats")}>
            <Stat
              href="https://hub.docker.com/r/gotenberg/gotenberg"
              n="100M+"
              label="Docker pulls"
            />
            <Stat
              href="https://github.com/gotenberg/gotenberg"
              n="13k+"
              label="GitHub stars"
            />
            <Stat
              href="https://github.com/gotenberg/gotenberg/blob/main/LICENSE"
              n="MIT"
              label="License"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
