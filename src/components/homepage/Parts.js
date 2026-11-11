import React from "react";
import Link from "@docusaurus/Link";
import cx from "./cx";
import { PARTS } from "./data";
import Figures from "./Figures";
import { CodePanel } from "./ui";

// What Gotenberg does, part by part: a small drawing, two sentences, the
// docs pages that go further and one request. The gap between the text and
// the request is a lane: the sheets drop through it.
export default function Parts() {
  return (
    <section className={cx("parts")} aria-label="What Gotenberg does">
      <div className={cx("col")}>
        {PARTS.map((part) => {
          const Figure = Figures[part.figure];
          return (
            <article key={part.title} className={cx("part")}>
              <div className={cx("part__txt")}>
                <Figure count={part.count} />
                <h2 className={cx("part__h")}>{part.title}</h2>
                <p className={cx("part__p")}>{part.text}</p>
                <ul className={cx("part__links")}>
                  {part.links.map(([label, to]) => (
                    <li key={to}>
                      <Link to={to}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <CodePanel title={part.bar} request={part.request} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
