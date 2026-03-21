import React from "react";
import styles from "./Homepage.module.css";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

// --- ICONS ---
const DockerIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 756.26 596.9"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M743.96,245.25c-18.54-12.48-67.26-17.81-102.68-8.27-1.91-35.28-20.1-65.01-53.38-90.95l-12.32-8.27-8.21,12.4c-16.14,24.5-22.94,57.14-20.53,86.81,1.9,18.28,8.26,38.83,20.53,53.74-46.1,26.74-88.59,20.67-276.77,20.67H.06c-.85,42.49,5.98,124.23,57.96,190.77,5.74,7.35,12.04,14.46,18.87,21.31,42.26,42.32,106.11,73.35,201.59,73.44,145.66.13,270.46-78.6,346.37-268.97,24.98.41,90.92,4.48,123.19-57.88.79-1.05,8.21-16.54,8.21-16.54l-12.3-8.27ZM189.67,206.39h-81.7v81.7h81.7v-81.7ZM295.22,206.39h-81.7v81.7h81.7v-81.7ZM400.77,206.39h-81.7v81.7h81.7v-81.7ZM506.32,206.39h-81.7v81.7h81.7v-81.7ZM84.12,206.39H2.42v81.7h81.7v-81.7ZM189.67,103.2h-81.7v81.7h81.7v-81.7ZM295.22,103.2h-81.7v81.7h81.7v-81.7ZM400.77,103.2h-81.7v81.7h81.7v-81.7ZM400.77,0h-81.7v81.7h81.7V0Z" />
  </svg>
);

const StarIcon = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
  </svg>
);

const LicenseIcon = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
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

// --- HELPER COMPONENTS ---
const StatCard = ({ icon: Icon, number, label, highlight, colorClass }) => (
  <div className={clsx(styles.statCard, styles[colorClass])}>
    <div className={styles.statIconWrapper}>
      <Icon />
    </div>
    <div className={styles.statContent}>
      <div className={styles.statNumber}>{number}</div>
      <div className={styles.statLabel}>
        {label}{" "}
        {highlight && <span className={styles.statHighlight}>{highlight}</span>}
      </div>
    </div>
  </div>
);

