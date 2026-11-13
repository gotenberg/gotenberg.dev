import React from "react";
import cx from "./cx";
import { Box, Sheet, projector } from "./iso";
import Pressman from "./Pressman";

// A small drawing per part of the API, in the hero's line, with the
// pressman at work in each. Each one is a function of nothing but a count.
const u = 1.5;
// The pressman's size here, against the hero's.
const MAN = 0.82;

function Figure({ box = [0, 0, 160, 100], children }) {
  return (
    <svg
      className={cx("fig")}
      viewBox={box.join(" ")}
      style={{ "--fig": box[2] / 160 }}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

// What moves between two points.
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

// What he holds is drawn in his own units: a projector at his scale.
const HELD = projector(u / MAN, 0, 0);

// A blank sheet goes in, a printed one comes out: he shows it.
function Convert() {
  const P = projector(u, 56, 6);
  return (
    <Figure box={[0, 0, 214, 104]}>
      <Sheet P={P} at={[0, 0, 0]} blank />
      <Sheet P={P} at={[0, 44, 0]} />
      <Hop from={P(20, 15, 0)} to={P(20, 59, 0)} />
      <Pressman at={[188, 100]} pose="show" gaze={-1} scale={MAN} />
    </Figure>
  );
}

// The stages, stacked in the order they run, the PDF on top. He brings
// the next one.
function Stages({ count }) {
  const P = projector(u, 62, 48);
  return (
    <Figure box={[0, -6, 204, 114]}>
      {["wood", "flat", "wood", "flat"].map((tone, i) => (
        <Box key={i} P={P} at={[0, 0, i * 7]} size={[44, 34, 7]} tone={tone} />
      ))}
      <Sheet P={P} at={[2, 2, 28]} kind="contract" />
      <Pressman at={[140, 104]} pose="lift" gaze={-1} scale={MAN}>
        <g transform="translate(0 -103)">
          <Box P={HELD} at={[-11, -9, 0]} size={[22, 18, 6]} tone="flat" />
        </g>
      </Pressman>
      <Times n={count} x={168} y={78} />
    </Figure>
  );
}

// A stamp comes down on the sheet he has read through his loupe.
function Conform() {
  const P = projector(u, 60, 36);
  return (
    <Figure box={[0, 0, 180, 104]}>
      <Sheet P={P} at={[0, 0, 0]} kind="stamped" />
      <Fall from={P(20, 15, 16)} to={P(20, 15, 1)} />
      <Box P={P} at={[12, 7, 16]} size={[16, 16, 5]} tone="hot" />
      <Box P={P} at={[16, 11, 21]} size={[8, 8, 12]} tone="iron" />
      <Pressman
        at={[146, 100]}
        pose="peer"
        gaze={-1}
        turn={-9}
        scale={MAN}
        mood="wide"
      >
        <path className={cx("pm__rod")} d="M-29 -39L-33 -43" />
        <circle className={cx("pm__loupe")} cx="-39" cy="-49" r="9" />
      </Pressman>
    </Figure>
  );
}

// The invoice, and the XML he brings to it.
function Invoice() {
  const P = projector(u, 60, 24);
  return (
    <Figure box={[0, 0, 190, 92]}>
      <Sheet P={P} at={[0, 0, 0]} kind="invoice" />
      <Hop from={[126, 50]} to={P(26, 14, 0)} lift={22} />
      <Pressman at={[160, 88]} pose="carry" gaze={-1} scale={MAN}>
        <g transform="translate(-20 -40)">
          <Box P={HELD} at={[-8, -6, 0]} size={[16, 12, 1.4]} tone="flat" />
        </g>
      </Pressman>
    </Figure>
  );
}

// The sheet drops into the bucket: he has let it go.
function Deliver() {
  const P = projector(u, 60, 46);
  return (
    <Figure box={[0, 0, 180, 104]}>
      <Box P={P} at={[0, 0, 0]} size={[34, 34, 14]} tone="flat" />
      <Fall from={P(17, 17, 26)} to={P(17, 17, 15)} />
      <Sheet P={P} at={[-3, 2, 26]} kind="chart" />
      <Pressman at={[150, 100]} pose="toss" gaze={-1} scale={MAN} />
    </Figure>
  );
}

// The images, crated. He sits on the last one.
function Images({ count }) {
  const P = projector(u, 70, 26);
  const seat = P(36, 36, 28);
  return (
    <Figure box={[0, -44, 190, 150]}>
      <Box P={P} at={[0, 0, 0]} size={[24, 24, 14]} />
      <Box P={P} at={[28, 0, 0]} size={[24, 24, 14]} tone="flat" />
      <Box P={P} at={[0, 28, 0]} size={[24, 24, 14]} tone="flat" />
      <Box P={P} at={[28, 28, 0]} size={[24, 24, 14]} />
      <Box P={P} at={[14, 14, 14]} size={[24, 24, 14]} />
      <Pressman at={[seat[0], seat[1] + 25 * MAN]} pose="sit" scale={MAN} />
      <Times n={count} x={146} y={70} />
    </Figure>
  );
}

export default { Convert, Stages, Conform, Invoice, Deliver, Images };
