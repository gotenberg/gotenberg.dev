import React from "react";
import Link from "@docusaurus/Link";
import data from "@site/src/data/routes.json";
import { inline } from "./Options";

// The routes of src/data/routes.json for one group, each linked to its entry.
export default function RouteTable({ group }) {
  const routes = data.routes.filter((route) => route.group === group);
  if (!routes.length) throw new Error(`no routes "${group}" in routes.json`);
  return (
    <table>
      <thead>
        <tr>
          <th>Method</th>
          <th>Route</th>
          <th>What it does</th>
        </tr>
      </thead>
      <tbody>
        {routes.map((route) => (
          <tr key={route.path}>
            <td>
              <code>{route.method}</code>
            </td>
            <td>
              <Link to={route.to}>
                <code>{route.path}</code>
              </Link>
            </td>
            <td>{inline(route.summary)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
