import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./Sponsors.module.css";

export default function Sponsors() {
  return (
    <div className={styles.wrapper}>
      {/* 1. The Big Sponsors */}
      <div className={styles.sponsorGrid}>
        <a
          href="https://thecodingmachine.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cleanLink}
        >
          <img
            src="https://user-images.githubusercontent.com/8983173/130324668-9d6e7b35-53a3-49c7-a574-38190d2bd6b0.png"
            alt="TheCodingMachine"
            className={styles.logoPrimary}
          />
        </a>
        <a
          href="https://pdfme.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cleanLink}
        >
          <img
            src="https://github.com/user-attachments/assets/2a75dd40-ca18-4d34-acd5-5dd474595168"
            alt="pdfme"
            className={styles.logoPrimary}
          />
        </a>
      </div>

      {/* 2. The Infrastructure Partners */}
      <div className={styles.metaRow}>
        <span className={styles.label}>Powered by</span>
        <div className={styles.infraGrid}>
          <a
            href="https://docs.docker.com/docker-hub/repos/manage/trusted-content/dsos-program/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cleanLink}
            title="Docker Sponsored OSS"
          >
            <img
              src={useBaseUrl("/img/docker-logo-blue.svg")}
              alt="Docker"
              className={styles.logoSecondary}
            />
          </a>
          <a
            href="https://jb.gg/OpenSourceSupport"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cleanLink}
            title="JetBrains Tools"
          >
            <img
              src={useBaseUrl("/img/jetbrains-logo.svg")}
              alt="JetBrains"
              className={styles.logoSecondary}
            />
          </a>
        </div>
      </div>

      {/* 3. The "Better" Sponsor Button */}
      <div className={styles.ctaRow}>
        <a
          href="https://github.com/sponsors/gulien"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.sponsorButton}
        >
          <span className={styles.heart}>❤️</span> Become a sponsor
        </a>
      </div>
    </div>
  );
}
