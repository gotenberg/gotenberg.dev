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
        more={{
          to: "/docs/getting-started/installation",
          label: "Install Gotenberg",
        }}
      >
        The full image carries Chromium and LibreOffice; the -chromium and
        -libreoffice images carry one of them. AWS Lambda and Cloud Run get
        their own images.
      </SectionHead>
      <div className={cx("cb-bento")}>
        <article className={cx("cb-tile cb-tile--6")}>
          <div className={cx("g9-scroll")} data-scroller="">
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
          </div>
          <ul className={cx("g9-tags")}>
            {IMAGES.map(([tag, count]) => (
              <li key={tag}>
                <code>gotenberg/gotenberg{tag}</code>
                <span className={cx("g9-archs")}>
                  {ARCHITECTURES.slice(0, count).map((arch) => (
                    <span key={arch}>{arch}</span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  );
}
