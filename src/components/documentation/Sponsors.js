import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./Sponsors.module.css";

// [link, logo, name, logo kind].
const SPONSORS = [
  [
    "https://thecodingmachine.com",
    "/img/thecodingmachine-logo.png",
    "TheCodingMachine",
  ],
  ["https://pdfme.com", "/img/pdfme-logo.png", "pdfme", "banner"],
  ["https://pdfbolt.com", "/img/pdfbolt-logo.svg", "PDFBolt"],
  ["https://filetopdf.dev", "/img/filetopdf-logo.png", "FileToPDF", "wordmark"],
];

const POWERED_BY = [
  [
    "https://docs.docker.com/docker-hub/repos/manage/trusted-content/dsos-program/",
    "/img/docker-logo-blue.svg",
    "Docker",
    "small",
  ],
  [
    "https://jb.gg/OpenSourceSupport",
    "/img/jetbrains-logo.svg",
    "JetBrains",
    "small",
  ],
];

function Card({ href, src, alt, kind }) {
  return (
    <Link className={clsx(styles.card, kind && styles[kind])} href={href}>
      <img className={styles.logo} src={useBaseUrl(src)} alt={alt} />
    </Link>
  );
}

// The sponsors band below every doc page and above the footer (see
// src/theme/DocRoot/Layout). Logos in color on white cards, in both themes,
// as on the homepage.
export default function Sponsors() {
  return (
    <aside className={styles.band} aria-label="Sponsors">
      <div className={clsx("container", styles.inner)}>
        <div className={styles.group}>
          <span className={styles.label}>Sponsors</span>
          <div className={styles.cards}>
            {SPONSORS.map(([href, src, alt, kind]) => (
              <Card key={alt} href={href} src={src} alt={alt} kind={kind} />
            ))}
          </div>
        </div>
        <div className={styles.group}>
          <span className={styles.label}>Powered by</span>
          <div className={styles.cards}>
            {POWERED_BY.map(([href, src, alt, kind]) => (
              <Card key={alt} href={href} src={src} alt={alt} kind={kind} />
            ))}
            <Link
              className={styles.cta}
              href="https://github.com/sponsors/gulien"
            >
              <svg
                className={styles.heart}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3.1 4.5 6.9 4.5c2.1 0 3.6 1.2 5.1 3 1.5-1.8 3-3 5.1-3 3.8 0 6 3.9 4.5 7.3C19.5 16.4 12 21 12 21z" />
              </svg>
              Become a sponsor
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
