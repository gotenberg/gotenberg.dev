import React from "react";
import cx from "./cx";
import { VOICE } from "./voice";

// A printer's registration mark: where the inks must meet.
const Register = () => (
  <svg className={cx("register")} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="6.5" />
    <path d="M12 1v22M1 12h22" />
  </svg>
);

// The colophon's colour bar: indigo, its halftone, vermilion and navy.
const Inks = () => (
  <span className={cx("bar")} aria-hidden="true">
    <i className={cx("bar__one")} />
    <i className={cx("bar__tint")} />
    <i className={cx("bar__two")} />
    <i className={cx("bar__line")} />
  </span>
);

// What the page says beside its facts (voice.js): a printer's note, in
// italics, after a registration mark in the vermilion. The last one is the
// colophon.
export default function Aside({ id, className }) {
  return (
    <p className={cx("note", className)}>
      <Register />
      <span>{VOICE[id]}</span>
      {id === "end" && <Inks />}
    </p>
  );
}
