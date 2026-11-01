import React from "react";
import cx from "./cx";
import { ARCHITECTURES, IMAGES } from "./data";
import { Section, SectionHead } from "./ui";

export default function Architectures() {
  return (
    <Section id="architectures">
      <SectionHead
        n="05"
        kicker="Architectures"
        title="Runs where"
        accent="you run."
        lede="Nine images on five architectures."
      >
        No Java, no Python, no QPDF, pdfcpu, pdftk or ExifTool inside: litho, a
        pure-Go PDF processor, does that work now.
      </SectionHead>
      <div className={cx("cb-bento")}>
        <article
          className={cx("cb-tile cb-tile--6")}
          style={{ overflowX: "auto" }}
        >
          <table className={cx("g9-matrix")}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>gotenberg/gotenberg</th>
                {ARCHITECTURES.map((arch) => (
                  <th key={arch}>{arch}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {IMAGES.map(([tag, count]) => (
                <tr key={tag}>
                  <th>{tag}</th>
                  {ARCHITECTURES.map((arch, i) => (
                    <td key={arch}>
                      <span
                        className={cx(i < count ? "g9-yes" : "g9-no")}
                        role="img"
                        aria-label={i < count ? "Available" : "Not available"}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>
    </Section>
  );
}
