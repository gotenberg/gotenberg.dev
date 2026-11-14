import React, { useEffect, useRef } from "react";
import cx from "./cx";

// A sheet folded into a plane, a dashed line behind it. It crosses the
// sections behind their content, like the sheets that drop there: thrown
// when the visitor first reaches the bottom of the page, then now and then,
// always at a height they can see. Drawn flat, like the pressman: far wing, near wing, keel, and the
// seal every sheet carries.
export default function Plane() {
  const plane = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const el = plane.current;
    const flying = cx("is-flying");
    let timer;

    // Throws it across the part of the sections in view, if enough of them
    // is: false when there is no room yet.
    const launch = () => {
      const room = el.parentElement.getBoundingClientRect();
      const top = Math.max(room.top, 0);
      const bottom = Math.min(room.bottom, window.innerHeight);
      if (document.hidden || bottom - top < 200) {
        return false;
      }
      const y = top + 40 + Math.random() * (bottom - top - 140);
      el.style.top = `${Math.round(y - room.top)}px`;
      el.classList.remove(flying);
      void el.offsetWidth;
      el.classList.add(flying);
      return true;
    };
    // The next flight, 15 to 40 seconds on; out of view, it waits for room.
    const later = (seconds) => {
      timer = setTimeout(
        () => later(launch() ? 15 + Math.random() * 25 : 4),
        seconds * 1000,
      );
    };
    const atBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 16;
    const first = () => {
      if (atBottom() && launch()) {
        window.removeEventListener("scroll", first);
        later(15 + Math.random() * 25);
      }
    };
    window.addEventListener("scroll", first, { passive: true });
    return () => {
      window.removeEventListener("scroll", first);
      clearTimeout(timer);
    };
  }, []);

  // Landed past the page's edge, it stops moving until the next throw.
  const land = (event) => {
    if (event.target === event.currentTarget) {
      plane.current.classList.remove(cx("is-flying"));
    }
  };

  return (
    <div ref={plane} className={cx("plane")} aria-hidden="true">
      <div className={cx("plane__x")} onAnimationEnd={land}>
        <div className={cx("plane__y")}>
          <svg
            className={cx("plane__g")}
            viewBox="-86 -4 154 46"
            focusable="false"
          >
            <path
              className={cx("dash")}
              d="M-4 17C-22 15-30 5-41 10S-51 28-63 24-76 14-84 18"
            />
            <path className={cx("plane__far")} d="M18 0L66 18L31 14Z" />
            <path className={cx("sheet__p")} d="M0 8L66 18L24 25Z" />
            <path className={cx("plane__far")} d="M24 25L66 18L35 38Z" />
            <circle className={cx("sheet__seal")} cx="20" cy="17" r="2.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
