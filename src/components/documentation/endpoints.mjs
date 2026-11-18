// What each route takes and answers, assembled from src/data/routes.json and
// src/data/stages.json. The Endpoint card and the OpenAPI spec
// (npm run sync:openapi) both read it, so they describe a route alike.

// The answer of a route or stage whose data names none: a PDF, or a ZIP.
export const DEFAULT_PRODUCES = ["application/pdf", "application/zip"];

// A stage's own route: /forms/pdf/<op>, its options as form fields.
export function stageEndpoint(stages, op) {
  const stage = stages.stages.find((s) => s.op === op);
  if (!stage) throw new Error(`no stage "${op}" in src/data/stages.json`);
  const files = stage.options.some((o) => o.type === "file")
    ? "The PDFs, and the files the options name."
    : "The PDFs.";
  return {
    method: "POST",
    path: `/forms/pdf/${op}`,
    summary: stage.summary,
    to: `/docs/pdf/${op}`,
    input: [
      { name: "files", type: "file[]", required: true, description: files },
    ],
    sections: [{ key: "options", fields: stage.options }],
    response:
      stage.response ?? "The PDF, or a ZIP of the PDFs when you send several.",
    produces: stage.produces ?? DEFAULT_PRODUCES,
  };
}

// A route of routes.json, its field groups split into sections, each keyed
// by its section, or by its group when it has none.
export function routeEndpoint(routes, path) {
  const r = routes.routes.find((x) => x.path === path);
  if (!r) throw new Error(`no route "${path}" in src/data/routes.json`);
  const sections = (r.groups ?? []).flatMap((group) => {
    const fields = routes.fields[group];
    if (!fields) throw new Error(`no fields "${group}" in routes.json`);
    const bySection = [...new Set(fields.map((f) => f.section))];
    return bySection.map((section) => ({
      key: section ?? group,
      fields: fields.filter((f) => f.section === section),
    }));
  });
  return {
    ...r,
    input: [...(r.input ?? []), ...(r.stages ? routes.fields.stages : [])],
    sections,
  };
}

// The form fields of the card's first section: the route's own, then the
// ones every multipart route takes.
export function formInput(routes, endpoint) {
  return endpoint.method === "POST"
    ? [...endpoint.input, ...routes.fields.common]
    : endpoint.input;
}
