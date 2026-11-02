import React from "react";
import data from "@site/src/data/stages.json";
import Request from "./Request";

// The example of a stage in src/data/stages.json, as a list of stages on
// /forms/pdf/pipe, which npm run check:examples runs.
export default function StageExample({ op }) {
  const stage = data.stages.find((s) => s.op === op);
  if (!stage) throw new Error(`no stage "${op}" in src/data/stages.json`);
  const { files, stages, output, response } = stage.example;
  return (
    <Request
      route="/forms/pdf/pipe"
      files={files}
      stages={stages}
      output={output ?? files.find((file) => file.endsWith(".pdf"))}
      response={response}
    />
  );
}
