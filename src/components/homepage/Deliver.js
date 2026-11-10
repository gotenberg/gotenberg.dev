import React, { useState } from "react";
import cx from "./cx";
import { curl, response } from "@site/src/lib/requests";
import { CodePanel, Section, SectionHead, Segmented, Switch } from "./ui";

const ICONS = {
  app: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </>
  ),
  bucket: (
    <>
      <path d="M4 6c0 1.7 3.6 3 8 3s8-1.3 8-3-3.6-3-8-3-8 1.3-8 3z" />
      <path d="M4 6l1.7 12.6c.2 1.3 3 2.4 6.3 2.4s6.1-1.1 6.3-2.4L20 6" />
    </>
  ),
  server: (
    <>
      <rect x="4" y="4" width="16" height="7" rx="1.8" />
      <rect x="4" y="13" width="16" height="7" rx="1.8" />
      <path d="M8 7.5h.01M8 16.5h.01" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </>
  ),
  pulse: <path d="M3 12h4l3-7 4 14 3-7h4" />,
};

function Node({ icon, title, lines, className, column, row }) {
  return (
    <div
      className={cx("cd-node", className)}
      style={column && { gridColumn: column, gridRow: row }}
    >
      <i className={cx("xb-ni")} aria-hidden="true">
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {ICONS[icon]}
        </svg>
      </i>
      <b>{title}</b>
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </div>
  );
}

function Wire({ n, title, sub, back, dim, column, row }) {
  return (
    <div
      className={cx("cd-wire", back && "cd-wire--back", dim && "xb-dim")}
      style={{ gridColumn: column, gridRow: row }}
    >
      <small>
        <em className={cx("xb-step")}>{n}</em>
        <b>{title}</b>
        <span>{sub}</span>
      </small>
      <i
        className={cx("cd-packet")}
        style={{ animationDelay: `${(n - 1) * 0.9}s` }}
      />
    </div>
  );
}

