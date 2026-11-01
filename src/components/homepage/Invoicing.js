import React, { useState } from "react";
import cx from "./cx";
import { LEVELS } from "./data";
import { curl, response } from "./requests";
import { CodePanel, Section, SectionHead, Segmented } from "./ui";

export default function Invoicing() {
  const [level, setLevel] = useState("EN 16931");
  const [repair, setRepair] = useState(false);
  const [, file, relationship] = LEVELS.find(([name]) => name === level);

  let request;
  let rows;
  if (repair) {
    request = curl(
      "/forms/pdf/remediate",
      [
        ["form", "files", "invoice.pdf", "file"],
        ["form", "profile", "Factur-X"],
      ],
      "repaired.pdf",
    );
    rows = [
      "HTTP/1.1 200 OK",
      "Content-Type: application/pdf",
      "# The embedded invoice XML is kept; the PDF around it is repaired.",
    ];
  } else {
    request = curl(
      "/forms/libreoffice/convert",
      [
        ["form", "files", "invoice.docx", "file"],
        ["form", "files", "invoice.xml", "file"],
        [
          "form",
          "stages",
          [{ op: "remediate", profile: "Factur-X", xml: "invoice.xml", level }],
          "list",
        ],
      ],
      "invoice.pdf",
    );
    rows = [
      "HTTP/1.1 200 OK",
      "Content-Type: application/pdf",
      `# PDF/A-3, with invoice.xml embedded as ${file}, AFRelationship ${relationship}.`,
    ];
  }

  return (
    <Section id="invoice">
      <SectionHead
        n="02"
        kicker="E-invoicing"
        title="Factur-X, ZUGFeRD."
        accent="XRechnung too."
        lede="Send the invoice with its Cross-Industry Invoice XML: one remediate stage returns a PDF/A-3 hybrid invoice."
      >
        Embedded per Factur-X 1.07.2 and ZUGFeRD 2.3.2. Already hybrid? Leave
        out the XML: the same stage repairs the existing Factur-X.
      </SectionHead>
      <div className={cx("xb-fx")}>
        <article className={cx("cb-tile")}>
          <h3>What the level decides</h3>
          <div className={cx("xb-levels")} role="group" aria-label="level">
            <div className={cx("xb-lv xb-lv--head")} aria-hidden="true">
              <span />
              <span>level</span>
              <span>Embedded file</span>
              <span>AFRelationship</span>
            </div>
            {LEVELS.map(([name, xml, rel]) => {
              const on = !repair && name === level;
              return (
                <button
                  key={name}
                  type="button"
                  className={cx("xb-lv", on && "is-on")}
                  aria-pressed={on}
                  onClick={() => {
                    setLevel(name);
                    setRepair(false);
                  }}
                >
                  <span className={cx("xb-lv__dot")} aria-hidden="true" />
                  <span className={cx("xb-lv__name")}>{name}</span>
                  <span className={cx("xb-lv__file")}>{xml}</span>
                  <span
                    className={cx(
                      "xb-rel",
                      rel === "Data" ? "xb-rel--data" : "xb-rel--alt",
                    )}
                  >
                    {rel}
                  </span>
                </button>
              );
            })}
          </div>
        </article>
        <div className={cx("xb-stack")}>
          <Segmented
            label="Invoice source"
            options={[
              [false, "Word file + XML"],
              [true, "Repair a hybrid PDF"],
            ]}
            value={repair}
            onChange={setRepair}
          />
          <CodePanel
            title={
              repair
                ? "litho · /forms/pdf/remediate"
                : "LibreOffice · /forms/libreoffice/convert"
            }
            request={request}
            res={response(rows)}
          />
        </div>
      </div>
    </Section>
  );
}
