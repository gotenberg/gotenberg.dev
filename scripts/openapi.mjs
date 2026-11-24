// Builds the OpenAPI description of Gotenberg from the docs' reference data:
// src/data/routes.json and src/data/stages.json for the routes, their fields,
// headers and statuses, sidebars.js for the tags, and each route page's title
// for its summary. It reads the routes as the Endpoint card does
// (src/components/documentation/endpoints.mjs), so both say the same.
//
// npm run sync:openapi writes it to static/openapi.yaml; npm run check:api
// checks that file.

import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import * as yaml from "js-yaml";
import * as prettier from "prettier";
import {
  DEFAULT_PRODUCES,
  formInput,
  routeEndpoint,
  stageEndpoint,
} from "../src/components/documentation/endpoints.mjs";

const root = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "..",
);
const site = "https://gotenberg.dev";
const json = (p) => JSON.parse(readFileSync(path.join(root, p), "utf8"));

// The servers the Bruno collection names as its environments.
const SERVERS = [
  { url: "http://localhost:3000", description: "Local" },
  { url: "https://demo.gotenberg.dev", description: "Demo" },
];

// The schema each type of the reference data takes as a multipart form field.
// A field that holds JSON, a list or an object, is a string of JSON.
const SCHEMAS = {
  boolean: { type: "boolean" },
  integer: { type: "integer" },
  number: { type: "number" },
  string: { type: "string" },
  duration: { type: "string" },
  length: { type: "string" },
  pages: { type: "string" },
  "enum or list": { type: "string" },
  "string or list": { type: "string" },
  file: { type: "string" },
  json: { type: "string", contentMediaType: "application/json" },
  list: { type: "string", contentMediaType: "application/json" },
  object: { type: "string", contentMediaType: "application/json" },
  "file[]": {
    type: "array",
    items: { type: "string", contentMediaType: "application/octet-stream" },
  },
};

// The response headers OpenAPI states otherwise: the content type by the
// content of each answer, the trace by the propagators.
const ANSWERED_HEADERS = new Set(["Content-Type", "Traceparent"]);

// The request headers a read route answers 400 to or ignores.
const DELIVERY_HEADERS = /^Gotenberg-(Webhook-|Output-Filename)/;

// The OpenAPI description, as YAML formatted by Prettier with the settings
// that apply to file, where it goes.
export async function openapi(file) {
  const options = (await prettier.resolveConfig(file)) ?? {};
  return prettier.format(describe(), { ...options, parser: "yaml" });
}

