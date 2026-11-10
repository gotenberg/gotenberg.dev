import React, { useEffect, useRef, useState } from "react";
import cx from "./cx";
import { PROFILES } from "./data";
import { curl, json, response } from "@site/src/lib/requests";
import {
  CodePanel,
  Radio,
  RadioGroup,
  Section,
  SectionHead,
  Segmented,
  Switch,
} from "./ui";

// Where the violations sit on the page, in %.
const MARKS = [
  [18, 12],
  [74, 14],
  [12, 33],
  [52, 35],
  [70, 41],
  [90, 50],
  [40, 54],
  [16, 63],
  [80, 66],
  [56, 76],
  [20, 84],
];

const LINES = [
  "h",
  "92%",
  "86%",
  "90%",
  "64%",
  "",
  "88%",
  "94%",
  "80%",
  "90%",
  "46%",
  "",
  "84%",
  "91%",
  "70%",
];

const OPTIONS = [
  [
    "language",
    "The BCP 47 language of the document: de-DE here. Defaults to en.",
  ],
  [
    "aggressive",
    "Allows fixes that may alter visible content, for better compliance.",
  ],
  ["figureAltText", "Your alternate text for figures that lack one."],
];

// The validate then remediate run, replayed in a loop while it is in view on
// a device that hovers. It holds while the pointer or the focus is in it.
// Picking a step below or pausing stops the loop; with reduced motion or on
// touch it never starts.
const Instrument = React.forwardRef(function Instrument(
  { step, playing, onPlay, onHold },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx("cc-inst", !playing && "cc-still")}
      onMouseEnter={() => onHold(true)}
      onMouseLeave={() => onHold(false)}
      onFocus={() => onHold(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onHold(false);
      }}
    >
      <div className={cx("cc-inst__bar")}>
        <span className={cx("cc-method")}>POST</span>
        <span className={cx("xb-req")}>
          <b className={cx("xb-req__path")}>/forms/pdf/{step}</b>
          <i className={cx("xb-req__k")}> · files=@</i>report.pdf
          <i className={cx("xb-req__k")}> · profile=</i>PDF/A-4
        </span>
        <span className={cx("cc-ctl")}>
          <button
            type="button"
            className={cx("cc-play")}
            aria-label={
              playing ? "Pause the example run" : "Play the example run"
            }
            onClick={() => onPlay(!playing)}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              {playing ? (
                <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
              ) : (
                <path d="M7 4.5v15l12.5-7.5z" />
              )}
            </svg>
          </button>
        </span>
      </div>
      <div className={cx("cc-inst__body")}>
        <div className={cx("cc-bench")}>
          <div className={cx("cc-page")} aria-label="report.pdf, page 1">
            {LINES.map((line, i) =>
              line === "h" ? (
                <i key={i} className={cx("h")} />
              ) : (
                <i
                  key={i}
                  style={
                    line
                      ? { width: line }
                      : { width: 0, height: 18, background: "none" }
                  }
                />
              ),
            )}
            {MARKS.map(([x, y], i) => (
              <span
                key={i}
                className={cx("cc-mark")}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  animationDelay: `${(0.15 + i * 0.09).toFixed(2)}s`,
                }}
              />
            ))}
            <span
              className={cx("cc-callout")}
              style={{ left: "58%", top: "4%" }}
            >
              6.7.2.1 · Metadata
            </span>
            <span
              className={cx("cc-callout")}
              style={{ left: "62%", top: "36%" }}
            >
              6.2.4.3 · ×9
            </span>
            <span
              className={cx("cc-callout")}
              style={{ left: "4%", top: "70%" }}
            >
              6.1.2 · Header
            </span>
            <span className={cx("cc-beam")} aria-hidden="true" />
            <span className={cx("cc-seal")} aria-hidden="true">
              <span>
                <b>PDF/A-4</b>
                compliant
              </span>
            </span>
          </div>
        </div>
        <div className={cx("cc-readout")}>
          <div
            className={cx("cc-state")}
            aria-hidden={step !== "validate" || undefined}
            inert={step !== "validate"}
          >
            <div className={cx("cc-gauge")}>
              <b>11</b>
              <span>
                <strong>fatal violations</strong>PDF/A-4 · ISO 19005-4
              </span>
            </div>
            <ol className={cx("cc-rows")}>
              <li>
                <code>6.1.2</code>
                <span>
                  The file header shall begin at byte zero and shall consist of
                  "%PDF-2.n" followed by a single EOL marker.
                  <small>
                    test 1 · header "%PDF-1.7" does not match required pattern
                  </small>
                </span>
                <em>×1</em>
              </li>
              <li>
                <code>6.2.4.3</code>
                <span>
                  DeviceRGB shall only be used if a device independent
                  DefaultRGB colour space has been set.
                  <small>
                    test 2 · page 1: DeviceRGB used without DefaultRGB or RGB
                    OutputIntent
                  </small>
                </span>
                <em>×9</em>
              </li>
              <li>
                <code>6.7.2.1</code>
                <span>
                  The document catalog dictionary of a conforming file shall
                  contain the Metadata key.
                  <small>
                    test 1 · catalog missing or invalid /Metadata stream
                  </small>
                </span>
                <em>×1</em>
              </li>
            </ol>
            <p className={cx("cc-foot")}>
              The JSON answer says <code>"compliant": false</code>, with the
              specification, clause, test number, context and severity of each
              violation.
            </p>
          </div>
          <div
            className={cx("cc-state")}
            aria-hidden={step !== "remediate" || undefined}
            inert={step !== "remediate"}
          >
            <div className={cx("cc-gauge")}>
              <b>0</b>
              <span>
                <strong>violations left</strong>PDF/A-4 · compliant
              </span>
            </div>
            <div className={cx("cc-headers")}>
              <div>
                <span>HTTP/1.1</span> 200 OK
              </div>
              <div>
                <span>Content-Type:</span> application/pdf
              </div>
              <div>
                <span>Gotenberg-Remediation-Residual:</span> <b>0</b>
              </div>
            </div>
            <p className={cx("cc-foot")}>
              Validated again: <code>"compliant": true</code>, and the file is
              now PDF 2.0. A real litho run on a three-page PDF from Gotenberg's
              integration tests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

