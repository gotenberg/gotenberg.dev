import React, { useState } from "react";
import cx from "./cx";
import { LEVELS } from "./data";
import { curl, response } from "./requests";
import {
  CodePanel,
  Radio,
  RadioGroup,
  Section,
  SectionHead,
  Segmented,
} from "./ui";

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
        out the XML: the same stage repairs the existing Factur-X. Validation
        adds Schematron warnings that do not fail conformance on their own.
      </SectionHead>
      <div className={cx("xb-fx")}>
        <article className={cx("cb-tile")}>
          <h3>What the level decides</h3>
          <RadioGroup
            label="level"
            value={level}
            onChange={setLevel}
            disabled={repair}
            className="xb-levels"
          >
            <div className={cx("xb-lv xb-lv--head")} aria-hidden="true">
              <span />
              <span className={cx("xb-field")}>level</span>
              <span>Embedded file</span>
              <span className={cx("xb-field")}>AFRelationship</span>
            </div>
            {LEVELS.map(([name, xml, rel]) => (
              <Radio
                key={name}
                value={name}
                label={`${name}, embedded as ${xml}, AFRelationship ${rel}`}
                className="xb-lv"
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
              </Radio>
            ))}
          </RadioGroup>
          {repair && (
            <p className={cx("xb-note")}>
              Without the XML, there is no level to pick: the stage repairs the
              invoice the PDF already carries.
            </p>
          )}
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
