import React from "react";
import data from "@site/src/data/routes.json";
import { inline } from "./Options";

// The status codes of src/data/routes.json.
export default function StatusTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Status</th>
          <th>Meaning</th>
        </tr>
      </thead>
      <tbody>
        {data.statuses.map(({ status, description }) => (
          <tr key={status}>
            <td>{status}</td>
            <td>{inline(description)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