function Builder({ profile, mode, setMode, options, toggle }) {
  const fx = profile === "Factur-X";
  const remediate = mode === "remediate";
  const file = fx ? "invoice.pdf" : "report.pdf";

  const args = [["form", "files", file, "file"]];
  if (remediate && fx) args.push(["form", "files", "invoice.xml", "file"]);
  args.push(["form", "profile", profile]);
  if (remediate) {
    if (options.language) args.push(["form", "language", "de-DE"]);
    if (options.aggressive) args.push(["form", "aggressive", "true"]);
    if (options.figureAltText)
      args.push(["form", "figureAltText", "Company logo"]);
    if (fx)
      args.push(["form", "xml", "invoice.xml"], ["form", "level", "EN 16931"]);
  }
  const request = curl(
    "/forms/pdf/" + mode,
    args,
    remediate ? "conforming.pdf" : null,
  );

  // PDF/A-4 shows the real run; other profiles show the shape of the answer.
  const real = profile === "PDF/A-4";
  let rows;
  if (!remediate && real) {
    rows = [
      "HTTP/1.1 200 OK",
      "Content-Type: application/json",
      ...json({
        [file]: {
          profile,
          compliant: false,
          violations: [
            { clause: "6.1.2", testNumber: 1, severity: "fatal" },
            { clause: "6.2.4.3", testNumber: 2, severity: "fatal" },
            { clause: "6.7.2.1", testNumber: 1, severity: "fatal" },
          ],
        },
      }),
      "# The real run: 11 violations, 1 + 9 + 1, all in ISO_19005_4. Specification, description and context left out here.",
    ];
  } else if (!remediate) {
    rows = [
      "HTTP/1.1 200 OK",
      "Content-Type: application/json",
      "{",
      `  "${file}": {`,
      `    "profile": "${profile}",`,
      '    "compliant": true | false,',
      '    "violations": [ … ]',
      "  }",
      "}",
      "# Each violation: specification, clause, testNumber, description, context, severity. Compliant means no fatal one.",
    ];
  } else {
    rows = [
      "HTTP/1.1 200 OK",
      "Content-Type: application/pdf",
      "Gotenberg-Remediation-Residual: " + (real ? "0" : "<count>"),
      "Gotenberg-Remediation-Rolled-Back: <count>",
      "# Residual counts the violations left: above 0, the output does not conform. Rolled-Back counts fixes undone for changing the content.",
    ];
  }

  return (
    <div className={cx("xb-build")}>
      <div className={cx("xb-ctl")}>
        <h3 className={cx("xb-ctl__h")}>
          {profile}, {remediate ? "remediated" : "validated"}
        </h3>
        <Segmented
          label="Step"
          options={[
            ["validate", "validate"],
            ["remediate", "remediate"],
          ]}
          value={mode}
          onChange={setMode}
        />
        {remediate ? (
          <>
            <div className={cx("xb-opts")}>
              {OPTIONS.map(([name, desc]) => (
                <Switch
                  key={name}
                  className="xb-opt"
                  on={options[name]}
                  onToggle={() => toggle(name)}
                >
                  <span>
                    <span className={cx("xb-opt__name")}>{name}</span>
                    <span className={cx("xb-opt__desc")}>{desc}</span>
                  </span>
                </Switch>
              ))}
            </div>
            <p className={cx("xb-note")}>
              {fx ? (
                <>
                  Factur-X also takes the invoice XML and its level: see{" "}
                  <a href="#invoice">E-invoicing</a>.
                </>
              ) : (
                "Remediation runs as a stage too, in a pipe or after any conversion."
              )}
            </p>
          </>
        ) : (
          <p className={cx("xb-note")}>
            The validate route takes the profile, and a <code>password</code>{" "}
            for encrypted files. It answers JSON, one report per file.
          </p>
        )}
      </div>
      <CodePanel
        title={"litho · /forms/pdf/" + mode}
        request={request}
        res={response(rows)}
      />
    </div>
  );
}

