import React from "react";
import Link from "@docusaurus/Link";
import routes from "@site/src/data/routes.json";
import stages from "@site/src/data/stages.json";
import Options, { inline, NoOptions } from "./Options";
import { MethodBadge, wrappablePath } from "./ApiEndpoint";
import card from "./ApiEndpoint.module.css";
import { formInput, routeEndpoint, stageEndpoint } from "./endpoints.mjs";
import styles from "./Endpoint.module.css";

// The labels of the field groups and LibreOffice sections in routes.json,
// and of a stage's options.
const LABELS = {
  options: "Options",
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

// The card a route page opens with, under the page's own intro: method,
// path, what the route takes and what it answers, from src/data/routes.json, or from src/data/stages.json
// for a stage's own route. Each field is an anchor, such as
// /docs/chromium/convert-html#waitDelay.
export default function Endpoint({ path, op }) {
  const r = op ? stageEndpoint(stages, op) : routeEndpoint(routes, path);
  const multipart = r.method === "POST";
  const input = formInput(routes, r);

  return (
    <div className={card.apiContainer}>
      <div className={card.apiHeader}>
        {r.method.split(", ").map((method) => (
          <MethodBadge key={method} method={method} />
        ))}
        <span className={card.apiPath}>{wrappablePath(r.path)}</span>
      </div>
      {multipart && (
        <div className={card.sectionInput}>
          <Section label="Form data">
            <Options options={input} anchored className={styles.fields} />
          </Section>
          {r.sections.map(({ key, fields }) => (
            <Section key={key} label={LABELS[key]}>
              {fields.length > 0 ? (
                <Options options={fields} anchored className={styles.fields} />
              ) : (
                <NoOptions />
              )}
            </Section>
          ))}
        </div>
      )}
      <div className={card.sectionTechnical}>
        <Section label="Response">
          <p className={styles.response}>{inline(r.response)}</p>
          {multipart && (
            <p className={styles.response}>
              {r.read ? (
                <>
                  The route answers directly: it ignores{" "}
                  <code>Gotenberg-Output-Filename</code>, and answers 400 to the{" "}
                  <Link to="/docs/reference/headers">webhook headers</Link>.
                </>
              ) : (
                <>
                  The route also takes the{" "}
                  <Link to="/docs/reference/headers">headers</Link>.
                </>
              )}{" "}
              An error answers a status and a message: see{" "}
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
