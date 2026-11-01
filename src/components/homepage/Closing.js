import React from "react";
import cx from "./cx";
import { CopyButton, StarIcon, StartButton } from "./ui";

const RUN = 'docker run --rm -p "3000:3000" gotenberg/gotenberg:9';

function Stat({ href, n, label }) {
  return (
    <a className={cx("xb-stat")} href={href}>
      <span className={cx("xb-stat__n")}>{n}</span>
      <span className={cx("xb-stat__l")}>{label}</span>
    </a>
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
            <div className={cx("xb-endbox__cmd")}>
              <div className={cx("g9-code")}>
                <div className={cx("ln pr")}>
                  <span className={cx("t-c")}>docker run</span>{" "}
                  <span className={cx("t-f")}>--rm -p</span>{" "}
                  <span className={cx("t-s")}>"3000:3000"</span>{" "}
                  gotenberg/gotenberg:9
                </div>
              </div>
              <CopyButton text={RUN} />
            </div>
            <div className={cx("xb-btns")}>
              <StartButton />
              <a
                className={cx("xb-btn xb-btn--ghost")}
                href="https://github.com/gotenberg/gotenberg"
              >
                Star on GitHub
                <span className={cx("xb-btn__icon")}>
                  <StarIcon size={17} />
                </span>
              </a>
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
          </div>
          <div className={cx("xb-endbox__stats")}>
            <Stat href="#architectures" n="5" label="CPU architectures" />
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
