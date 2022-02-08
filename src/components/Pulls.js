import React from "react";
import styles from "./Pulls.module.css";

export default function Pulls() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className={styles.text}>
              <strong>30+ million</strong> pulls from Docker Hub ❤️
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
