import React, { useState } from "react";
import Link from "@docusaurus/Link";
import cx from "./cx";
import { ENGINES, SIZES } from "./data";
import { curl } from "@site/src/lib/requests";
import {
  CodeBar,
  CodeLines,
  GitHubIcon,
  Radio,
  RadioGroup,
  RunCommand,
  Segmented,
  StarIcon,
  StartButton,
} from "./ui";

// px per mm on the canvas.
const SCALE = 1.3;

function Facts() {
  return (
    <>
      <p className={cx("xb-lede")}>
        Converts web pages and office documents to PDF, then remediates, signs
        and delivers them in the same request. Validates any PDF against PDF/A,
        PDF/UA and Factur-X.
      </p>
      <ul className={cx("xb-facts")}>
        <li className={cx("xb-fact")}>Pure-Go PDF engine</li>
        <li className={cx("xb-fact")}>26 PDF stages</li>
        <li className={cx("xb-fact")}>PDF/A · PDF/UA · Factur-X</li>
      </ul>
      <div className={cx("xb-btns")}>
        <StartButton />
        <Link
          className={cx("xb-btn xb-btn--ghost")}
          href="https://github.com/gotenberg/gotenberg"
        >
          <GitHubIcon />
          GitHub
          <span className={cx("xb-btn__count")}>
            <StarIcon size={15} />
            13k+
          </span>
        </Link>
      </div>
    </>
  );
}

// The invoice drawn on the sheet, typeset line by line.
function Ink() {
  const t = (d, extra) => ({ "--d": d, ...extra });
  return (
    <div className={cx("ca-ink")} aria-hidden="true">
      <div className={cx("ca-ink__top xb-t")} style={t(0)}>
        <span className={cx("ca-ink__title")}>Invoice</span>
        <span className={cx("ca-ink__mark")} />
      </div>
      <div className={cx("ca-bars")}>
        <i className={cx("xb-t")} style={t(1, { width: "46%" })} />
        <i className={cx("xb-t")} style={t(2, { width: "62%" })} />
        <i className={cx("xb-t")} style={t(3, { width: "38%" })} />
      </div>
      <div className={cx("ca-rows")}>
        {["52%", "40%", "58%", "34%"].map((width, i) => (
          <div key={width} className={cx("ca-row xb-t")} style={t(4 + i)}>
            <i style={{ width }} />
            <b />
          </div>
        ))}
        <div className={cx("ca-row ca-row--total xb-t")} style={t(8)}>
          <i />
          <b />
        </div>
      </div>
      <div className={cx("ca-bars ca-ink__foot")}>
        <i
          className={cx("xb-t")}
          style={t(9, { width: "70%", background: "#cfc8bc" })}
        />
        <i className={cx("xb-t")} style={t(10, { width: "54%" })} />
      </div>
    </div>
  );
}

export default function Hero() {
  const [engineKey, setEngineKey] = useState("url");
  const [paper, setPaper] = useState("A3");
  const [landscape, setLandscape] = useState(false);

  const engine = ENGINES.find((e) => e.key === engineKey);
  const orient = (w, h) => (landscape ? [h, w] : [w, h]);
  const [, pw, ph] = SIZES.find(([name]) => name === paper);
  const [cw, ch] = orient(pw, ph);
  const dims = `${cw} × ${ch} mm`;

  const args = engine.form.map(([name, value, kind]) => [
    "form",
    name,
    value,
    kind,
  ]);
  args.push(["form", "paperSize", paper]);
  if (landscape) args.push(["form", "landscape", "true"]);
  const request = curl(engine.route, args, engine.out);
  const note =
    engine.engine === "Chromium"
      ? "Without paperSize, Chromium prints on Letter."
      : "Without paperSize, LibreOffice keeps the document's own size.";

  return (
    <section className={cx("cb-hero")}>
      <div className={cx("g9-wrap")}>
        <div className={cx("cb-hero__top")}>
          <div>
            <span className={cx("xb-pill")}>
              <b className={cx("xb-pill__tag")}>Gotenberg 9</b>A Docker-based
              API for PDF
            </span>
            <h1 className={cx("cb-title")}>
              The PDF press,
              <br />
              <span>rebuilt.</span>
            </h1>
            <RunCommand />
          </div>
          <div>
            <Facts />
          </div>
        </div>

        <div className={cx("cb-comp xb-press")}>
          <div className={cx("cb-col")}>
            <div className={cx("xb-label")}>Source</div>
            <RadioGroup
              label="Source"
              value={engineKey}
              onChange={setEngineKey}
              className="xb-engs"
            >
              {ENGINES.map((e) => (
                <Radio key={e.key} value={e.key} className="xb-eng">
                  <span className={cx("xb-eng__k")}>{e.engine}</span>
                  <span className={cx("xb-eng__v")}>{e.label}</span>
                </Radio>
              ))}
            </RadioGroup>
            <div className={cx("xb-label")}>
              <span className={cx("xb-field")}>paperSize</span>
            </div>
            <RadioGroup
              label="paperSize"
              value={paper}
              onChange={setPaper}
              className="xb-sizes"
            >
              {SIZES.map(([name]) => (
                <Radio key={name} value={name} className="xb-size">
                  {name}
                </Radio>
              ))}
            </RadioGroup>
            <div className={cx("xb-label")}>
              <span className={cx("xb-field")}>landscape</span>
            </div>
            <Segmented
              label="landscape"
              className="xb-orient"
              options={[
                [false, "false"],
                [true, "true"],
              ]}
              value={landscape}
              onChange={setLandscape}
            />
            <div className={cx("xb-dims")}>
              <span className={cx("xb-dims__n")}>{`${cw} × ${ch}`}</span>
              <span className={cx("xb-dims__u")}>mm</span>
            </div>
            <p className={cx("xb-dims__note")}>
              {note} Or set <code>paperWidth</code> and <code>paperHeight</code>{" "}
              yourself, in pt, px, in, mm, cm or pc.
            </p>
          </div>

          <div className={cx("cb-col cb-col--rail")}>
            <div className={cx("xb-canvas-bar")}>
              <span>
                <b className={cx("xb-canvas-bar__t")}>Canvas</b> · every
                paperSize, to scale
              </span>
              <span>{`${paper} ${landscape ? "landscape" : "portrait"}`}</span>
            </div>
            <div className={cx("xb-canvas")}>
              {SIZES.map(([name, w, h]) => {
                const [x, y] = orient(w, h);
                return (
                  <span
                    key={name}
                    className={cx("ca-outline")}
                    style={{
                      width: Math.round(x * SCALE),
                      height: Math.round(y * SCALE),
                    }}
                  />
                );
              })}
              <div
                className={cx("ca-sheet")}
                style={{
                  width: Math.round(cw * SCALE),
                  height: Math.round(ch * SCALE),
                }}
              >
                <Ink />
                <div className={cx("ca-stamp")}>
                  {paper}
                  <br />
                  {dims}
                </div>
                <span className={cx("xb-sel")} aria-hidden="true" />
                {["tl", "tr", "bl", "br"].map((corner) => (
                  <span
                    key={corner}
                    className={cx("xb-handle", corner)}
                    aria-hidden="true"
                  />
                ))}
                <span className={cx("xb-badge-size")}>{dims}</span>
              </div>
            </div>
          </div>

          <div className={cx("cb-col cb-col--out")}>
            <CodeBar
              title={`${engine.engine} · ${engine.route}`}
              copy={request.text}
            />
            <CodeLines lines={request.lines} />
          </div>
        </div>
      </div>
    </section>
  );
}
