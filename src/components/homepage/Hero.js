import React from "react";
import Link from "@docusaurus/Link";
import cx from "./cx";
import Scene from "./Scene";
import { GitHubIcon, RunCommand, StarIcon, StartButton } from "./ui";

export default function Hero() {
  return (
    <section className={cx("hero")}>
      <div className={cx("col hero__txt")}>
        <h1 className={cx("hero__h")}>
          The PDF <br className={cx("hero__br")} />
          press,
          <br />
          <span>rebuilt.</span>
        </h1>
        <p className={cx("hero__lede")}>
          A Docker-based API for PDF. It converts web pages and office
          documents, then remediates, signs and delivers them in the same
          request.
        </p>
        <div className={cx("btns")}>
          <StartButton />
          <Link
            className={cx("btn")}
            href="https://github.com/gotenberg/gotenberg"
          >
            <GitHubIcon />
            GitHub
            <span className={cx("btn__count")}>
              <StarIcon size={15} />
              13k+
            </span>
          </Link>
        </div>
        <RunCommand />
      </div>
      <Scene />
    </section>
  );
}
