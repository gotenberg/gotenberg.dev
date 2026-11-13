import React from "react";
import cx from "./cx";

// The homepage's isometric drawing. x runs right and down, y left and down,
// z up; the result is mirrored, so a scene reads away from the text on its
// left. A box shows its top and its +x and +y faces.

const C = Math.cos(Math.PI / 6);
const r = (n) => Math.round(n * 10) / 10;

// A projection to screen points: `u` px per unit, the origin at [ox, oy].
export const projector =
  (u, ox, oy) =>
  (x, y, z = 0) => [r(ox - (x - y) * C * u), r(oy + ((x + y) / 2 - z) * u)];

export const path = (points) =>
  "M" + points.map((p) => p.join(" ")).join("L") + "Z";

// A seeded generator: the server and the browser draw the same sheets.
export function random(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function faces(P, [x, y, z], [w, d, h]) {
  return {
    left: path([
      P(x, y + d, z),
      P(x + w, y + d, z),
      P(x + w, y + d, z + h),
      P(x, y + d, z + h),
    ]),
    right: path([
      P(x + w, y, z),
      P(x + w, y + d, z),
      P(x + w, y + d, z + h),
      P(x + w, y, z + h),
    ]),
    top: path([
      P(x, y, z + h),
      P(x + w, y, z + h),
      P(x + w, y + d, z + h),
      P(x, y + d, z + h),
    ]),
  };
}

// A part of the drawing. The tone picks its three fills: wood, iron, flat
// (the slabs) or hot (what the hand pulls).
export function Box({ P, at, size, tone = "wood" }) {
  const f = faces(P, at, size);
  return (
    <g className={cx("iso", `iso--${tone}`)}>
      <path className={cx("iso__l")} d={f.left} />
      <path className={cx("iso__r")} d={f.right} />
      <path className={cx("iso__t")} d={f.top} />
    </g>
  );
}

// A round part standing on its end, the screw and its collar: `at` is the
// centre of its base. The side away from the light is shaded, as on a box.
// `thread` draws the turns of a screw, that far apart.
export function Cylinder({ P, at: [x, y, z = 0], r: radius, h, tone, thread }) {
  const [mid, base] = P(x, y, z);
  const top = P(x, y, z + h)[1];
  // A circle on the ground is an ellipse on the page.
  const a = r((P(0, 0)[0] - P(radius, 0)[0]) * Math.SQRT2);
  const b = r((P(radius, 0)[1] - P(0, 0)[1]) * Math.SQRT2);
  const side = `M${mid - a} ${top}V${base}A${a} ${b} 0 0 0 ${mid + a} ${base}V${top}Z`;
  const edge = r(mid - a * 0.15);
  const shade = `M${mid - a} ${top}V${base}A${a} ${b} 0 0 0 ${edge} ${r(base + b * 0.99)}V${top}Z`;
  const turns = [];
  if (thread) {
    const step = (P(0, 0, 0)[1] - P(0, 0, thread)[1]) / 2;
    for (let at = top + step * 3; at < base; at += step * 2) {
      turns.push(
        `M${mid - a} ${r(at)}A${a} ${b} 0 0 0 ${mid + a} ${r(at - step)}`,
      );
    }
  }
  return (
    <g className={cx("iso", `iso--${tone}`)}>
      <path className={cx("iso__l")} d={side} />
      <path className={cx("iso__r cyl__shade")} d={shade} />
      {thread && <path className={cx("cyl__thread")} d={turns.join("")} />}
      <path className={cx("cyl__edge")} d={side} />
      <path
        className={cx("iso__t")}
        d={`M${mid - a} ${top}a${a} ${b} 0 1 0 ${2 * a} 0a${a} ${b} 0 1 0 ${-2 * a} 0Z`}
      />
    </g>
  );
}

// What a sheet carries, in the sheet's own units (40 along its lines, 30
// across them): `ink` is drawn as lines, `fill` as solid shapes, `hot` in
// the second ink. Each one is a document Gotenberg prints.
const row = (u, v, len) => [
  [u, v],
  [u + len, v],
];
const box = (u, v, w, h) => [
  [u, v],
  [u + w, v],
  [u + w, v + h],
  [u, v + h],
];
const ring = (u, v, radius, n = 14) =>
  Array.from({ length: n }, (_, i) => [
    u + radius * Math.cos((i / n) * 2 * Math.PI),
    v + radius * Math.sin((i / n) * 2 * Math.PI),
  ]);

export const PRINTS = {
  // A page of text: a title, three lines and a seal.
  text: {
    ink: [row(5, 6, 12), row(5, 11.2, 28), row(5, 16.4, 22), row(5, 21.6, 26)],
    seal: [33, 23],
  },
  // An invoice: its lines and their amounts, a rule, the total.
  invoice: {
    ink: [
      row(5, 6, 10),
      row(5, 11.5, 14),
      row(28, 11.5, 7),
      row(5, 15.5, 11),
      row(28, 15.5, 7),
      row(5, 19.5, 16),
      row(28, 19.5, 7),
    ],
    fill: [box(5, 22.2, 30, 0.9), box(26, 24.6, 9, 2)],
    seal: [8, 25.5],
  },
  // A report: a title over a bar chart.
  chart: {
    ink: [row(5, 6, 14), row(5, 25, 30)],
    fill: [
      box(8, 19, 4, 6),
      box(14.5, 15, 4, 10),
      box(21, 17, 4, 8),
      box(27.5, 11, 4, 14),
    ],
    seal: [33, 6],
  },
  // A contract: its clauses, then a signature.
  contract: {
    ink: [row(5, 6, 12), row(5, 10.5, 30), row(5, 14.5, 27), row(5, 18.5, 30)],
    hot: [
      [
        [20, 25.5],
        [22, 22.5],
        [23.5, 26],
        [25.5, 22],
        [27, 25.5],
        [29.5, 23.5],
        [34, 24.5],
      ],
    ],
    fill: [box(19, 27, 16, 0.6)],
  },
  // A spreadsheet: a header row over a grid.
  grid: {
    ink: [
      [...box(5, 5, 30, 20), [5, 5]],
      row(5, 15, 30),
      row(5, 20, 30),
      [
        [15, 5],
        [15, 25],
      ],
      [
        [25, 5],
        [25, 25],
      ],
    ],
    fill: [box(5, 5, 30, 5)],
  },
  // A slide: a headline, two points and a picture.
  slide: {
    ink: [row(5, 15, 11), row(5, 19.5, 9), [...box(21, 13, 14, 11), [21, 13]]],
    fill: [box(5, 6, 22, 3.2)],
  },
  // A page that passed: its text, and the stamp that says so.
  stamped: {
    ink: [row(5, 6, 12), row(5, 11.2, 28), row(5, 16.4, 12), row(5, 21.6, 10)],
    hot: [
      [...ring(27, 19.5, 6.2), ring(27, 19.5, 6.2)[0]],
      [
        [24, 19.5],
        [26.3, 22],
        [30.2, 17],
      ],
    ],
  },
};

export const KINDS = Object.keys(PRINTS);

// A sheet lying flat: its outline and what is printed on it (`kind`, one
// of PRINTS). `turn` lays it the other way round; `blank` leaves it
// unprinted, for what goes into the press.
export function Sheet({ P, at: [x, y, z = 0], turn, blank, kind = "text" }) {
  const [w, d] = turn ? [30, 40] : [40, 30];
  const at = ([u, v]) => (turn ? P(x + v, y + u, z) : P(x + u, y + v, z));
  const line = (points) => "M" + points.map((p) => at(p).join(" ")).join("L");
  const print = PRINTS[kind];
  const seal = print.seal && at(print.seal);
  return (
    <g className={cx("sheet")}>
      <path
        className={cx("sheet__p")}
        d={path([
          P(x, y, z),
          P(x + w, y, z),
          P(x + w, y + d, z),
          P(x, y + d, z),
        ])}
      />
      {!blank && (
        <>
          {print.fill && (
            <path
              className={cx("sheet__fill")}
              d={print.fill.map((points) => line(points) + "Z").join("")}
            />
          )}
          <path className={cx("sheet__ink")} d={print.ink.map(line).join("")} />
          {print.hot && (
            <path
              className={cx("sheet__hot")}
              d={print.hot.map(line).join("")}
            />
          )}
          {seal && (
            <circle
              className={cx("sheet__seal")}
              cx={seal[0]}
              cy={seal[1]}
              r="3.4"
            />
          )}
        </>
      )}
    </g>
  );
}

// A stack of sheets, each one slightly off the one below, the top one
// printed (`kind`). `h` is a sheet's thickness.
export function Stack({ P, at: [x, y, z = 0], n, seed, kind, h = 1.3 }) {
  const rand = random(seed);
  const layers = [];
  let top = [x, y, z];
  for (let i = 0; i < n; i++) {
    const at = [x + (rand() - 0.5) * 5, y + (rand() - 0.5) * 5, z + i * h];
    const f = faces(P, at, [40, 30, h]);
    layers.push(f.left + f.right + f.top);
    top = [at[0], at[1], at[2] + h];
  }
  return (
    <g className={cx("stack")}>
      {layers.map((d, i) => (
        <path key={i} className={cx("stack__ream")} d={d} />
      ))}
      <Sheet P={P} at={top} kind={kind} />
    </g>
  );
}

// The height of a stack of `n` sheets, to land a sheet on it.
export const stackTop = (n, h = 1.3) => n * h;

// One loose sheet as its own small drawing: the sheets in flight, and the
// ones that drop down the page. `trail` draws the dashes it leaves behind.
const G = projector(2.3, 84, 4);
const G_TURNED = projector(2.3, 64, 4);
export const GLYPH = { w: 148, h: 88 };

export function SheetGlyph({ className, turn, trail, kind }) {
  const lift = trail ? 54 : 0;
  return (
    <svg
      className={className}
      viewBox={`0 ${-lift} ${GLYPH.w} ${GLYPH.h + lift}`}
      aria-hidden="true"
      focusable="false"
    >
      {trail && (
        <path
          className={cx("dash")}
          d={`M${GLYPH.w / 2} ${-lift + 4}V${GLYPH.h / 2 - 22}`}
        />
      )}
      <Sheet P={turn ? G_TURNED : G} at={[0, 0, 0]} turn={turn} kind={kind} />
    </svg>
  );
}