// The OpenAPI description, as YAML.
function describe() {
  const routes = json("src/data/routes.json");
  const stages = json("src/data/stages.json");
  const tags = sidebarTags();

  const endpoints = [
    ...routes.routes
      .filter((r) => r.path !== "/forms/pdf/{op}")
      .map((r) => routeEndpoint(routes, r.path)),
    ...stages.stages.map((s) => stageEndpoint(stages, s.op)),
  ];

  const paths = {};
  const used = new Set();
  for (const endpoint of endpoints) {
    const page = endpoint.to.replace(/^\/docs\//, "").replace(/#.*$/, "");
    const tag = tags.get(page);
    if (!tag) throw new Error(`${endpoint.path}: no sidebar entry "${page}"`);
    used.add(tag);
    for (const method of endpoint.method.split(", ")) {
      paths[endpoint.path] ??= {};
      paths[endpoint.path][method.toLowerCase()] = operation(
        routes,
        endpoint,
        method,
        tag,
        title(page),
      );
    }
  }

  const authorization = routes.headers.request.find(
    (h) => h.name === "Authorization",
  );
  const spec = {
    openapi: "3.1.0",
    info: {
      title: "Gotenberg",
      version: "9",
      summary: "A Docker-based API for PDF conversion",
      description: absolute(
        "Every operation links to its page of the [documentation](/docs). The errors answer a status and a plain-text message: see [Errors](/docs/reference/errors).",
      ),
      license: { name: "MIT", identifier: "MIT" },
    },
    externalDocs: { url: `${site}/docs` },
    servers: SERVERS,
    security: [{}, { basicAuth: [] }, { bearerAuth: [] }],
    tags: [...new Set(tags.values())]
      .filter((name) => used.has(name))
      .map((name) => ({ name })),
    paths: Object.fromEntries(
      Object.entries(paths).sort(([a], [b]) => a.localeCompare(b)),
    ),
    components: {
      parameters: Object.fromEntries(
        requestHeaderNames(routes).map((name) => [
          name,
          {
            name,
            in: "header",
            required: false,
            schema: { type: "string" },
            description: absolute(
              headerDescription(routes.headers.request, name),
            ),
          },
        ]),
      ),
      headers: Object.fromEntries(
        routes.headers.response
          .filter((h) => !ANSWERED_HEADERS.has(h.name))
          .map((h) => [
            h.name,
            {
              description: absolute(h.description),
              schema: { type: "string" },
            },
          ]),
      ),
      responses: {
        Webhook: {
          description: absolute(
            headerDescription(routes.headers.request, "Gotenberg-Webhook-Url"),
          ),
        },
        ...Object.fromEntries(
          routes.statuses
            .filter((status) => !status.generic)
            .map((status) => [
              `Status${status.status}`,
              {
                description: absolute(status.description),
                content: { "text/plain": { schema: { type: "string" } } },
              },
            ]),
        ),
      },
      securitySchemes: {
        basicAuth: {
          type: "http",
          scheme: "basic",
          description: absolute(authorization.description),
        },
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          description: absolute(authorization.description),
        },
      },
    },
  };

  return (
    "# Generated by `npm run sync:openapi` in gotenberg.dev from its reference\n" +
    "# data. Don't edit it by hand: change the data, then run the script.\n" +
    yaml.dump(spec, { lineWidth: -1, noRefs: true })
  );
}

// The operation method of endpoint takes.
function operation(routes, endpoint, method, tag, summary) {
  const multipart = method === "POST";
  const delivers = multipart && !endpoint.read;
  const parameters = requestHeaderNames(routes)
    .filter((name) => delivers || !DELIVERY_HEADERS.test(name))
    .map((name) => ({ $ref: `#/components/parameters/${name}` }));

  const op = {
    operationId: operationId(endpoint.path, method),
    summary,
    description: absolute(endpoint.summary),
    tags: [tag],
    externalDocs: { url: `${site}${endpoint.to}` },
  };
  if (parameters.length) op.parameters = parameters;
  if (multipart) op.requestBody = requestBody(routes, endpoint);
  op.responses = responses(routes, endpoint, method, delivers);
  return op;
}

// The request headers an operation takes as parameters: Authorization is the
// security schemes'.
function requestHeaderNames(routes) {
  return routes.headers.request
    .flatMap((h) => h.names ?? [h.name])
    .filter((name) => name !== "Authorization");
}

function headerDescription(headers, name) {
  return headers.find((h) => (h.names ?? [h.name]).includes(name)).description;
}

// The multipart form a POST endpoint takes: its fields, those of its
// sections, and the ones every route takes. A field of type file named like a
// file, such as header.html, is a file uploaded under files, not a field.
function requestBody(routes, endpoint) {
  const fields = [
    ...formInput(routes, endpoint),
    ...endpoint.sections.flatMap((s) => s.fields),
  ];
  const properties = {};
  const required = [];
  const namedFiles = fields.filter(
    (f) => f.type === "file" && f.name.includes("."),
  );
  for (const field of fields) {
    if (namedFiles.includes(field)) continue;
    const base = SCHEMAS[field.type];
    if (!base) throw new Error(`${field.name}: no schema for "${field.type}"`);
    let description = field.description;
    if (field.name === "files" && namedFiles.length) {
      description += `\n\nUpload under \`files\` too:\n\n${namedFiles
        .map((f) => `- \`${f.name}\`: ${f.description}`)
        .join("\n")}`;
    }
    if (field.default !== undefined) {
      description += `\n\nDefault: \`${field.default}\`.`;
    }
    const schema = { ...base, description: absolute(description) };
    const literal = literalDefault(field);
    if (literal !== undefined) schema.default = literal;
    properties[field.name] = schema;
    if (field.required) required.push(field.name);
  }
  const schema = { type: "object", properties };
  if (required.length) schema.required = required;
  return {
    required: true,
    content: { "multipart/form-data": { schema } },
  };
}

