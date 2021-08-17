import React from "react";
import styles from "./Hero.module.css";
import clsx from "clsx";
import Link from "@docusaurus/Link";

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <h1>
              A Docker-powered stateless API <br />
              <span className="highlight">for PDF files</span>
            </h1>
            <Link
              className={clsx(
                "button button--primary button--lg",
                styles.getStartedButton
              )}
              to="/docs/intro"
            >
              Get Started
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="https://github.com/gotenberg/gotenberg"
            >
              <img
                className={styles.githubIcon}
                src="/img/github.svg"
                alt="GitHub Logo"
              />{" "}
              <span className={styles.githubButtonText}>GitHub</span>
            </Link>
          </div>
          <div className="col col--6">
            <div className={styles.outer}>
              <span className={clsx(styles.dot, styles.red)} />
              <span className={clsx(styles.dot, styles.amber)} />
              <span className={clsx(styles.dot, styles.green)} />
              <div className={styles.innerAsciiLogo}>
                <img src="img/ascii.svg" alt="ASCII logo" />
              </div>
              <div className={styles.inner}>
                <span className={styles.command}>
                  $ docker run --rm -p 3000:3000 gotenberg/gotenberg:7
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
