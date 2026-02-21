import React from "react";
import styles from "./Hero.module.css";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className="row">
          <div className={clsx("col col--6", styles.heroContent)}>
            <h1 className={styles.title}>
              A containerized API for seamless
              <br />
              <span className={styles.highlight}>PDF conversion</span>
            </h1>

            <p className={styles.subtitle}>
              Available on <strong>amd64</strong>, <strong>arm64</strong>,{" "}
              <strong>armhf</strong>, <strong>i386</strong>, and{" "}
              <strong>ppc64le</strong>
            </p>

            <div className={styles.buttons}>
              <Link
                className={clsx(
                  "button button--primary button--lg",
                  styles.btnCrisp,
                  styles.btnPrimary
                )}
                to="/docs/getting-started/introduction"
              >
                Getting Started
                {/* Tiny arrow icon for momentum */}
                <svg
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.btnIcon}
                >
                  <path
                    d="M0 6H11M11 6L6 1M11 6L6 11"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </Link>

              <Link
                className={clsx(
                  "button button--secondary button--lg",
                  styles.btnCrisp,
                  styles.btnSecondary
                )}
                to="https://github.com/gotenberg/gotenberg"
              >
                <img
                  className={styles.githubIcon}
                  src={useBaseUrl("/img/github.svg")}
                  alt="GitHub Logo"
                />
                <span className={styles.githubButtonText}>GitHub</span>
              </Link>
            </div>
          </div>

          <div className={clsx("col col--6", styles.heroImage)}>
            <img
              className={styles.logo}
              src={useBaseUrl("/img/logo_jed.png")}
              alt="Gotenberg Hero Logo"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
