import React, { useState } from "react";
import Link from "@docusaurus/Link";
import cx from "./cx";
import { READ_ROUTES, RECIPES, STAGE_GROUP } from "./data";
import { curl, json, response } from "./requests";
import { CodePanel, Section, SectionHead } from "./ui";

function Write({ recipeKey, setRecipeKey }) {
  const recipe = RECIPES.find((r) => r.key === recipeKey);
  const args = recipe.files.map((f) => ["form", "files", f, "file"]);
  args.push(["form", "stages", recipe.stages, "list"]);
  const rows = [
    "HTTP/1.1 200 OK",
    "Content-Type: " + (recipe.zip ? "application/zip" : "application/pdf"),
  ];
  if (recipe.stages.some((st) => st.op === "remediate")) {
    rows.push(
      "Gotenberg-Remediation-Residual: …",
      "Gotenberg-Remediation-Rolled-Back: …",
    );
  }
  if (recipe.zip) rows.push("# " + recipe.zip);

  return (
    <div className={cx("xb-write")}>
      <div className={cx("xb-recipes")} role="group" aria-label="Recipe">
        {RECIPES.map((r) => {
          const on = r.key === recipeKey;
          return (
            <button
              key={r.key}
              type="button"
              className={cx("xb-recipe", on && "is-on")}
              aria-pressed={on}
              onClick={() => setRecipeKey(r.key)}
            >
              <span className={cx("xb-recipe__t")}>{r.title}</span>
              <span className={cx("xb-recipe__d")}>{r.desc}</span>
              <span className={cx("xb-chain")}>
                {r.stages.map((st, i) => (
                  <span
                    key={i}
                    className={cx("xb-chip", STAGE_GROUP[st.op], on && "is-in")}
                  >
                    {st.op}
                  </span>
                ))}
              </span>
            </button>
          );
        })}
        <Link className={cx("xb-more")} to="/docs/getting-started/routes">
          All 26 stages, in the documentation
          <svg
            className={cx("xb-more__icon")}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
      <CodePanel
        title="litho · /forms/pdf/pipe"
        request={curl("/forms/pdf/pipe", args, recipe.out)}
        res={response(rows)}
      />
    </div>
  );
}

function Read({ routeName, setRouteName }) {
  const route = READ_ROUTES.find((r) => r.name === routeName);
  const file = route.file ?? "report.pdf";
  const args = [["form", "files", file, "file"]];
  (route.form ?? []).forEach(([name, value]) =>
    args.push(["form", name, value]),
  );
  const rows = [
    "HTTP/1.1 200 OK",
    "Content-Type: application/json",
    ...json({ [file]: route.answer }),
    "# Example values.",
  ];

  return (
    <div className={cx("xb-read")}>
      <div className={cx("xb-routes")} role="group" aria-label="Read route">
        {READ_ROUTES.map((r) => {
          const on = r.name === routeName;
          return (
            <button
              key={r.name}
              type="button"
              className={cx("xb-route", on && "is-on")}
              aria-pressed={on}
              onClick={() => setRouteName(r.name)}
            >
              <span className={cx("xb-route__p")}>/forms/pdf/{r.name}</span>
              <span className={cx("xb-route__d")}>{r.desc}</span>
            </button>
          );
        })}
        <p className={cx("xb-note")}>
          Every read route takes a <code>password</code> field to open encrypted
          PDFs.
        </p>
      </div>
      <CodePanel
        title={"litho · /forms/pdf/" + route.name}
        request={curl("/forms/pdf/" + route.name, args, null)}
        res={response(rows)}
      />
    </div>
  );
}

export default function Operate() {
  const [read, setRead] = useState(false);
  const [recipeKey, setRecipeKey] = useState("archive");
  const [routeName, setRouteName] = useState("info");

  return (
    <Section id="operate">
      <SectionHead
        n="04"
        kicker="Operate"
        title="26 stages write."
        accent="5 routes read."
        lede="Write stages change the PDF and send it back. Read routes leave it as it is and answer JSON."
      >
        Gotenberg checks the order of the stages before it runs them: decrypt
        comes first, render last, and nothing rewrites a signature.
      </SectionHead>
      <div className={cx("xb-modes")} role="group" aria-label="Write or read">
        <button
          type="button"
          className={cx("xb-mode", !read && "is-on")}
          aria-pressed={!read}
          onClick={() => setRead(false)}
        >
          <span className={cx("xb-mode__k")}>Write · returns a PDF</span>
          <span className={cx("xb-mode__n")}>26 stages</span>
          <span className={cx("xb-mode__d")}>
            Chain them in the <code>stages</code> field of{" "}
            <code>/forms/pdf/pipe</code> or of any conversion route. Each one
            also has its own route.
          </span>
        </button>
        <button
          type="button"
          className={cx("xb-mode", read && "is-on")}
          aria-pressed={read}
          onClick={() => setRead(true)}
        >
          <span className={cx("xb-mode__k")}>Read · returns JSON</span>
          <span className={cx("xb-mode__n")}>5 routes</span>
          <span className={cx("xb-mode__d")}>
            info, metadata, bookmarks, attachments and validate. One answer per
            request, keyed by file name.
          </span>
        </button>
      </div>
      {read ? (
        <Read routeName={routeName} setRouteName={setRouteName} />
      ) : (
        <Write recipeKey={recipeKey} setRecipeKey={setRecipeKey} />
      )}
    </Section>
  );
}