// The steps as a list, for panels too narrow for the diagram.
function Steps({ steps }) {
  return (
    <ol className={cx("cd-steps")}>
      {steps.map(({ n, title, sub, from, to, dim }) => (
        <li key={n} className={cx("cd-step", dim && "xb-dim")}>
          <em className={cx("xb-step")}>{n}</em>
          <b>
            {from} → {to}
          </b>
          <span>
            {title} · {sub}
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function Deliver() {
  const [method, setMethod] = useState("PUT");
  const [upload, setUpload] = useState(false);
  const [extra, setExtra] = useState(false);
  const s3 = method === "PUT";

  const args = [];
  if (upload) args.push(["form", "files", "in.docx", "file"]);
  else {
    args.push([
      "form",
      "downloadFrom",
      [{ url: "https://bucket.s3.amazonaws.com/in.docx?X-Amz-Signature=…" }],
      "list",
    ]);
  }
  args.push(
    [
      "header",
      "Gotenberg-Webhook-Url",
      s3
        ? "https://bucket.s3.amazonaws.com/out.pdf?X-Amz-Signature=…"
        : "https://api.example.com/documents",
    ],
    ["header", "Gotenberg-Webhook-Method", method],
    [
      "header",
      "Gotenberg-Webhook-Events-Url",
      "https://api.example.com/events",
    ],
  );
  if (extra) {
    args.push([
      "header",
      "Gotenberg-Webhook-Extra-Http-Headers",
      JSON.stringify({ Authorization: "Bearer …" }),
    ]);
  }
  const request = curl("/forms/libreoffice/convert", args, null);
  const res = response([
    "HTTP/1.1 204 No Content",
    upload
      ? "# The work goes on in the background."
      : "# Once downloadFrom is fetched; the work goes on in the background.",
    "# Then, on https://api.example.com/events:",
    '{"event": "webhook.success", "correlationId": "…", "timestamp": "…"}',
  ]);
  const out = s3 ? "S3 · out.pdf" : "Your API";
  // The order of one request: wires in the diagram, rows in the list.
  const steps = [
    {
      n: 1,
      title: "POST /forms/…",
      sub: "Gotenberg-Webhook-*",
      from: "Your app",
      to: "Gotenberg",
      column: 2,
      row: 1,
    },
    {
      n: 2,
      title: "GET",
      sub: "downloadFrom",
      from: "S3 · in.docx",
      to: "Gotenberg",
      dim: upload,
      column: 2,
      row: 3,
    },
    {
      n: 3,
      title: "204 No Content",
      sub: upload ? "once received" : "once downloaded",
      from: "Gotenberg",
      to: "Your app",
      back: true,
      column: 2,
      row: 2,
    },
    {
      n: 4,
      title: method,
      sub: "Gotenberg-Webhook-Url",
      from: "Gotenberg",
      to: out,
      column: 4,
      row: 1,
    },
    {
      n: 5,
      title: "event",
      sub: "Gotenberg-Webhook-Events-Url",
      from: "Gotenberg",
      to: "Events URL",
      column: 4,
      row: 2,
    },
    {
      n: 6,
      title: "OTLP",
      sub: "OpenTelemetry",
      from: "Gotenberg",
      to: "Your collector",
      column: 4,
      row: 3,
    },
  ];
  const aria =
    "Your app posts to Gotenberg. Gotenberg " +
    (upload ? "receives the file" : "downloads the input from S3") +
    ", answers 204, sends the PDF with " +
    method +
    " to " +
    (s3 ? "S3" : "your API") +
    ", sends an event to your events URL and exports OpenTelemetry traces.";

  return (
    <Section id="deliver">
      <SectionHead
        n="03"
        kicker="Deliver"
        title="Asynchronous,"
        accent="straight to S3."
        lede="One request in. The PDF lands in your bucket, an event tells you. Your server never touches the bytes."
        more={{ to: "/docs/cookbook/s3-upload", label: "Upload results to S3" }}
      >
        Gotenberg fetches the source from a presigned GET URL and answers 204.
        It then uploads the PDF to a presigned PUT URL and sends an event to
        your events URL.
      </SectionHead>
      <div className={cx("xb-stack")}>
        <div className={cx("xb-bar")}>
          <div className={cx("xb-bar__g")}>
            <span className={cx("xb-label")}>
              <span className={cx("xb-field")}>Gotenberg-Webhook-Method</span>
            </span>
            <Segmented
              label="Gotenberg-Webhook-Method"
              options={["PUT", "POST", "PATCH"].map((m) => [m, m])}
              value={method}
              onChange={setMethod}
            />
          </div>
          <div className={cx("xb-bar__g")}>
            <span className={cx("xb-label")}>Input</span>
            <Segmented
              label="Input"
              options={[
                [false, "downloadFrom"],
                [true, "files=@in.docx"],
              ]}
              value={upload}
              onChange={setUpload}
            />
          </div>
          <div className={cx("xb-bar__g")}>
            <span className={cx("xb-label")}>Optional</span>
            <Switch
              className="xb-switchrow"
              on={extra}
              onToggle={() => setExtra(!extra)}
            >
              Gotenberg-Webhook-Extra-Http-Headers
            </Switch>
          </div>
        </div>

        <div className={cx("xb-flow")}>
          <div className={cx("cd-diagram")} role="img" aria-label={aria}>
            <Node
              icon="app"
              title="Your app"
              lines={["one request,", "no bytes"]}
              column={1}
              row="1 / span 2"
            />
            {steps.map((step) => (
              <Wire key={step.n} {...step} />
            ))}
            <Node
              icon="bucket"
              title="S3 · in.docx"
              lines={["presigned GET"]}
              className={upload && "xb-dim"}
              column={1}
              row={3}
            />
            <div className={cx("cd-node cd-node--core")}>
              <div className={cx("cd-core__title")}>
                <span>Gotenberg 9</span>
                <span className={cx("xb-port")}>:3000</span>
              </div>
              <div className={cx("cd-mod")}>
                <b>CHROMIUM</b>URL · HTML · Markdown
                <br />
                PDF and screenshots
              </div>
              <div className={cx("cd-mod cd-mod--lo")}>
                <b>LIBREOFFICE</b>100+ formats
                <br />
                via LibreOfficeKit
              </div>
              <div className={cx("cd-mod cd-mod--li")}>
                <b>LITHO</b>28 stages · validate
                <br />
                remediate · pure Go
              </div>
            </div>
            <Node
              icon={s3 ? "bucket" : "server"}
              title={out}
              lines={[s3 ? "presigned PUT" : method + " /documents"]}
              column={5}
              row={1}
            />
            <Node
              icon="bell"
              title="Events URL"
              lines={["webhook.success", "webhook.error"]}
              column={5}
              row={2}
            />
            <Node
              icon="pulse"
              title="Your collector"
              lines={["a span per document", "and per stage"]}
              column={5}
              row={3}
            />
          </div>
          <Steps steps={steps} />
          <div className={cx("cd-legend")}>
            <span>
              <b>1–6</b> the order of one request
            </span>
            <span>The method and target follow your pick above</span>
            <span>Events carry the request's correlation ID</span>
          </div>
        </div>

        <CodePanel
          title="LibreOffice · /forms/libreoffice/convert"
          request={request}
          res={res}
        />
      </div>
    </Section>
  );
}
