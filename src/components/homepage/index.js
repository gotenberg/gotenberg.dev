import React from "react";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/700.css";
import cx from "./cx";
import Hero from "./Hero";
import Drop from "./Drop";
import Sponsors from "./Sponsors";
import Parts from "./Parts";
import Closing from "./Closing";

// The page reads as one drawing: the press at the top, its sheets dropping
// behind the sections, the stacks they land on at the bottom.
export default function Homepage() {
  return (
    <main className={cx("hp")}>
      <Hero />
      <div className={cx("rest")}>
        <Drop />
        <Sponsors />
        <Parts />
        <Closing />
      </div>
    </main>
  );
}
