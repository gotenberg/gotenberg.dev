import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./Sponsors.module.css";

export default function Sponsors() {
  return (
    <div className={styles.sponsorsStrip}>
      {/* Group 1: Sponsors */}
      <div className={styles.sponsorRow}>
        <span className={styles.sponsorStripLabel}>Sponsors</span>
        <div className={styles.sponsorLogos}>
          <a
            href="https://thecodingmachine.com"
            target="_blank"
            className={styles.cleanLink}
          >
            <img
              src={useBaseUrl("/img/thecodingmachine-logo.png")}
              alt="TheCodingMachine"
              className={`${styles.logoStrip} ${styles.logoWide}`}
            />
          </a>
          <a
            href="https://pdfme.com"
            target="_blank"
            className={styles.cleanLink}
          >
            <img
              src={useBaseUrl("/img/pdfme-logo.png")}
              alt="pdfme"
              className={`${styles.logoStrip} ${styles.logoWide}`}
            />
          </a>
          <a
            href="https://pdfbolt.com"
            target="_blank"
            className={styles.cleanLink}
          >
            <img
              src={useBaseUrl("/img/pdfbolt-logo.svg")}
              alt="PdfBolt"
              className={`${styles.logoStrip} ${styles.logoWide}`}
            />
          </a>
        </div>
      </div>

      {/* Group 2: Powered By */}
      <div className={styles.sponsorRow}>
        <span className={styles.sponsorStripLabel}>Powered by</span>
        <div className={styles.sponsorLogos}>
          <a
            href="https://docs.docker.com/docker-hub/repos/manage/trusted-content/dsos-program/"
            target="_blank"
            className={styles.cleanLink}
          >
            <img
              src={useBaseUrl("/img/docker-logo-blue.svg")}
              alt="Docker"
              className={`${styles.logoStrip} ${styles.logoSquare}`}
            />
          </a>
          <a
            href="https://jb.gg/OpenSourceSupport"
            target="_blank"
            className={styles.cleanLink}
          >
            <img
              src={useBaseUrl("/img/jetbrains-logo.svg")}
              alt="JetBrains"
              className={`${styles.logoStrip} ${styles.logoSquare}`}
            />
          </a>
        </div>
      </div>

      {/* Group 3: CTA */}
      <div className={styles.ctaWrapper}>
        <a
          href="https://github.com/sponsors/gulien"
          target="_blank"
          className={styles.sponsorButton}
        >
          <span className={styles.heart}>❤️</span> Become a sponsor
        </a>
      </div>
    </div>
  );
}
