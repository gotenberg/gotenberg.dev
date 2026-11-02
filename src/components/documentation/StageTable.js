import React from "react";
import Link from "@docusaurus/Link";
import data from "@site/src/data/stages.json";
import { inline } from "./Options";

// Every stage of src/data/stages.json, each linked to its page.
export default function StageTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Stage</th>
          <th>What it does</th>
        </tr>
      </thead>
      <tbody>
        {data.stages.map((stage) => (
          <tr key={stage.op}>
            <td>
              <Link to={`/docs/pdf/${stage.op}`}>
                <code>{stage.op}</code>
              </Link>
            </td>
            <td>{inline(stage.summary)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
