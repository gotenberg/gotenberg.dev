import React from "react";
import data from "@site/src/data/stages.json";
import Request from "./Request";
import styles from "./Stage.module.css";

// Turns `backtick` spans of the data's text into code.
function inline(text) {
  return text
    .split("`")
    .map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part));
}

// One stage of src/data/stages.json: what it does, its options, and an
// example on /forms/pdf/pipe that npm run check:examples runs.
export default function Stage({ op }) {
  const stage = data.stages.find((s) => s.op === op);
  if (!stage) throw new Error(`no stage "${op}" in src/data/stages.json`);
  const { files, stages, output, response } = stage.example;
  const firstPdf = files.find((file) => file.endsWith(".pdf"));

  return (
    <>
      <p>{inline(stage.summary)}</p>
      {stage.options.length > 0 ? (
        <div className={styles.options}>
          {stage.options.map((option) => (
            <div key={option.name} className={styles.option}>
              <div className={styles.head}>
                <code className={styles.name}>{option.name}</code>
                <span className={styles.type}>
                  {option.type === "pages" ? (
                    <a href="#page-selections">pages</a>
                  ) : (
                    option.type
                  )}
                </span>
                {option.required && (
                  <span className={styles.required}>required</span>
                )}
              </div>
              <p className={styles.description}>{inline(option.description)}</p>
              {option.default !== undefined && (
                <p className={styles.default}>
                  Default: <code>{option.default}</code>
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.none}>No options.</p>
      )}
      <Request
        route="/forms/pdf/pipe"
        files={files}
        stages={stages}
        output={output ?? firstPdf}
        response={response}
      />
    </>
  );
}
