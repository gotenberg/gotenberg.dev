import React from "react";
import cx from "./cx";
import {
  Box,
  Cylinder,
  Sheet,
  SheetGlyph,
  Stack,
  projector,
  stackTop,
} from "./iso";

// The hero's drawing: the press on its slab, printing. It works like a
// hand press: the carriage rolls the sheet under the platen, the bar swings
// round and brings the platen down, the carriage rolls back out and the
// printed sheet flies to a stack. Each moving part has its own layer over
// one view box, so the others are never redrawn.
const W = 920;
const H = 800;
const P = projector(2.3, 372, 392);

// Where a point of the view box sits in the scene, in %.
const pct = ([x, y]) => ({
  left: `${((x / W) * 100).toFixed(2)}%`,
  top: `${((y / H) * 100).toFixed(2)}%`,
});
// A length of the view box, in the scene's own width unit.
const cqw = (n) => `${((n / W) * 100).toFixed(2)}cqw`;

// The stacks at the slab's front edge, back to front: [x, y, sheets, seed].
const STACKS = [
  [-52, 150, 12, 57],
  [62, 152, 21, 12],
  [14, 208, 44, 31],
];

// The screw stands on the platen and runs up into the head, where its top
// stays hidden through the whole stroke. Its collar holds the bar, which
// rests REST degrees round from the frame, clear of the cheek, and ends in
// the knob. The swing itself is in the stylesheet (`pull` and `pull-knob`).
const AXIS = [50, 57];
const BAR = 100;
const REST = (12 * Math.PI) / 180;
const reach = (n) =>
  P(AXIS[0] + n * Math.cos(REST), AXIS[1] + n * Math.sin(REST), BAR);
const PIVOT = P(...AXIS, BAR);
const GRIP = reach(7);
const KNOB = reach(70);

// A printed sheet leaves the carriage, rolled out, and lands on each stack
// in turn, along a curve that rises above its start.
const FROM = P(50, 113, 71);
const FLIGHTS = STACKS.map(([x, y, n], i) => {
  const to = P(x + 20, y + 15, stackTop(n) + 2);
  return {
    to,
    mid: [(FROM[0] + to[0]) / 2, FROM[1] - [150, 120, 170][i]],
    turn: i,
  };
});

const arc = ({ to, mid }) =>
  `M${FROM.join(" ")}Q${mid.join(" ")} ${to.join(" ")}`;
// The same curve, at a time t: where a still sheet sits on it.
const along = ({ to, mid }, t) => {
  const q = (a, b, c) =>
    (1 - t) * (1 - t) * a + 2 * (1 - t) * t * b + t * t * c;
  return [q(FROM[0], mid[0], to[0]), q(FROM[1], mid[1], to[1])];
};
// The curve's height over time, as the timing function of one fall: the
// quadratic raised to a cubic, so the sheet stays on the dashed line.
const ease = ({ to, mid }) => {
  const fall = to[1] - FROM[1];
  const rise = mid[1] - FROM[1];
  const y1 = (2 * rise) / (3 * fall);
  const y2 = (2 * rise + fall) / (3 * fall);
  return `cubic-bezier(0.3333, ${y1.toFixed(3)}, 0.6667, ${y2.toFixed(3)})`;
};

// The callouts: the bubble's place beside the drawing, the point it names,
// the side its text sits on and, where the point is too small to carry a
// bubble, the place of its number once the callouts are a list. They stand
// on the paper above the slab, clear of the sheets that drop under it.
const STEPS = [
  {
    label: "Run the container",
    detail: "docker run",
    at: [612, 66],
    to: P(50, 50, 177),
  },
  {
    label: "Post your files",
    detail: "POST /forms/…",
    at: [196, 304],
    to: KNOB,
    side: "left",
    pin: [288, 300],
  },
  {
    label: "Collect the PDF",
    detail: "200 application/pdf",
    at: [862, 292],
    to: P(34, 223, stackTop(44) + 2),
    side: "left",
  },
];

