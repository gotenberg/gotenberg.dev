import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./Homepage.module.css";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

// --- REVEAL HOOK ---
// Elements already in or above the viewport on mount (e.g., page refreshed
// while scrolled down) are shown instantly without animation.
// We wait a frame for the browser to restore scroll position, then check
// whether the element is in or above the viewport. If so, show instantly.
// Otherwise, use IntersectionObserver for the scroll-triggered reveal.
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Wait one rAF so the browser has restored scroll position after refresh.
    const raf = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      // Element is above the viewport (scrolled past) or currently visible
      if (rect.bottom <= 0 || rect.top < window.innerHeight) {
        setSkipAnimation(true);
        setVisible(true);
        return;
      }

      // Element is below the viewport — observe for scroll-triggered reveal
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold }
      );
      observer.observe(el);
      // Store for cleanup
      el._revealObserver = observer;
    });

    return () => {
      cancelAnimationFrame(raf);
      if (el._revealObserver) {
        el._revealObserver.disconnect();
      }
    };
  }, [threshold]);

  return [ref, visible, skipAnimation];
}

// --- COUNT UP HOOK ---
function useCountUp(target, duration, start) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (duration <= 0) {
      setValue(target);
      return;
    }
    let startTime = null;
    let raf;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return value;
}

// --- ICONS ---
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
--header 'Gotenberg-Webhook-Error-Url: https://my-api.com/errors' \\
--header 'Gotenberg-Webhook-Method: PUT' \\
# 3. Get notified when it's done \\
--header 'Gotenberg-Webhook-Events-Url: https://my-api.com/events'
`;

  const [sectionHeaderRef, sectionHeaderVisible, sectionHeaderSkip] =
    useReveal(0.2);
  const [feature1Ref, feature1Visible, feature1Skip] = useReveal(0.15);
  const [feature2Ref, feature2Visible, feature2Skip] = useReveal(0.15);
  const [feature3Ref, feature3Visible, feature3Skip] = useReveal(0.15);
  const [feature4Ref, feature4Visible, feature4Skip] = useReveal(0.15);
  const [ctaRef, ctaVisible, ctaSkip] = useReveal(0.2);

  // Helper: returns the right CSS classes for reveal animations
  const revealClasses = (visible, skip) =>
    skip
      ? styles.revealInstant
      : clsx(styles.reveal, visible && styles.revealVisible);

  const dockerCount = useCountUp(55, ctaSkip ? 0 : 1800, ctaVisible);
  const starsCount = useCountUp(11, ctaSkip ? 0 : 1800, ctaVisible);

  return (
    <main className={styles.mainContainer}>
      {/* --- HERO SECTION --- */}
      <header className={styles.hero}>
        <div className="container">
          <div className="row">
            <div className={clsx("col col--6", styles.heroContent)}>
              <h1
                className={clsx(
                  styles.title,
                  styles.reveal,
                  styles.revealVisible
                )}
                style={{ animationDelay: "0s" }}
              >
                A Docker-based API built for
                <br />
                <span className={styles.highlight}>PDF conversion</span>
              </h1>

              <p
                className={clsx(
                  styles.subtitle,
                  styles.reveal,
                  styles.revealVisible
                )}
                style={{ animationDelay: "0.1s" }}
              >
                Available on <strong>amd64</strong>, <strong>arm64</strong>,{" "}
                <strong>armhf</strong>, <strong>i386</strong>, and{" "}
                <strong>ppc64le</strong>
              </p>

              <div
                className={clsx(
                  styles.buttons,
                  styles.reveal,
                  styles.revealVisible
                )}
                style={{ animationDelay: "0.2s" }}
              >
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

            <div
              className={clsx(
                "col col--6",
                styles.heroImage,
                styles.reveal,
                styles.revealVisible
              )}
              style={{ animationDelay: "0.15s" }}
            >
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
                className={styles.heartBtnStrip}
              >
                <HeartIcon />
                <span>Become a sponsor</span>
              </Link>
            </div>
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
          <div
            ref={sectionHeaderRef}
            className={clsx(
              styles.sectionHeader,
              revealClasses(sectionHeaderVisible, sectionHeaderSkip)
            )}
          >
            <h2>
              Everything you need for{" "}
              <span className={styles.highlight}>PDFs</span>
            </h2>
            <p className={styles.sectionSub}>Powerful tools, one container.</p>
          </div>

          <div className={styles.featureBlocks}>
            <div
              ref={feature1Ref}
              className={clsx(
                styles.splitRow,
                revealClasses(feature1Visible, feature1Skip)
              )}
            >
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

            <div
              ref={feature2Ref}
              className={clsx(
                styles.splitRow,
                styles.splitRowReverse,
                revealClasses(feature2Visible, feature2Skip)
              )}
            >
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

            <div
              ref={feature3Ref}
              className={clsx(
                styles.splitRow,
                revealClasses(feature3Visible, feature3Skip)
              )}
            >
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

            <div
              ref={feature4Ref}
              className={clsx(
                styles.splitRow,
                styles.splitRowReverse,
                revealClasses(feature4Visible, feature4Skip)
              )}
            >
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
                    <strong>Webhook Events</strong>
                    <span>
                      Get notified with structured JSON events on completion or
                      failure, separate from the result delivery.
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
        <div
          ref={ctaRef}
          className={clsx("container", revealClasses(ctaVisible, ctaSkip))}
        >
          <h2>
            Ready to transform your{" "}
            <span className={styles.highlight}>workflows?</span>
          </h2>
          <p>
            Join thousands of developers and start generating high-quality PDFs
            with Gotenberg's powerful containerized API.
          </p>

          <div className={styles.statsBar}>
            <a
              href="https://hub.docker.com/r/gotenberg/gotenberg"
              className={styles.statInline}
            >
              <span className={styles.statNumber}>{dockerCount}M+</span>
              <span className={styles.statLabel}>Docker Pulls</span>
            </a>
            <span className={styles.statDot}>&middot;</span>
            <a
              href="https://github.com/gotenberg/gotenberg"
              className={styles.statInline}
            >
              <span className={styles.statNumber}>{starsCount}k+</span>
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
