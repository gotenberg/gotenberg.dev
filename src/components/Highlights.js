import React from "react";
import styles from "./Highlights.module.css";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";

// --- ICONS ---
const ChromeIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="21.17" y1="8" x2="12" y2="8" />
    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
  </svg>
);
const DocIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
const MergeIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);
const SettingsIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const HeartIcon = () => (
  <svg
    className={styles.heartIcon}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

// --- COMPONENT: Simple Terminal (Fixed Highlighting) ---
const SimpleTerminal = ({ content, title = " " }) => {
  return (
    <div className={styles.terminalWindow}>
      <div className={styles.terminalHeader}>
        <div className={styles.dots}>
          <div className={clsx(styles.dot, styles.red)} />
          <div className={clsx(styles.dot, styles.yellow)} />
          <div className={clsx(styles.dot, styles.green)} />
        </div>
        <div className={styles.terminalTitle}>{title}</div>
      </div>
      <div className={styles.terminalBody}>
        {content
          .trim()
          .split("\n")
          .map((line, i) => (
            <div key={i} className={styles.codeLine}>
              {highlightLine(line)}
            </div>
          ))}
      </div>
    </div>
  );
};

// Robust tokenizer for curl/docker commands
const highlightLine = (line) => {
  // Regex to capture: commands, flags, quoted strings, operators, urls
  const tokenRegex =
    /(--[\w-]+)|(-[a-zA-Z])|(".*?")|(\\)|(https?:\/\/[^\s]+)|(\s+)|([^\s]+)/g;
  const tokens = [];
  let match;

  while ((match = tokenRegex.exec(line)) !== null) {
    const [full, flagDouble, flagSingle, string, operator, url, space, plain] =
      match;
    let style = styles.cPlain;

    if (flagDouble || flagSingle) style = styles.cFlag;
    // --form, -o
    else if (string) style = styles.cString;
    // "file.docx"
    else if (url) style = styles.cUrl;
    // http://...
    else if (operator) style = styles.cOperator;
    // \
    else if (plain === "curl" || plain === "docker" || plain === "run")
      style = styles.cCommand; // Keywords

    tokens.push(
      <span key={match.index} className={style}>
        {full}
      </span>
    );
  }
  return tokens;
};

// --- COMPONENT: Feature Card ---
const FeatureCard = ({ icon: Icon, title, description, code }) => (
  <div className={styles.featureCard}>
    <div className={styles.cardHeader}>
      <div className={styles.iconWrapper}>
        <Icon />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
    </div>
    <div className={styles.cardDesc}>{description}</div>
    <div className={styles.cardTerminal}>
      <SimpleTerminal content={code} />
    </div>
  </div>
);

export default function Highlights() {
  // 4 Explicit Examples
  const codeChromium = `curl \\
--request POST \\
--url http://localhost:3000/forms/chromium/convert/url \\
--form url=https://my.url \\
--form landscape=true \\
-o my.pdf`;

  const codeLibreOffice = `curl \\
--request POST \\
--url http://localhost:3000/forms/libreoffice/convert \\
--form files=@my.docx \\
--form pdfa=PDF/A-1b \\
-o my.pdf`;

  const codeMerge = `curl \\
--request POST \\
--url http://localhost:3000/forms/pdfengines/merge \\
--form files=@page1.pdf \\
--form files=@page2.pdf \\
--form files=@page3.pdf \\
-o merged.pdf`;

  const codeConfig = `docker run --rm -p 3000:3000 \\
-e API_PORT=3000 \\
-e API_TIMEOUT=10s \\
-e LOG_LEVEL=debug \\
-e CHROMIUM_MAX_QUEUE_SIZE=50 \\
-e LIBREOFFICE_MAX_QUEUE_SIZE=20 \\
gotenberg/gotenberg:8`;

  const codeS3Workflow = `curl \\
--request POST http://localhost:3000/forms/libreoffice/convert \\
# 1. Tell Gotenberg where to upload the result (S3 PUT) \\
--header 'Gotenberg-Webhook-Url: https://my-bucket.s3.amazonaws.com/out.pdf?Start=...' \\
--header 'Gotenberg-Webhook-Method: PUT' \\
# 2. Tell Gotenberg where to fetch the input file (S3 GET) \\
--form 'downloadFrom=[{ \\
  "url": "https://my-bucket.s3.amazonaws.com/file.docx?Start=..." \\
}]'`;

  return (
    <main className={styles.mainContainer}>
      {/* SECTION 1: 2x2 BENTO GRID */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>
              Everything you need for{" "}
              <span className={styles.highlight}>PDFs</span>
            </h2>
            <p className={styles.sectionSub}>Powerful tools, one container.</p>
          </div>

          <div className={styles.bentoGrid}>
            <FeatureCard
              icon={ChromeIcon}
              title="Chromium Engine"
              description="Convert URLs, HTML, and Markdown to PDF with pixel-perfect rendering."
              code={codeChromium}
            />
            <FeatureCard
              icon={DocIcon}
              title="Office Suite"
              description="Automate LibreOffice to convert Word, Excel, and PowerPoint documents."
              code={codeLibreOffice}
            />
            <FeatureCard
              icon={MergeIcon}
              title="PDF Operations"
              description="Merge, split, and standardise (PDF/A) multiple PDF files efficiently."
              code={codeMerge}
            />
            <FeatureCard
              icon={SettingsIcon}
              title="Customizable Platform"
              description="Configure the container to fit your stack: timeout, logging, and more."
              code={codeConfig}
            />
          </div>

          <div className={styles.centerAction}>
            <Link
              className={styles.btnExplore}
              to="/docs/convert-with-chromium/convert-url-to-pdf"
            >
              Explore all routes →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: ASYNC */}
      <section className={clsx(styles.section, styles.asyncSection)}>
        <div className="container">
          <div className={styles.splitRow}>
            {/* LEFT: The Pitch */}
            <div className={styles.splitContent}>
              <div className={styles.badge}>Cloud Native</div>
              <h2>
                Zero-Transfer{" "}
                <span className={styles.highlight}>Pipelines</span>
              </h2>
              <p>
                Process files without burdening your application. Gotenberg can
                stream documents directly from your Cloud Storage (S3, MinIO,
                GCS) and upload the resulting PDF back to it, bypassing your API
                entirely.
              </p>

              <div className={styles.capabilitiesGrid}>
                <div className={styles.capItem}>
                  <strong>Direct Fetch</strong>
                  <span>
                    Gotenberg pulls the file directly from an S3 Presigned GET
                    URL.
                  </span>
                </div>
                <div className={styles.capItem}>
                  <strong>Auto Upload</strong>
                  <span>
                    Gotenberg pushes the result to an S3 Presigned PUT URL.
                  </span>
                </div>
                <div className={styles.capItem}>
                  <strong>Efficiency</strong>
                  <span>
                    Save bandwidth. Your server orchestrates; Gotenberg does the
                    heavy lifting.
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: The Terminal */}
            <div className={styles.splitVisual}>
              <SimpleTerminal content={codeS3Workflow} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SPONSORS */}
      <section className={clsx(styles.section, styles.sponsorSection)}>
        <div className="container">
          {/* Tier 1: Financial Sponsors (Huge Logos) */}
          <div className={styles.sponsorGroup}>
            <p className={styles.sponsorLabel}>Proudly Sponsored By</p>
            <div className={styles.logos}>
              <a
                href="https://thecodingmachine.com"
                target="_blank"
                className={styles.logoLink}
              >
                <img
                  src="https://user-images.githubusercontent.com/8983173/130324668-9d6e7b35-53a3-49c7-a574-38190d2bd6b0.png"
                  alt="TheCodingMachine"
                  className={styles.logoBig}
                />
              </a>
              <a
                href="https://pdfme.com"
                target="_blank"
                className={styles.logoLink}
              >
                <img
                  src="https://github.com/user-attachments/assets/2a75dd40-ca18-4d34-acd5-5dd474595168"
                  alt="pdfme"
                  className={styles.logoBig}
                />
              </a>
            </div>
          </div>

          {/* Tier 2: Infrastructure & Tooling Partners */}
          <div className={styles.sponsorGroup}>
            <p className={styles.sponsorLabel}>Powered By</p>
            <div className={styles.logos}>
              <a
                href="https://docs.docker.com/docker-hub/repos/manage/trusted-content/dsos-program/"
                target="_blank"
                className={styles.logoLink}
                title="Docker Sponsored OSS"
              >
                <img
                  src={useBaseUrl("/img/docker-logo-blue.svg")}
                  alt="Docker"
                  className={styles.logoSmall}
                />
              </a>
              <a
                href="https://jb.gg/OpenSourceSupport"
                target="_blank"
                className={styles.logoLink}
                title="JetBrains Tools"
              >
                <img
                  src={useBaseUrl("/img/jetbrains-logo.svg")}
                  alt="JetBrains"
                  className={styles.logoSmall}
                />
              </a>
            </div>
          </div>

          {/* Crisp Animated Button */}
          <div className={styles.sponsorCta}>
            <Link
              to="https://github.com/sponsors/gulien"
              className={styles.heartBtn}
            >
              <HeartIcon />
              <span>Become a sponsor</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