const SimpleTerminal = ({ content }) => {
  return (
    <div className={styles.terminalWindow}>
      <div className={styles.terminalHeader}>
        <div className={styles.dots}>
          <div className={clsx(styles.dot, styles.red)} />
          <div className={clsx(styles.dot, styles.yellow)} />
          <div className={clsx(styles.dot, styles.green)} />
        </div>
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

const highlightLine = (line) => {
  if (line.trim().startsWith("#")) {
    return <span className={styles.cComment}>{line}</span>;
  }

  const tokenRegex =
    /(--[\w-]+)|(-[a-zA-Z])|(".*?")|(\\)|(https?:\/\/[^\s]+)|(\s+)|([^\s]+)/g;
  const tokens = [];
  let match;

  while ((match = tokenRegex.exec(line)) !== null) {
    const [full, flagDouble, flagSingle, string, operator, url, space, plain] =
      match;
    let style = styles.cPlain;

    if (flagDouble || flagSingle) style = styles.cFlag;
    else if (string) style = styles.cString;
    else if (url) style = styles.cUrl;
    else if (operator) style = styles.cOperator;
    else if (plain === "curl" || plain === "docker" || plain === "run")
      style = styles.cCommand;

    tokens.push(
      <span key={match.index} className={style}>
        {full}
      </span>
    );
  }
  return tokens;
};

// --- MAIN PAGE COMPONENT ---
export default function Homepage() {
  const codeChromium = `curl \\
--request POST http://localhost:3000/forms/chromium/convert/url \\
--form url=https://my.url \\
--form 'waitForExpression=window.status === '\''ready'\''' \\
--form 'extraHttpHeaders={"Authorization": "Bearer 123"}' \\
-o my.pdf`;

  const codeLibreOffice = `curl \\
--request POST http://localhost:3000/forms/libreoffice/convert \\
--form files=@my.docx \\
--form nativePageRanges=1-5 \\
--form pdfa=PDF/A-1b \\
-o my.pdf`;

  const codePdfEngines = `curl \\
--request POST http://localhost:3000/forms/pdfengines/merge \\
--form files=@doc1.pdf \\
--form files=@doc2.pdf \\
--form userPassword=user_secret \\
--form ownerPassword=owner_secret \\
-o merged_and_secured.pdf`;

  const codeS3Workflow = `curl \\
--request POST http://localhost:3000/forms/libreoffice/convert \\
# 1. Tell Gotenberg where to fetch the input file (S3 GET) \\
--form 'downloadFrom=[{ \\
  "url": "https://my-bucket.s3.amazonaws.com/file.docx?Start=..." \\
}]'
# 2. Tell Gotenberg where to upload the result (S3 PUT) \\
--header 'Gotenberg-Webhook-Url: https://my-bucket.s3.amazonaws.com/out.pdf?Start=...' \\
--header 'Gotenberg-Webhook-Method: PUT'
`;

  return (
    <main className={styles.mainContainer}>
      {/* --- HERO SECTION --- */}
      <header className={styles.hero}>
        <div className="container">
          <div className="row">
            <div className={clsx("col col--6", styles.heroContent)}>
              <h1 className={styles.title}>
                A Docker-based API built for
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

      {/* --- COMMUNITY & SPONSORS SECTION --- */}
      <section className={styles.communitySection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <a
              href="https://hub.docker.com/r/gotenberg/gotenberg"
              className={styles.statLinkWrapper}
            >
              <StatCard
                icon={DockerIcon}
                number="55M+"
                label="Docker Pulls"
                colorClass="blue"
              />
            </a>
            <a
              href="https://github.com/gotenberg/gotenberg"
              className={styles.statLinkWrapper}
            >
              <StatCard
                icon={StarIcon}
                number="11k+"
                label="GitHub Stars"
                highlight="❤️"
                colorClass="yellow"
              />
            </a>
            <a
              href="https://github.com/gotenberg/gotenberg?tab=MIT-1-ov-file#readme"
              className={styles.statLinkWrapper}
            >
              <StatCard
                icon={LicenseIcon}
                number="MIT"
                label="Open Source License"
                colorClass="teal"
              />
            </a>
          </div>

          <div className={styles.sponsorsStrip}>
            <div className={styles.sponsorCategory}>
              <span className={styles.sponsorStripLabel}>Sponsors</span>
              <a href="https://thecodingmachine.com" target="_blank">
                <img
                  src="https://user-images.githubusercontent.com/8983173/130324668-9d6e7b35-53a3-49c7-a574-38190d2bd6b0.png"
                  alt="TheCodingMachine"
                  className={clsx(styles.logoStrip, styles.logoWide)}
                />
              </a>
              <a href="https://pdfme.com" target="_blank">
                <img
                  src="https://github.com/user-attachments/assets/2a75dd40-ca18-4d34-acd5-5dd474595168"
                  alt="pdfme"
                  className={clsx(styles.logoStrip, styles.logoWide)}
                />
              </a>
            </div>

            <div className={styles.sponsorDivider} />

            <div className={styles.sponsorCategory}>
              <span className={styles.sponsorStripLabel}>Powered By</span>
              <a
                href="https://docs.docker.com/docker-hub/repos/manage/trusted-content/dsos-program/"
                target="_blank"
              >
                <img
                  src={useBaseUrl("/img/docker-logo-blue.svg")}
                  alt="Docker"
                  className={clsx(styles.logoStrip, styles.logoSquare)}
                />
              </a>
              <a href="https://jb.gg/OpenSourceSupport" target="_blank">
                <img
                  src={useBaseUrl("/img/jetbrains-logo.svg")}
                  alt="JetBrains"
                  className={clsx(styles.logoStrip, styles.logoSquare)}
                />
              </a>
            </div>

            <div className={styles.sponsorDivider} />

            <Link
              to="https://github.com/sponsors/gulien"
              className={styles.heartBtnStrip}
            >
              <HeartIcon />
              <span>Become a sponsor</span>
            </Link>
          </div>
        </div>
      </section>

      {/* --- FEATURES & ASYNC SECTION --- */}
      <section
        className={clsx(
          styles.section,
          styles.radiantSection,
          styles.radiantBento,
          styles.fadeTop,
          styles.fadeBottom
        )}
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>
              Everything you need for{" "}
              <span className={styles.highlight}>PDFs</span>
            </h2>
            <p className={styles.sectionSub}>Powerful tools, one container.</p>
          </div>

          <div className={styles.featureBlocks}>
            <div className={styles.splitRow}>
              <div className={styles.splitContent}>
                <div className={styles.badge}>Web to PDF</div>
                <h3 className={styles.blockTitle}>
                  Pixel-Perfect{" "}
                  <span className={styles.highlight}>Chromium</span>
                </h3>
                <p>
                  Convert URLs, HTML templates, and Markdown files into PDFs.
                  Headless Chromium executes JavaScript, loads web fonts, and
                  renders exactly like a browser.
                </p>
                <div className={styles.capabilitiesGrid}>
                  <div className={styles.capItem}>
                    <strong>Dynamic Content Ready</strong>
                    <span>
                      Wait for network idle, JavaScript expressions, or specific
                      DOM selectors before rendering SPAs.
                    </span>
                  </div>
                  <div className={styles.capItem}>
                    <strong>Network Control</strong>
                    <span>
                      Inject custom cookies, HTTP headers, and configure how to
                      handle network errors or specific status codes.
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.splitVisual}>
                <SimpleTerminal content={codeChromium} />
              </div>
            </div>

            <div className={clsx(styles.splitRow, styles.splitRowReverse)}>
              <div className={styles.splitContent}>
                <div className={styles.badge}>Office Suite</div>
                <h3 className={styles.blockTitle}>
                  Automate <span className={styles.highlight}>LibreOffice</span>
                </h3>
                <p>
                  Convert Word, Excel, PowerPoint, and 100+ other formats.
                  LibreOffice runs under the hood.
                </p>
                <div className={styles.capabilitiesGrid}>
                  <div className={styles.capItem}>
                    <strong>Extensive Formats</strong>
                    <span>
                      Support for .docx, .xlsx, .pptx, and dozens of other
                      legacy or standard document formats.
                    </span>
                  </div>
                  <div className={styles.capItem}>
                    <strong>Page Ranges & PDF/A</strong>
                    <span>
                      Extract specific pages during conversion and instantly
                      conform to PDF/A archival standards.
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.splitVisual}>
                <SimpleTerminal content={codeLibreOffice} />
              </div>
            </div>

            <div className={styles.splitRow}>
              <div className={styles.splitContent}>
                <div className={styles.badge}>PDF Operations</div>
                <h3 className={styles.blockTitle}>
                  Post-Processing{" "}
                  <span className={styles.highlight}>Engines</span>
                </h3>
                <p>
                  Merge, split, encrypt, and inspect PDFs using QPDF, pdfcpu,
                  and ExifTool through a unified API.
                </p>
                <div className={styles.capabilitiesGrid}>
                  <div className={styles.capItem}>
                    <strong>Merge, Split & Transform</strong>
                    <span>
                      Combine PDFs, extract page ranges, rotate, flatten form
                      fields, watermark, and stamp.
                    </span>
                  </div>
                  <div className={styles.capItem}>
                    <strong>Security & Metadata</strong>
                    <span>
                      Encrypt with user/owner passwords. Embed attachments. Read
                      or write metadata and bookmarks.
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.splitVisual}>
                <SimpleTerminal content={codePdfEngines} />
              </div>
            </div>

            <div className={clsx(styles.splitRow, styles.splitRowReverse)}>
              <div className={styles.splitContent}>
                <div className={styles.badge}>Cloud Native</div>
                <h3 className={styles.blockTitle}>
                  Zero-Transfer{" "}
                  <span className={styles.highlight}>Pipelines</span>
                </h3>
                <p>
                  Process files without burdening your application. Gotenberg
                  can stream documents directly from your Cloud Storage (S3,
                  MinIO, GCS) and upload the resulting PDF back to it, bypassing
                  your API entirely.
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
                      Save bandwidth. Your server orchestrates; Gotenberg does
                      the heavy lifting.
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.splitVisual}>
                <SimpleTerminal content={codeS3Workflow} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- FINAL CTA SECTION --- */}
      <section
        className={clsx(
          styles.section,
          styles.radiantSection,
          styles.radiantCta,
          styles.fadeTop,
          styles.finalCta
        )}
      >
        <div className={styles.ctaGlow} />
        <div className="container">
          <h2>
            Ready to transform your{" "}
            <span className={styles.highlight}>workflows?</span>
          </h2>
          <p>
            Join thousands of developers and start generating high-quality PDFs
            with Gotenberg's powerful containerized API.
          </p>

          <div className={styles.finalButtons}>
            <Link
              className={clsx(
                "button button--primary button--lg",
                styles.btnCrisp,
                styles.btnPrimary
              )}
              to="/docs/getting-started/introduction"
            >
              Getting Started
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
      </section>
    </main>
  );
}
