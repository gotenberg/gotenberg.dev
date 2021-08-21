import React from "react";
import styles from "./Hero.module.css";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from '@docusaurus/useBaseUrl';

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
              to="/docs/get-started/docker"
            >
              Get Started
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="https://github.com/gotenberg/gotenberg"
            >
              <img
                className={styles.githubIcon}
                src={useBaseUrl("/img/github.svg")}
                alt="GitHub Logo"
              />{" "}
              <span className={styles.githubButtonText}>GitHub</span>
            </Link>
            <p className="padding-top--md">
              Available on both <strong>amd64</strong> and{" "}
              <strong>arm64</strong> architectures
            </p>
          </div>
          <div className="col col--6">
            <img className={styles.logo} src={useBaseUrl("/img/logo_jed.png")} alt="Gotenberg Hero Logo" />
          </div>
        </div>
      </div>
    </header>
  );
}
