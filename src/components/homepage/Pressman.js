import React from "react";
import cx from "./cx";

// The pressman: the figure a manual draws beside what it builds. A cap, a
// forked beard, a printer's apron, limbs like hoses. He is drawn flat, in
// the drawing's line, with his feet at the origin: the body stays the same
// and a pose says where the elbows, hands, knees and feet go.

const SHOULDER = 10;
const HIP = 6;

// A limb bends once, at `via`.
const hose = (from, [via, to]) =>
  `M${from.join(" ")}Q${via.join(" ")} ${to.join(" ")}`;

function Limb({ from, pose, end }) {
  const d = hose(from, pose);
  return (
    <g>
      <path className={cx("pm__hose pm__hose--edge")} d={d} />
      <path className={cx("pm__hose")} d={d} />
      {end}
    </g>
  );
}

const Hand = ({ at: [x, y] }) => (
  <circle className={cx("pm__f")} cx={x} cy={y} r="4.4" />
);

// A shoe points the way the foot left the knee, or the way `toes` says.
const Shoe = ({ at: [x, y], toes }) => (
  <ellipse
    className={cx("pm__shoe")}
    cx={x + toes * 2.5}
    cy={y - 1}
    rx="6.5"
    ry="3.8"
  />
);

// How the eyes are drawn says how he takes it.
const EYES = {
  glad: (x) => (
    <path className={cx("pm__lash")} d={`M${x - 2.6} -61q2.6 -3.6 5.2 0`} />
  ),
  wide: (x) => (
    <>
      <circle className={cx("pm__f pm__f--thin")} cx={x} cy="-62.5" r="3.3" />
      <circle className={cx("pm__dot")} cx={x + 0.6} cy="-62" r="1.5" />
    </>
  ),
};

export const POSES = {
  // Hanging from what both hands hold, above the head: the arms bow round
  // it, the knees come up.
  hang: {
    arms: [
      [
        [-25, -72],
        [-4.5, -99],
      ],
      [
        [25, -72],
        [4.5, -99],
      ],
    ],
    legs: [
      [
        [-11, -15],
        [-6, -3],
      ],
      [
        [10, -17],
        [9, -5],
      ],
    ],
    behind: true,
  },
  // Both arms up, holding something over the cap.
  lift: {
    arms: [
      [
        [-22, -62],
        [-12, -88],
      ],
      [
        [22, -62],
        [12, -88],
      ],
    ],
    behind: true,
  },
  // One arm out to the left, the other on the hip.
  show: {
    arms: [
      [
        [-22, -50],
        [-31, -56],
      ],
      [
        [19, -42],
        [11, -31],
      ],
    ],
  },
  // Carrying something flat, held out in front.
  carry: {
    arms: [
      [
        [-13, -38],
        [-22, -38],
      ],
      [
        [4, -34],
        [-12, -36],
      ],
    ],
  },
  // Bent over a loupe held in the left hand.
  peer: {
    arms: [
      [
        [-18, -44],
        [-27, -37],
      ],
      [
        [16, -40],
        [13, -27],
      ],
    ],
  },
  // Just let go of something: both arms up and out.
  toss: {
    arms: [
      [
        [-24, -58],
        [-26, -76],
      ],
      [
        [24, -58],
        [26, -76],
      ],
    ],
  },
  // Sitting on an edge, hands on it, knees apart, legs over.
  sit: {
    arms: [
      [
        [-18, -38],
        [-16, -24],
      ],
      [
        [18, -38],
        [16, -24],
      ],
    ],
    legs: [
      [
        [-16, -25],
        [-13, -8],
      ],
      [
        [16, -25],
        [13, -8],
      ],
    ],
    toes: [-1, 1],
  },
  // Hands on the hips.
  proud: {
    arms: [
      [
        [-21, -40],
        [-11, -30],
      ],
      [
        [21, -40],
        [11, -30],
      ],
    ],
  },
};

const LEGS = [
  [
    [-7, -12],
    [-7, 0],
  ],
  [
    [7, -12],
    [7, 0],
  ],
];

// `at` is where his feet stand in the drawing, `scale` his size against
// the hero's, `gaze` moves his eyes (-1 left, 1 right), `turn` leans him,
// `mood` picks his eyes. Children are drawn in his own units, in front of
// him: what he holds.
export default function Pressman({
  at: [x, y],
  pose,
  mood = "glad",
  scale = 1,
  gaze = 0,
  turn = 0,
  children,
}) {
  const { arms, legs = LEGS, toes = [-1, 1], behind } = POSES[pose];
  const eye = EYES[mood];
  const limbs = arms.map((arm, i) => (
    <Limb
      key={i}
      from={[i ? SHOULDER : -SHOULDER, -49]}
      pose={arm}
      end={<Hand at={arm[1]} />}
    />
  ));
  return (
    <g
      className={cx("pm")}
      transform={`translate(${x} ${y}) rotate(${turn}) scale(${scale})`}
    >
      {behind && limbs}
      {legs.map((leg, i) => (
        <Limb
          key={i}
          from={[i ? HIP : -HIP, -25]}
          pose={leg}
          end={<Shoe at={leg[1]} toes={toes[i]} />}
        />
      ))}
      <path
        className={cx("pm__f")}
        d="M-10 -52Q-13.5 -37 -15.5 -24Q0 -19 15.5 -24Q13.5 -37 10 -52Q0 -56 -10 -52Z"
      />
      <path
        className={cx("pm__f pm__f--one")}
        d="M-6.5 -47H6.5L9 -26.5Q0 -23.5 -9 -26.5Z"
      />
      <circle className={cx("pm__f")} cx="0" cy="-64" r="13" />
      {/* His cap jumps when the visitor copies a command (index.js). */}
      <g className={cx("pm__hat")}>
        <path
          className={cx("pm__f pm__f--two")}
          d="M-13.5 -68Q-15 -85.5 0 -85.5Q15 -85.5 13.5 -68Z"
        />
        <rect
          className={cx("pm__f pm__f--two-dark")}
          x="-16"
          y="-72.5"
          width="32"
          height="6.5"
          rx="3.25"
        />
      </g>
      <g transform={`translate(${gaze * 2.4} 0)`}>
        {eye(-4.8)}
        {eye(4.8)}
        <path
          className={cx("pm__f pm__f--beard")}
          d="M-11.5 -59Q-14 -43 -5.5 -36.5Q-1.5 -40 0 -44.5Q1.5 -40 5.5 -36.5Q14 -43 11.5 -59Q6 -52.5 0 -54.5Q-6 -52.5 -11.5 -59Z"
        />
        <circle className={cx("pm__f pm__f--thin")} cx="0" cy="-57.2" r="3" />
      </g>
      {!behind && limbs}
      {children}
    </g>
  );
}
