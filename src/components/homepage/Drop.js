import React from "react";
import cx from "./cx";
import { KINDS, SheetGlyph, random } from "./iso";

// The sheets that leave the hero's slab and drop behind the sections. A
// few, in three lanes the layout keeps free: the page's two margins and the
// gap between a part's text and its request. Under 1100px the stylesheet
// moves the middle and right lanes to the page's right edge.
const rand = random(23);

// How a sheet moves as it falls: each one is a set of keyframes.
const MOVES = ["sway", "rock", "glide", "flip", "turn"];

// [lane, sheets, width].
const LANES = [
  ["a", 2, 96],
  ["b", 5, 80],
  ["c", 4, 96],
];

// No two sheets alike: each has its own pace, its own way of moving, its
// own place in its lane and its own print.
const SHEETS = LANES.flatMap(([lane, count, width], l) =>
  Array.from({ length: count }, (_, i) => {
    const time = 22 + rand() * 26;
    return {
      key: lane + i,
      lane,
      move: MOVES[(i * 2 + l) % MOVES.length],
      time,
      // Spread along the lane, then left to drift apart.
      delay: -time * ((i + rand() * 0.6) / count),
      beat: 2.4 + rand() * 3.6,
      offset: rand() * 2 - 1,
      width: width + Math.round(rand() * 26),
      turn: rand() < 0.4,
      kind: KINDS[(i * 3 + l * 2) % KINDS.length],
      rest: (i + 0.5) / count,
    };
  }),
);

export default function Drop() {
  return (
    <div className={cx("drop")} aria-hidden="true">
      {SHEETS.map((s) => (
        <span
          key={s.key}
          className={cx("drop__s", `drop__s--${s.lane}`)}
          style={{
            "--o": s.offset.toFixed(2),
            "--width": `${s.width}px`,
            "--time": `${s.time.toFixed(1)}s`,
            "--delay": `${s.delay.toFixed(1)}s`,
            "--beat": `${s.beat.toFixed(1)}s`,
            "--rest": s.rest.toFixed(2),
          }}
        >
          {/* A sheet that turns over would swing its trail round with it. */}
          <SheetGlyph
            className={cx("drop__g", `drop__g--${s.move}`)}
            turn={s.turn}
            kind={s.kind}
            trail={s.move !== "flip" && s.move !== "turn"}
          />
        </span>
      ))}
    </div>
  );
}
