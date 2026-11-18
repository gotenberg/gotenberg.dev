import React from "react";
import data from "@site/src/data/routes.json";
import { inline } from "./Options";

// The request or response headers of src/data/routes.json.
export default function HeaderTable({ kind }) {
  const headers = data.headers[kind];
  if (!headers) throw new Error(`no headers "${kind}" in routes.json`);
  return (
    <table>
      <thead>
        <tr>
          <th>Header</th>
          <th>{kind === "request" ? "Effect" : "Content"}</th>
        </tr>
      </thead>
      <tbody>
        {headers.map((header) => {
          const names = header.names ?? [header.name];
          return (
            <tr key={names.join()}>
              <td>
                {names.map((name, i) => (
                  <React.Fragment key={name}>
                    {i > 0 && ", "}
                    <code>{name}</code>
                  </React.Fragment>
                ))}
              </td>
              <td>{inline(header.description)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
