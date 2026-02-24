import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./Sponsors.module.css";

export default function Sponsors() {
  return (
    <div className={styles.sponsorsStrip}>
      {/* Group 1: The Sponsors */}
      <div className={styles.sponsorCategory}>
        <span className={styles.sponsorStripLabel}>Sponsors</span>
        <a
          href="https://thecodingmachine.com"
          target="_blank"
          className={styles.cleanLink}
        >
          <img
            src="https://user-images.githubusercontent.com/8983173/130324668-9d6e7b35-53a3-49c7-a574-38190d2bd6b0.png"
            alt="TCM"
            className={`${styles.logoStrip} ${styles.logoWide}`}
          />
        </a>
        <a
          href="https://pdfme.com"
          target="_blank"
          className={styles.cleanLink}
        >
          <img
            src="https://github.com/user-attachments/assets/2a75dd40-ca18-4d34-acd5-5dd474595168"
            alt="pdfme"
            className={`${styles.logoStrip} ${styles.logoWide}`}
          />
        </a>
      </div>

      <div className={styles.sponsorDivider} />

      {/* Group 2: Powered By */}
      <div className={styles.sponsorCategory}>
        <span className={styles.sponsorStripLabel}>Powered by</span>
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