export default function Conformance() {
  const [step, setStep] = useState("validate");
  const [playing, setPlaying] = useState(false);
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(false);
  const [profile, setProfile] = useState("PDF/A-4");
  const [mode, setMode] = useState("validate");
  const inst = useRef(null);
  const [options, setOptions] = useState({
    language: false,
    aggressive: false,
    figureAltText: false,
  });

  // Autoplay only where the pointer can hold the run and motion is welcome.
  useEffect(() => {
    const ok = window.matchMedia(
      "(hover: hover) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (ok) setPlaying(true);
  }, []);

  useEffect(() => {
    if (!inst.current || !("IntersectionObserver" in window)) {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    io.observe(inst.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || hold || !inView) return undefined;
    const timer = setInterval(
      () => setStep((s) => (s === "validate" ? "remediate" : "validate")),
      4800,
    );
    return () => clearInterval(timer);
  }, [playing, hold, inView]);

  return (
    <Section id="conform">
      <SectionHead
        n="01"
        kicker="Conformance"
        title="Print anything."
        accent="Prove it."
        lede="Validates any PDF against PDF/A, PDF/UA and Factur-X, clause by clause, and remediates what fails."
        more={{ to: "/docs/pdf/validate", label: "Validate a PDF" }}
      >
        litho, a pure-Go PDF processor, takes over from QPDF, pdfcpu, pdftk and
        ExifTool, the tools behind Gotenberg 8's PDF engines. PDF/A and PDF/UA
        rules carry veraPDF's clause numbers.
      </SectionHead>
      <div className={cx("xb-stack", step === "remediate" && "cc-fixed")}>
        <Instrument
          ref={inst}
          step={step}
          playing={playing}
          onPlay={setPlaying}
          onHold={setHold}
        />
        <div className={cx("xb-label")} style={{ margin: "30px 0 -4px" }}>
          <span>
            <span className={cx("xb-field")}>profile</span> · pick one of 14
          </span>
        </div>
        <RadioGroup
          label="profile"
          value={profile}
          onChange={setProfile}
          className="xb-els"
        >
          {PROFILES.map(([name, family, short, iso, fam], i) => (
            <Radio
              key={name}
              value={name}
              label={`${name} ${iso}`}
              className={["xb-el", fam]}
            >
              <span className={cx("xb-el__top")}>
                <span className={cx("xb-el__fam")}>{family}</span>
                <span className={cx("xb-el__no")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <span className={cx("xb-el__sym")}>{short}</span>
              <span className={cx("xb-el__iso")}>{iso}</span>
            </Radio>
          ))}
        </RadioGroup>
        <Builder
          profile={profile}
          mode={mode}
          setMode={(m) => {
            setMode(m);
            setStep(m);
            setPlaying(false);
          }}
          options={options}
          toggle={(name) => setOptions((o) => ({ ...o, [name]: !o[name] }))}
        />
      </div>
    </Section>
  );
}
