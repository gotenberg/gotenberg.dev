import React from "react";
import Link from "@docusaurus/Link";
import routes from "@site/src/data/routes.json";
import stages from "@site/src/data/stages.json";
import Options, { inline, NoOptions } from "./Options";
import { MethodBadge, wrappablePath } from "./ApiEndpoint";
import card from "./ApiEndpoint.module.css";
import styles from "./Endpoint.module.css";

// The labels of the field groups and LibreOffice sections in routes.json.
const LABELS = {
  chromium: "Page",
  "chromium-pdf": "PDF",
  "chromium-screenshot": "Image",
  page: "Pages",
  content: "Content",
  images: "Images",
  watermark: "Watermark",
  conformance: "Conformance",
  viewer: "Viewer",
};

// A stage's own route: /forms/pdf/<op>, its options as form fields.
function stageRoute(op) {
  const stage = stages.stages.find((s) => s.op === op);
  if (!stage) throw new Error(`no stage "${op}" in src/data/stages.json`);
  const files = stage.options.some((o) => o.type === "file")
    ? "The PDFs, and the files the options name."
    : "The PDFs.";
  return {
    method: "POST",
    path: `/forms/pdf/${op}`,
    input: [
      { name: "files", type: "file[]", required: true, description: files },
    ],
    sections: [{ label: "Options", fields: stage.options }],
    response:
      stage.response ?? "The PDF, or a ZIP of the PDFs when you send several.",
  };
}

// A route of routes.json, its field groups split into sections.
function route(path) {
  const r = routes.routes.find((x) => x.path === path);
  if (!r) throw new Error(`no route "${path}" in src/data/routes.json`);
  const sections = (r.groups ?? []).flatMap((group) => {
    const fields = routes.fields[group];
    if (!fields) throw new Error(`no fields "${group}" in routes.json`);
    const bySection = [...new Set(fields.map((f) => f.section))];
    return bySection.map((section) => ({
      label: LABELS[section ?? group],
      fields: fields.filter((f) => f.section === section),
    }));
  });
  return {
    ...r,
    input: [...(r.input ?? []), ...(r.stages ? routes.fields.stages : [])],
    sections,
  };
}

// The card a route page opens with, under the page's own intro: method,
// path, what the route takes and what it answers, from src/data/routes.json, or from src/data/stages.json
// for a stage's own route. Each field is an anchor, such as
// /docs/chromium/convert-html#waitDelay.
export default function Endpoint({ path, op }) {
  const r = op ? stageRoute(op) : route(path);
  const multipart = r.method === "POST";
  const input = [...r.input, ...(multipart ? routes.fields.common : [])];

  return (
    <div className={card.apiContainer}>
      <div className={card.apiHeader}>
        {r.method.split(", ").map((method) => (
          <MethodBadge key={method} method={method} />
        ))}
        <span className={card.apiPath}>{wrappablePath(r.path)}</span>
      </div>
      <div className={card.sectionInput}>
        {input.length > 0 && (
          <Section label={multipart ? "Form data" : "Input"}>
            <Options options={input} anchored className={styles.fields} />
          </Section>
        )}
        {r.sections.map(({ label, fields }) => (
          <Section key={label} label={label}>
            {fields.length > 0 ? (
              <Options options={fields} anchored className={styles.fields} />
            ) : (
              <NoOptions />
            )}
          </Section>
        ))}
      </div>
      <div className={card.sectionTechnical}>
        <Section label="Response">
          <p className={styles.response}>{inline(r.response)}</p>
          {multipart && (
            <p className={styles.response}>
              The route also takes the{" "}
              <Link to="/docs/reference/headers">headers</Link>, and answers an
              error with a status and a message: see{" "}
              <Link to="/docs/reference/errors">Errors</Link>.
            </p>
          )}
        </Section>
      </div>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div className={styles.section}>
      <div className={card.sectionLabel}>{label}</div>
      {children}
    </div>
  );
}
