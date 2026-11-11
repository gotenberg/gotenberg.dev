import React from "react";
import cx from "./cx";
import { Box, Sheet, projector } from "./iso";

// A small drawing per part of the API, in the hero's line. Each one is a
// function of nothing: [view box width, its content].
const u = 1.5;

function Figure({ width = 160, height = 100, children }) {
  return (
    <svg
      className={cx("fig")}
      viewBox={`0 0 ${width} ${height}`}
      style={{ "--fig": width / 160 }}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

// What moves between two points, with its arrowhead.
function Hop({ from, to, lift = 26 }) {
  const mid = [(from[0] + to[0]) / 2, Math.min(from[1], to[1]) - lift];
  return (
    <path
      className={cx("dash")}
      d={`M${from.join(" ")}Q${mid.join(" ")} ${to.join(" ")}`}
    />
  );
}

const Fall = ({ from, to }) => (
  <path className={cx("dash")} d={`M${from.join(" ")}L${to.join(" ")}`} />
);

// A count, as a manual prints it beside a part.
const Times = ({ n, x, y }) => (
  <text className={cx("fig__n")} x={x} y={y}>
    ×{n}
  </text>
);

// A blank sheet goes in, a printed one comes out.
function Convert() {
  const P = projector(u, 56, 6);
  return (
    <Figure>
      <Sheet P={P} at={[0, 0, 0]} blank />
      <Sheet P={P} at={[0, 44, 0]} />
      <Hop from={P(20, 15, 0)} to={P(20, 59, 0)} />
    </Figure>
  );
}

// The stages, stacked in the order they run, the PDF on top.
function Stages({ count }) {
  const P = projector(u, 62, 48);
  return (
    <Figure height={108}>
      {["wood", "flat", "wood", "flat"].map((tone, i) => (
        <Box key={i} P={P} at={[0, 0, i * 7]} size={[44, 34, 7]} tone={tone} />
      ))}
      <Sheet P={P} at={[2, 2, 28]} />
      <Times n={count} x={116} y={78} />
    </Figure>
  );
}

// A stamp comes down on the sheet.
function Conform() {
  const P = projector(u, 60, 36);
  return (
    <Figure>
      <Sheet P={P} at={[0, 0, 0]} />
      <Fall from={P(20, 15, 16)} to={P(20, 15, 1)} />
      <Box P={P} at={[12, 7, 16]} size={[16, 16, 5]} tone="hot" />
      <Box P={P} at={[16, 11, 21]} size={[8, 8, 12]} tone="iron" />
    </Figure>
  );
}

// The invoice, and the XML that goes into it.
function Invoice() {
  const P = projector(u, 60, 24);
  return (
    <Figure height={84}>
      <Sheet P={P} at={[0, 0, 0]} />
      <Fall from={P(32, 12, 22)} to={P(32, 12, 1)} />
      <Box P={P} at={[24, 6, 22]} size={[16, 12, 1.2]} tone="flat" />
    </Figure>
  );
}

// The sheet drops into the bucket.
function Deliver() {
  const P = projector(u, 60, 46);
  return (
    <Figure>
      <Box P={P} at={[0, 0, 0]} size={[34, 34, 14]} tone="flat" />
      <Fall from={P(17, 17, 26)} to={P(17, 17, 15)} />
      <Sheet P={P} at={[-3, 2, 26]} />
    </Figure>
  );
}

// The images, crated.
function Images({ count }) {
  const P = projector(u, 70, 26);
  return (
    <Figure width={190} height={86}>
      <Box P={P} at={[0, 0, 0]} size={[24, 24, 14]} />
      <Box P={P} at={[28, 0, 0]} size={[24, 24, 14]} tone="flat" />
      <Box P={P} at={[0, 28, 0]} size={[24, 24, 14]} tone="flat" />
      <Box P={P} at={[28, 28, 0]} size={[24, 24, 14]} />
      <Box P={P} at={[14, 14, 14]} size={[24, 24, 14]} />
      <Times n={count} x={146} y={70} />
    </Figure>
  );
}

export default { Convert, Stages, Conform, Invoice, Deliver, Images };
