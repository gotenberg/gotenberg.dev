import React from "react";
import data from "@site/src/data/stages.json";
import Options, { inline, NoOptions } from "./Options";
import Request from "./Request";

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
        <Options options={stage.options} />
      ) : (
        <NoOptions />
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
