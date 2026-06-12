import React from "react";
import styles from "./Homepage.module.css";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

// --- HELPER COMPONENTS ---
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
        {(() => {
          const lines = content.trim().split("\n");
          let previousContinues = false;
          return lines.map((line, i) => {
            const isComment = line.trim().startsWith("#");
            const isCommandStart =
              !isComment && line.trim() !== "" && !previousContinues;
            previousContinues = line.trimEnd().endsWith("\\");
            return (
              <div
                key={i}
                className={clsx(
                  styles.codeLine,
                  isCommandStart && styles.promptLine
                )}
              >
                {highlightLine(line)}
              </div>
            );
          });
        })()}
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
  const codeHero = `# Start the container.
docker run --rm -p "3000:3000" gotenberg/gotenberg:8
# Convert a URL to PDF.
curl \\
--request POST http://localhost:3000/forms/chromium/convert/url \\
--form url=https://my.url \\
-o my.pdf`;

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
--header 'Gotenberg-Webhook-Method: PUT' \\
# 3. Get notified when it's done \\
--header 'Gotenberg-Webhook-Events-Url: https://my-api.com/events'
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
                Send a file, get a PDF back. Chromium, LibreOffice, and PDF
                engines in one container.
              </p>

              <div className={styles.buttons}>
                <Link
                  className={clsx(
                    "button button--primary button--lg",
                    styles.btnPrimary
                  )}
                  to="/docs/getting-started/introduction"
                >
                  Getting Started
                </Link>

                <Link
                  className={clsx(
                    "button button--secondary button--lg",
                    styles.btnSecondary
                  )}
                  to="https://github.com/gotenberg/gotenberg"
                >
                  <img
                    className={styles.githubIcon}
                    src={useBaseUrl("/img/github.svg")}
                    alt="GitHub Logo"
                  />
                  <span>GitHub</span>
                </Link>
              </div>
            </div>

            <div className={clsx("col col--6", styles.heroImage)}>
              <img
                className={styles.logo}
                src={useBaseUrl("/img/logo_jed.png")}
                alt="Gotenberg Hero Logo"
                width="759"
                height="760"
                fetchpriority="high"
              />
            </div>
          </div>
        </div>
      </header>

      {/* --- QUICK START --- */}
      <section className={styles.quickstart}>
        <div className="container">
          <div className={styles.quickstartInner}>
            <h2>
              Up and running in{" "}
              <span className={styles.highlight}>two commands</span>
            </h2>
            <SimpleTerminal content={codeHero} />
          </div>
        </div>
      </section>

      {/* --- COMMUNITY & SPONSORS SECTION --- */}
      <section className={styles.communitySection}>
        <div className="container">
          <div className={styles.sponsorsStrip}>
            <div className={styles.sponsorRow}>
              <span className={styles.sponsorStripLabel}>Sponsors</span>
              <div className={styles.sponsorLogos}>
                <a href="https://thecodingmachine.com" target="_blank">
                  <img
                    src={useBaseUrl("/img/thecodingmachine-logo.png")}
                    alt="TheCodingMachine"
                    className={clsx(styles.logoStrip, styles.logoWide)}
                  />
                </a>
                <a href="https://pdfme.com" target="_blank">
                  <img
                    src={useBaseUrl("/img/pdfme-logo.png")}
                    alt="pdfme"
                    className={clsx(styles.logoStrip, styles.logoWide)}
                  />
                </a>
                <a href="https://pdfbolt.com" target="_blank">
                  <img
                    src={useBaseUrl("/img/pdfbolt-logo.svg")}
                    alt="PdfBolt"
                    className={clsx(styles.logoStrip, styles.logoWide)}
                  />
                </a>
                <a href="https://filetopdf.dev" target="_blank">
                  <img
                    src={useBaseUrl("/img/filetopdf-logo.png")}
                    alt="FileToPDF"
                    className={clsx(styles.logoStrip, styles.logoWordmark)}
                  />
                </a>
              </div>
            </div>

            <div className={styles.sponsorRow}>
              <span className={styles.sponsorStripLabel}>Powered By</span>
              <div className={styles.sponsorLogos}>
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
            </div>

            <div>
              <Link
                to="https://github.com/sponsors/gulien"
                className={styles.sponsorLink}
              >
                Become a sponsor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section className={styles.featureSection}>
        <div className="container">
          <div className={styles.splitRow}>
            <div className={styles.splitContent}>
              <h2 className={styles.blockTitle}>
                Pixel-Perfect <span className={styles.highlight}>Chromium</span>
              </h2>
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
        </div>
      </section>

      <section className={clsx(styles.featureSection, styles.featureAlt)}>
        <div className="container">
          <div className={clsx(styles.splitRow, styles.splitRowReverse)}>
            <div className={styles.splitContent}>
              <h2 className={styles.blockTitle}>
                Automate <span className={styles.highlight}>LibreOffice</span>
              </h2>
              <p>
                Convert Word, Excel, PowerPoint, and 100+ other formats.
                LibreOffice runs under the hood.
              </p>
              <div className={styles.capabilitiesGrid}>
                <div className={styles.capItem}>
                  <strong>Extensive Formats</strong>
                  <span>
                    Support for .docx, .xlsx, .pptx, and dozens of other legacy
                    or standard document formats.
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
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className="container">
          <div className={styles.splitRow}>
            <div className={styles.splitContent}>
              <h2 className={styles.blockTitle}>
                Post-Processing{" "}
                <span className={styles.highlight}>Engines</span>
              </h2>
              <p>
                Merge, split, encrypt, and inspect PDFs, or produce Factur-X
                e-invoices, using QPDF, pdfcpu, and ExifTool through a unified
                API.
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
                    Encrypt with passwords and permissions. Embed attachments or
                    build Factur-X / ZUGFeRD e-invoices. Read or write metadata
                    and bookmarks.
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.splitVisual}>
              <SimpleTerminal content={codePdfEngines} />
            </div>
          </div>
        </div>
      </section>

      <section className={clsx(styles.featureSection, styles.featureAlt)}>
        <div className="container">
          <div className={clsx(styles.splitRow, styles.splitRowReverse)}>
            <div className={styles.splitContent}>
              <h2 className={styles.blockTitle}>
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
                  <strong>Webhook Events</strong>
                  <span>
                    Get notified with structured JSON events on completion or
                    failure, separate from the result delivery.
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
            <div className={styles.splitVisual}>
              <SimpleTerminal content={codeS3Workflow} />
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className={clsx(styles.section, styles.finalCta)}>
        <div className="container">
          <h2>
            Ready to transform your{" "}
            <span className={styles.highlight}>workflows?</span>
          </h2>
          <p>Two commands away from your first PDF.</p>

          <div className={styles.statsBar}>
            <a
              href="https://hub.docker.com/r/gotenberg/gotenberg"
              className={styles.statInline}
            >
              <span className={styles.statNumber}>55M+</span>
              <span className={styles.statLabel}>Docker Pulls</span>
            </a>
            <span className={styles.statDot}>&middot;</span>
            <a
              href="https://github.com/gotenberg/gotenberg"
              className={styles.statInline}
            >
              <span className={styles.statNumber}>11k+</span>
              <span className={styles.statLabel}>GitHub Stars</span>
            </a>
            <span className={styles.statDot}>&middot;</span>
            <a
              href="https://github.com/gotenberg/gotenberg?tab=MIT-1-ov-file#readme"
              className={styles.statInline}
            >
              <span className={styles.statNumber}>MIT</span>
              <span className={styles.statLabel}>License</span>
            </a>
          </div>

          <div className={styles.finalButtons}>
            <Link
              className={clsx(
                "button button--primary button--lg",
                styles.btnPrimary
              )}
              to="/docs/getting-started/introduction"
            >
              Getting Started
            </Link>

            <Link
              className={clsx(
                "button button--secondary button--lg",
                styles.btnSecondary
              )}
              to="https://github.com/gotenberg/gotenberg"
            >
              <img
                className={styles.githubIcon}
                src={useBaseUrl("/img/github.svg")}
                alt="GitHub Logo"
              />
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
