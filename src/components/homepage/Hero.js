import React, { useState } from "react";
import cx from "./cx";
import { ENGINES, SIZES } from "./data";
import { curl } from "./requests";
import { CodeBar, CodeLines, Segmented, StarIcon, StartButton } from "./ui";

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
        <li className={cx("xb-fact")}>26 stages</li>
        <li className={cx("xb-fact")}>PDF/A · PDF/UA · Factur-X</li>
      </ul>
      <div className={cx("xb-btns")}>
        <StartButton />
        <a
          className={cx("xb-btn xb-btn--ghost")}
          href="https://github.com/gotenberg/gotenberg"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          GitHub
          <span className={cx("xb-btn__count")}>
            <StarIcon size={15} />
            13k+
          </span>
        </a>
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
              The press,
              <br />
              <span>rebuilt.</span>
            </h1>
          </div>
          <div>
            <Facts />
          </div>
        </div>

        <div className={cx("cb-comp xb-press")}>
          <div className={cx("cb-col")}>
            <div className={cx("xb-label")}>Source</div>
            <div className={cx("xb-engs")} role="group" aria-label="Source">
              {ENGINES.map((e) => (
                <button
                  key={e.key}
                  type="button"
                  className={cx("xb-eng", e.key === engineKey && "is-on")}
                  aria-pressed={e.key === engineKey}
                  onClick={() => setEngineKey(e.key)}
                >
                  <span className={cx("xb-eng__k")}>{e.engine}</span>
                  <span className={cx("xb-eng__v")}>{e.label}</span>
                </button>
              ))}
            </div>
            <div className={cx("xb-label")}>paperSize</div>
            <div className={cx("xb-sizes")} role="group" aria-label="paperSize">
              {SIZES.map(([name]) => (
                <button
                  key={name}
                  type="button"
                  className={cx("xb-size", name === paper && "is-on")}
                  aria-pressed={name === paper}
                  onClick={() => setPaper(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            <div className={cx("xb-label")}>landscape</div>
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
