import React, { useEffect, useRef } from "react";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/500-italic.css";
import "@fontsource/barlow/700.css";
import cx from "./cx";
import Hero from "./Hero";
import Drop from "./Drop";
import Plane from "./Plane";
import Sponsors from "./Sponsors";
import Parts from "./Parts";
import Closing from "./Closing";

// What the drawing's fills refer to: the halftone a shaded face is printed
// in, dots of the line's ink on the part's own colour.
function Inks() {
  return (
    <svg className={cx("inks")} aria-hidden="true" focusable="false">
      <defs>
        <pattern
          id="hp-halftone"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(30)"
        >
          <rect className={cx("inks__ground")} width="5" height="5" />
          <circle className={cx("inks__dot")} cx="2.5" cy="2.5" r="1.1" />
        </pattern>
      </defs>
    </svg>
  );
}

// The page reads as one drawing: the press at the top, its sheets dropping
// behind the sections (one now and then folded into a plane), the stacks
// they land on at the bottom.
export default function Homepage() {
  // A copied command is the visitor's first pull: every pressman's cap
  // jumps, once.
  const page = useRef(null);
  useEffect(() => {
    const cheer = cx("is-cheer");
    let timer;
    const answer = () => {
      const { classList } = page.current;
      classList.remove(cheer);
      void page.current.offsetWidth;
      classList.add(cheer);
      clearTimeout(timer);
      timer = setTimeout(() => classList.remove(cheer), 900);
    };
    window.addEventListener("hp:copied", answer);
    return () => {
      window.removeEventListener("hp:copied", answer);
      clearTimeout(timer);
    };
  }, []);

  return (
    <main ref={page} className={cx("hp")}>
      <Inks />
      <Hero />
      <div className={cx("rest")}>
        <Drop />
        <Plane />
        <Sponsors />
        <Parts />
        <Closing />
      </div>
    </main>
  );
}
