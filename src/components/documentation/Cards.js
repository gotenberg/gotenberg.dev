import React from "react";
import Link from "@docusaurus/Link";
import styles from "./Cards.module.css";

// Cards that route a reader by goal, as on the docs landing page.
export function CardGrid({ children }) {
  return <div className={styles.grid}>{children}</div>;
}

export function Card({ title, to, children }) {
  return (
    <Link className={styles.card} to={to}>
      <span className={styles.title}>{title}</span>
      <span className={styles.text}>{children}</span>
    </Link>
  );
}
