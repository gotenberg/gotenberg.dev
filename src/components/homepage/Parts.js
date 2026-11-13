import React from "react";
import Link from "@docusaurus/Link";
import cx from "./cx";
import { PARTS } from "./data";
import Aside from "./Aside";
import Figures from "./Figures";
import { CodePanel } from "./ui";

// What Gotenberg does, part by part: a small drawing with the pressman at
// work and what the page says beside it (Aside.js), two sentences, the
// docs pages that go further and one request, with its answer where the
// answer is the point. The gap between the text and
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
                <div className={cx("part__fig")}>
                  <Figure count={part.count} />
                  <Aside id={part.figure} />
                </div>
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
              <CodePanel
                title={part.bar}
                request={part.request}
                reply={part.reply}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
