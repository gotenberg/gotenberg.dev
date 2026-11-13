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

// What the page says beside its facts (voice.js): a printer's note, in
// italics, after a registration mark in the vermilion.
export default function Aside({ id }) {
  return (
    <p className={cx("note")}>
      <Register />
      <span>{VOICE[id]}</span>
    </p>
  );
}
