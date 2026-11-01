import React, { useState } from "react";
import Link from "@docusaurus/Link";
import cx from "./cx";
import { READ_ROUTES, RECIPES, STAGE_GROUP } from "./data";
import { curl, json, response } from "@site/src/lib/requests";
import { CodePanel, Radio, RadioGroup, Section, SectionHead } from "./ui";

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
      <div className={cx("xb-recipes")}>
        <RadioGroup
          label="Recipe"
          value={recipeKey}
          onChange={setRecipeKey}
          className="xb-picks"
        >
          {RECIPES.map((r) => (
            <Radio key={r.key} value={r.key} className="xb-recipe">
              <span className={cx("xb-recipe__t")}>{r.title}</span>
              <span className={cx("xb-recipe__d")}>{r.desc}</span>
              <span className={cx("xb-chain")}>
                {r.stages.map((st, i) => (
                  <span
                    key={i}
                    className={cx(
                      "xb-chip",
                      STAGE_GROUP[st.op],
                      r.key === recipeKey && "is-in",
                    )}
                  >
                    {st.op}
                  </span>
                ))}
              </span>
            </Radio>
          ))}
        </RadioGroup>
        <Link className={cx("xb-more")} to="/docs/reference/stages">
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
      <div className={cx("xb-routes")}>
        <RadioGroup
          label="Read route"
          value={routeName}
          onChange={setRouteName}
          className="xb-picks"
        >
          {READ_ROUTES.map((r) => (
            <Radio key={r.name} value={r.name} className="xb-route">
              <span className={cx("xb-route__p")}>/forms/pdf/{r.name}</span>
              <span className={cx("xb-route__d")}>{r.desc}</span>
            </Radio>
          ))}
        </RadioGroup>
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
      <RadioGroup
        label="Write or read"
        value={read}
        onChange={setRead}
        className="xb-modes"
      >
        <Radio value={false} className="xb-mode">
          <span className={cx("xb-mode__k")}>Write · returns a PDF</span>
          <span className={cx("xb-mode__n")}>26 stages</span>
          <span className={cx("xb-mode__d")}>
            Chain them in the <code>stages</code> field of{" "}
            <code>/forms/pdf/pipe</code> or of any conversion route. Each one
            also has its own route.
          </span>
        </Radio>
        <Radio value={true} className="xb-mode">
          <span className={cx("xb-mode__k")}>Read · returns JSON</span>
          <span className={cx("xb-mode__n")}>5 routes</span>
          <span className={cx("xb-mode__d")}>
            info, metadata, bookmarks, attachments and validate. One answer per
            request, keyed by file name.
          </span>
        </Radio>
      </RadioGroup>
      {read ? (
        <Read routeName={routeName} setRouteName={setRouteName} />
      ) : (
        <Write recipeKey={recipeKey} setRecipeKey={setRecipeKey} />
      )}
    </Section>
  );
}