// The default of a boolean or number field as a value, undefined for others:
// their defaults read as prose, such as "all" or "From the name".
function literalDefault(field) {
  if (field.default === undefined) return undefined;
  if (field.type === "boolean") return field.default === "true";
  if (field.type === "integer" || field.type === "number") {
    const n = Number(field.default);
    return Number.isNaN(n) ? undefined : n;
  }
  return undefined;
}

// The answers of endpoint: what it returns, the webhook's acknowledgement,
// and the error statuses that apply to it.
function responses(routes, endpoint, method, delivers) {
  const produces = endpoint.produces ?? DEFAULT_PRODUCES;
  const headers = {};
  for (const { name } of routes.headers.response) {
    if (ANSWERED_HEADERS.has(name)) continue;
    if (name === "Content-Disposition" && !delivers) continue;
    if (name.startsWith("Gotenberg-Remediation-") && !remediates(endpoint))
      continue;
    headers[name] = { $ref: `#/components/headers/${name}` };
  }
  const answers = {
    200: {
      description: absolute(endpoint.response),
      headers,
      content: Object.fromEntries(
        produces.map((type) => [type, { schema: contentSchema(type) }]),
      ),
    },
  };
  if (delivers) answers[204] = { $ref: "#/components/responses/Webhook" };
  for (const status of routes.statuses) {
    if (status.generic) continue;
    const applies = status.auth
      ? endpoint.path !== "/health"
      : method === "POST" &&
        (!status.groups || status.groups.includes(endpoint.group ?? "pdf"));
    if (applies) {
      answers[status.status] = {
        $ref: `#/components/responses/Status${status.status}`,
      };
    }
  }
  return answers;
}

// Whether endpoint may run a remediate stage, which sets the remediation
// headers.
function remediates(endpoint) {
  return (
    endpoint.path === "/forms/pdf/remediate" ||
    endpoint.input.some((f) => f.name === "stages")
  );
}

function contentSchema(type) {
  if (type === "application/json") return { type: "object" };
  if (type.startsWith("text/")) return { type: "string" };
  return { type: "string", contentMediaType: type };
}

// An operation id from the path: /forms/chromium/convert/url gives
// chromiumConvertUrl, / gives root, and a HEAD route takes a Head suffix.
function operationId(routePath, method) {
  const words = routePath
    .replace(/^\/forms\//, "")
    .split(/[/-]/)
    .filter(Boolean);
  const id = words.length
    ? words.map((w, i) => (i ? w[0].toUpperCase() + w.slice(1) : w)).join("")
    : "root";
  return method === "HEAD" ? `${id}Head` : id;
}

// The tag of each route page: the sidebar category it sits in, with the
// subgroup of the PDF pages, such as "PDF: Pages".
function sidebarTags() {
  const require = createRequire(import.meta.url);
  const sidebars = require(path.join(root, "sidebars.js"));
  const tags = new Map();
  const walk = (items, label) => {
    for (const item of items) {
      if (typeof item === "string") tags.set(item, label);
      else if (item.type === "doc") tags.set(item.id, label);
      else if (item.type === "category") {
        walk(item.items, label ? `${label}: ${item.label}` : item.label);
      }
    }
  };
  for (const category of sidebars.docs.filter((c) => c.type === "category")) {
    walk(category.items, category.label);
  }
  return tags;
}

// The title of a docs page, from its front matter.
function title(page) {
  const text = readFileSync(path.join(root, "docs", `${page}.mdx`), "utf8");
  const match = text.match(/^title:\s*(.+)$/m);
  if (!match) throw new Error(`docs/${page}.mdx: no title`);
  return match[1].trim().replace(/^"(.*)"$/, "$1");
}

// Makes the docs' relative links absolute, for a reader outside the site.
function absolute(text) {
  return text.replace(/\]\(\/docs/g, `](${site}/docs`);
}
