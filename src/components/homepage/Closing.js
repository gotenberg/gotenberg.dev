import React from "react";
import Link from "@docusaurus/Link";
import cx from "./cx";
import { Box, Sheet, Stack, projector, stackTop } from "./iso";
import { GitHubIcon, RunCommand, StartButton } from "./ui";

// Where the sheets land: a second slab, under the lane they drop through,
// with the stacks they made.
const P = projector(2.3, 300, 230);

// [x, y, sheets, seed], back to front.
const STACKS = [
  [16, 14, 30, 3],
  [72, 6, 13, 8],
  [10, 78, 52, 21],
  [104, 44, 8, 34],
  [70, 84, 24, 55],
];

// The last sheets of the fall, above the stacks they are about to join.
const LANDING = [
  [72, 6, 13, 74],
  [70, 84, 24, 46],
  [104, 44, 8, 110],
];

function Landing() {
  return (
    <svg
      className={cx("end__art")}
      viewBox="0 0 600 580"
      aria-hidden="true"
      focusable="false"
    >
      <Box P={P} at={[-10, -10, -8]} size={[160, 160, 8]} tone="flat" />
      <Sheet P={P} at={[112, 4, 0]} turn />
      <Sheet P={P} at={[52, 46, 0]} />
      {STACKS.map(([x, y, n, seed]) => (
        <Stack key={seed} P={P} at={[x, y, 0]} n={n} seed={seed} />
      ))}
      <Sheet P={P} at={[104, 110, 0]} />
      <Sheet P={P} at={[38, 122, 0]} turn />
      {LANDING.map(([x, y, n, lift]) => {
        const z = stackTop(n) + lift;
        const [cx0, cy0] = P(x + 20, y + 15, z);
        return (
          <g key={`${x}-${y}`}>
            <path
              className={cx("dash")}
              d={`M${cx0} ${cy0 - 120}V${cy0 - 14}`}
            />
            <Sheet P={P} at={[x, y, z]} />
          </g>
        );
      })}
    </svg>
  );
}

// "More than 100 million": Docker Hub reported 105,406,813 pulls of
// gotenberg/gotenberg on 2026-11-11 (hub.docker.com/v2/repositories/
// gotenberg/gotenberg, pull_count).
export default function Closing() {
  return (
    <section className={cx("end")}>
      <div className={cx("col")}>
        <div className={cx("end__in")}>
          <Landing />
          <h2 className={cx("end__h")}>
            Start with <span>one command.</span>
          </h2>
          <RunCommand />
          <div className={cx("btns")}>
            <StartButton />
            <Link
              className={cx("btn")}
              href="https://github.com/gotenberg/gotenberg"
            >
              <GitHubIcon />
              Star on GitHub
            </Link>
          </div>
          <p className={cx("end__facts")}>
            Open source under the{" "}
            <Link href="https://github.com/gotenberg/gotenberg/blob/main/LICENSE">
              MIT license
            </Link>
            . Pulled from{" "}
            <Link href="https://hub.docker.com/r/gotenberg/gotenberg">
              Docker Hub
            </Link>{" "}
            more than 100 million times.
          </p>
        </div>
      </div>
    </section>
  );
}