function Layer({ name, children }) {
  return (
    <svg
      className={cx("scene__l", name)}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export default function Scene() {
  return (
    <div className={cx("scene")}>
      <div className={cx("scene__art")}>
        <Layer>
          <Box P={P} at={[-66, 22, -8]} size={[170, 234, 8]} tone="flat" />
          <Sheet P={P} at={[-52, 96, 0]} turn />
          <Sheet P={P} at={[-30, 150, 0]} />
          <Sheet P={P} at={[-58, 32, 0]} />
          <Box P={P} at={[0, 30, 0]} size={[14, 102, 8]} />
          <Box P={P} at={[0, 40, 8]} size={[14, 20, 152]} />
          <Box P={P} at={[14, 42, 44]} size={[72, 16, 14]} />
          {/* The leg under the rails' end, then the rails over it. */}
          <Box P={P} at={[46, 130, 0]} size={[8, 8, 58]} />
          <Box P={P} at={[24, 30, 58]} size={[52, 112, 5]} tone="flat" />
        </Layer>

        {/* The carriage: the bed and its sheet, blank going in, printed
            coming out. */}
        <Layer name="scene__l--roll">
          <Box P={P} at={[28, 96, 63]} size={[44, 34, 7]} tone="iron" />
          <g className={cx("roll__blank")}>
            <Sheet P={P} at={[30, 98, 70]} blank />
          </g>
          <g className={cx("roll__print")}>
            <Sheet P={P} at={[30, 98, 70]} />
          </g>
        </Layer>

        {/* What the pull brings down: the platen, the screw on it and the
            collar the bar goes into. */}
        <Layer name="scene__l--press">
          <Box P={P} at={[30, 42, 78]} size={[40, 30, 7]} tone="iron" />
          <Cylinder P={P} at={[...AXIS, 85]} r={4} h={9} tone="iron" />
          <Cylinder P={P} at={[...AXIS, 94]} r={7} h={12} tone="iron" />
          <Cylinder
            P={P}
            at={[...AXIS, 106]}
            r={4}
            h={32}
            tone="iron"
            thread={3.2}
          />
        </Layer>

        <Layer>
          <Box P={P} at={[14, 44, 122]} size={[72, 12, 18]} />
          <Box P={P} at={[86, 30, 0]} size={[14, 102, 8]} />
          <Box P={P} at={[86, 40, 8]} size={[14, 20, 152]} />
          <Box P={P} at={[-5, 36, 160]} size={[110, 28, 12]} />
          <Box P={P} at={[2, 39, 172]} size={[96, 22, 5]} />
          <Sheet P={P} at={[60, 196, 0]} turn />
          {STACKS.map(([x, y, n, seed]) => (
            <Stack key={seed} P={P} at={[x, y, 0]} n={n} seed={seed} />
          ))}
          <Sheet P={P} at={[-20, 240, 0]} />
          {/* Past the edge, on their way down the page. On phones the
              buttons come right under the slab, so these two go. */}
          <g className={cx("scene__off")}>
            <Sheet P={P} at={[34, 266, -26]} />
            <Sheet P={P} at={[78, 250, -58]} turn />
          </g>
          {FLIGHTS.map((flight, i) => (
            <path key={i} className={cx("dash")} d={arc(flight)} />
          ))}
        </Layer>

        {/* The bar, over everything it swings in front of. It comes down
            with the screw it turns. */}
        <Layer name="scene__l--press">
          <g
            className={cx("bar__rod")}
            style={{ transformOrigin: `${PIVOT[0]}px ${PIVOT[1]}px` }}
          >
            <path
              className={cx("rod rod--edge")}
              d={`M${GRIP.join(" ")}L${KNOB.join(" ")}`}
            />
            <path
              className={cx("rod")}
              d={`M${GRIP.join(" ")}L${KNOB.join(" ")}`}
            />
          </g>
          <g className={cx("bar__knob")}>
            <circle className={cx("knob")} cx={KNOB[0]} cy={KNOB[1]} r="11" />
            <path
              className={cx("knob__shine")}
              d={`M${KNOB[0] - 5} ${KNOB[1] - 2}a6 6 0 0 1 5 -5`}
            />
          </g>
        </Layer>

        {/* Over everything: what names the drawing. */}
        <Layer>
          <g className={cx("scene__leads")}>
            {STEPS.map(({ label, at, to }) => (
              <g key={label}>
                <path
                  className={cx("lead")}
                  d={`M${at.join(" ")}L${to.join(" ")}`}
                />
                <circle
                  className={cx("lead__end")}
                  cx={to[0]}
                  cy={to[1]}
                  r="4.5"
                />
              </g>
            ))}
          </g>
          <g className={cx("scene__pins")}>
            {STEPS.map(({ label, to, pin = to }, i) => (
              <g key={label}>
                {pin !== to && (
                  <path
                    className={cx("lead")}
                    d={`M${pin.join(" ")}L${to.join(" ")}`}
                  />
                )}
                <g transform={`translate(${pin[0]} ${pin[1]})`}>
                  <g className={cx("pin")}>
                    <circle r="26" />
                    <text y="12" textAnchor="middle">
                      {i + 1}
                    </text>
                  </g>
                </g>
              </g>
            ))}
          </g>
        </Layer>

        {FLIGHTS.map((flight, i) => (
          <span
            key={i}
            className={cx("fly")}
            style={{
              ...pct(FROM),
              "--dx": cqw(flight.to[0] - FROM[0]),
              "--dy": cqw(flight.to[1] - FROM[1]),
              "--ease": ease(flight),
              "--turn": flight.turn,
            }}
          >
            <span className={cx("fly__y")}>
              <SheetGlyph className={cx("fly__g")} />
            </span>
          </span>
        ))}
        {/* Without motion, the sheets hold still on their way. */}
        {FLIGHTS.map((flight, i) => (
          <span
            key={i}
            className={cx("fly fly--still")}
            style={pct(along(flight, [0.42, 0.7, 0.55][i]))}
          >
            <SheetGlyph className={cx("fly__g")} />
          </span>
        ))}
      </div>

      <ol className={cx("steps")}>
        {STEPS.map(({ label, detail, at, side }) => (
          <li
            key={label}
            className={cx("step", side && `step--${side}`)}
            style={{ "--x": pct(at).left, "--y": pct(at).top }}
          >
            <b>{label}</b>
            <code>{detail}</code>
          </li>
        ))}
      </ol>
    </div>
  );
}
