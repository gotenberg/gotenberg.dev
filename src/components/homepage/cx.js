import clsx from "clsx";
import styles from "./Homepage.module.css";

// Maps the page's class names to their CSS Module names. Takes clsx
// arguments; a name without a rule is dropped.
export default function cx(...args) {
  return clsx(...args)
    .split(" ")
    .map((name) => styles[name])
    .filter(Boolean)
    .join(" ");
}
