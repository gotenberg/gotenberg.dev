import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import cx from "./cx";

function Card({ href, src, alt, className, style }) {
  return (
    <Link className={cx("xb-sp-card", className)} href={href}>
      <img src={useBaseUrl(src)} alt={alt} style={style} />
    </Link>
  );
}

export default function Sponsors() {
  return (
    <section className={cx("xb-sponsors")}>
      <div className={cx("g9-wrap")}>
        <h2 className={cx("xb-sp-label")}>Sponsors</h2>
        <div className={cx("xb-sp-grid")}>
          <Card
            href="https://thecodingmachine.com"
            src="/img/thecodingmachine-logo.png"
            alt="TheCodingMachine"
          />
          <Card
            href="https://pdfme.com"
            src="/img/pdfme-logo.png"
            alt="pdfme"
            className="xb-sp-card--banner"
          />
          <Card
            href="https://pdfbolt.com"
            src="/img/pdfbolt-logo.svg"
            alt="PDFBolt"
          />
          <Card
            href="https://filetopdf.dev"
            src="/img/filetopdf-logo.png"
            alt="FileToPDF"
            style={{ maxHeight: 40 }}
          />
        </div>
        <h2 className={cx("xb-sp-label")}>Powered by</h2>
        <div className={cx("xb-sp-grid")}>
          <Card
            href="https://docs.docker.com/docker-hub/repos/manage/trusted-content/dsos-program/"
            src="/img/docker-logo-blue.svg"
            alt="Docker"
            className="xb-sp-card--small"
          />
          <Card
            href="https://jb.gg/OpenSourceSupport"
            src="/img/jetbrains-logo.svg"
            alt="JetBrains"
            className="xb-sp-card--small"
          />
          <Link
            className={cx("xb-sp-cta")}
            href="https://github.com/sponsors/gulien"
            style={{ gridColumn: "span 2" }}
          >
            <svg
              className={cx("xb-sp-heart")}
              width="18"
              height="18"
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
    </section>
  );
}
