import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./Sponsors.module.css";

// Full-width light-gray bandeau rendered below the doc content and above the
// footer (see src/theme/DocRoot/Layout). A single centered logo bar: sponsor
// logos, a hairline divider, the runtime logos, then the CTA. Logos use the
// homepage grayscale overlay.
export default function Sponsors() {
  return (
    <aside className={styles.band} aria-label="Sponsors">
      <div className={clsx("container", styles.inner)}>
        <div className={styles.logos}>
          <a
            className={styles.logoLink}
            href="https://thecodingmachine.com"
            target="_blank"
          >
            <img
              className={clsx(styles.logo, styles.logoWide)}
              src={useBaseUrl("/img/thecodingmachine-logo.png")}
              alt="TheCodingMachine"
            />
          </a>
          <a
            className={styles.logoLink}
            href="https://pdfme.com"
            target="_blank"
          >
            <img
              className={clsx(styles.logo, styles.logoWide)}
              src={useBaseUrl("/img/pdfme-logo.png")}
              alt="pdfme"
            />
          </a>
          <a
            className={styles.logoLink}
            href="https://pdfbolt.com"
            target="_blank"
          >
            <img
              className={clsx(styles.logo, styles.logoWide)}
              src={useBaseUrl("/img/pdfbolt-logo.svg")}
              alt="PdfBolt"
            />
          </a>
          <a
            className={styles.logoLink}
            href="https://filetopdf.dev"
            target="_blank"
          >
            <img
              className={clsx(styles.logo, styles.logoWordmark)}
              src={useBaseUrl("/img/filetopdf-logo.png")}
              alt="FileToPDF"
            />
          </a>
        </div>

        <span className={styles.divider} aria-hidden="true" />

        <div className={styles.logos}>
          <a
            className={styles.logoLink}
            href="https://docs.docker.com/docker-hub/repos/manage/trusted-content/dsos-program/"
            target="_blank"
          >
            <img
              className={clsx(styles.logo, styles.logoSmall)}
              src={useBaseUrl("/img/docker-logo-blue.svg")}
              alt="Docker"
            />
          </a>
          <a
            className={styles.logoLink}
            href="https://jb.gg/OpenSourceSupport"
            target="_blank"
          >
            <img
              className={clsx(styles.logo, styles.logoSmall)}
              src={useBaseUrl("/img/jetbrains-logo.svg")}
              alt="JetBrains"
            />
          </a>
        </div>

        <Link className={styles.cta} to="https://github.com/sponsors/gulien">
          <span className={styles.heart}>&#10084;</span>
          <span>Become a sponsor</span>
        </Link>
      </div>
    </aside>
  );
}
