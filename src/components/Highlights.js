import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";
import styles from "./Highlights.module.css";
import Link from "@docusaurus/Link";
import clsx from "clsx";

const ChromiumExample = `
curl \\
--request POST http://localhost:3000/forms/chromium/convert/url \\
--form url=https://my.url \\
--form landscape=true \\
--form marginTop=1 \\
--form marginBottom=1 \\
-o my.pdf
`;

const LibreOfficeExample = `
curl \\
--request POST http://localhost:3000/forms/libreoffice/convert \\
--form files=@/path/to/file.docx \\
--form files=@/path/to/file.xlsx \\
--form merge=true \\
--form pdfa=PDF/A-1b \\
-o my.pdf
`;

const PDFEnginesExample = `
curl \\
--request POST http://localhost:3000/forms/pdfengines/merge \\
--form files=@/path/to/file1.pdf \\
--form files=@/path/to/file2.pdf \\
--form files=@/path/to/file3.pdf \\
--form files=@/path/to/file4.pdf \\
-o my.pdf
`;

const ModuleList = [
  {
    label: "Chromium",
    value: "chromium",
    content: <CodeBlock className="bash" children={ChromiumExample} />,
  },
  {
    label: "LibreOffice",
    value: "libreoffice",
    content: <CodeBlock className="bash" children={LibreOfficeExample} />,
  },
  {
    label: "PDF Engines",
    value: "pdfengines",
    content: <CodeBlock className="bash" children={PDFEnginesExample} />,
  },
  {
    label: "...",
    value: "more",
    content: (() => {
      return (
        <div className="text--center">
          <p className="padding-top--lg padding-bottom--md">
            The API provides many more options and documents to convert 🚀
          </p>
          <Link
            className="button button--secondary button--lg margin-bottom--lg"
            to="/docs/routes"
          >
            Learn More
          </Link>
        </div>
      );
    })(),
  },
];

function Modules() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <Tabs defaultValue="chromium" values={ModuleList}>
              {ModuleList.map((props, idx) => {
                return (
                  <TabItem key={idx} value={props.value}>
                    {props.content}
                  </TabItem>
                );
              })}
            </Tabs>
          </div>
          <div className="col col--6">
            <h2>
              Convert, merge <span className="highlight">and more!</span>
            </h2>
            <p>
              Gotenberg provides a developer-friendly API to interact with
              powerful tools like Chromium and LibreOffice for converting
              numerous document formats (HTML, Markdown, Word, Excel, etc.) into
              PDF files, and more!
            </p>
            <p>
              Thanks to Docker, you don't have to install each tool in your
              environments; drop the Docker image in your stack, and you're good
              to go!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const WebhookExample = `
curl \\
--request POST http://localhost:3000/forms/chromium/convert/url \\
--header 'Gotenberg-Webhook-Extra-Http-Headers: {"MyHeader": "MyValue"}' \\
--header 'Gotenberg-Webhook-Url: https://my.webhook.url' \\
--header 'Gotenberg-Webhook-Method: PUT' \\
--header 'Gotenberg-Webhook-Error-Url: https://my.webhook.error.url' \\
--header 'Gotenberg-Webhook-Error-Method: POST' \\
--form url=https://my.url
`;

function Async() {
  return (
    <section className={clsx(styles.section, styles.darker)}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>
              <span className="highlight">Asynchronous</span> workflow
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col col--6">
            <p className={styles.paddingTopLg}>
              The webhook feature allows you to upload the output file to the
              destination of your choice.
            </p>
            <p>
              There are many options to fit your requirements, from the custom
              HTTP headers sent to your webhook to the HTTP method used to call
              it.
            </p>
          </div>
          <div className="col col--6">
            <CodeBlock className="basg" children={WebhookExample} />
          </div>
        </div>
      </div>
    </section>
  );
}

const RunExample = `
docker run --rm -p 80:80 gotenberg/gotenberg:8 gotenberg --api-port=80 --api-timeout=10s --libreoffice-disable-routes --log-level=debug
`;

function Platform() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>
              A modular <span className="highlight">platform</span>
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="text--center">
              <p>
                Gotenberg is a platform composed of modules; each module has
                properties you may customize to your flavor.
              </p>
              <CodeBlock children={RunExample} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="text--center">
              <p className={styles.wantMore}>
                🚀{" "}
                <span className="highlight">
                  <b>More customizations?</b>
                </span>{" "}
                Build your own Docker image by adding new tools and create
                modules that provide new routes to the API.
              </p>
              <Link
                className="button button--secondary button--lg"
                to="https://github.com/gotenberg/gotenberg-template-repository"
              >
                Template Repository
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sponsors() {
  return (
    <section className={clsx(styles.section, styles.darker)}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>They sponsor Gotenberg</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="text--center">
              <a href="https://thecodingmachine.com" target="_blank">
                <img
                  src="https://user-images.githubusercontent.com/8983173/130324668-9d6e7b35-53a3-49c7-a574-38190d2bd6b0.png"
                  alt="TheCodingMachine Logo"
                  width="429"
                  height="210"
                />
              </a>
              <a
                href="https://zolsec.com?utm_source=gotenberg_github&utm_medium=website"
                target="_blank"
              >
                <img
                  src="https://github.com/gotenberg/gotenberg/assets/8983173/ccb60b48-a232-4d87-af51-390986fd0600"
                  alt="Zolsec Logo"
                  width="429"
                  height="210"
                />
              </a>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="text--center">
              <a
                href="https://pdfme.com?utm_source=gotenberg_github&utm_medium=website"
                target="_blank"
              >
                <img
                  src="https://github.com/user-attachments/assets/2a75dd40-ca18-4d34-acd5-5dd474595168"
                  alt="pdfme Logo"
                  width="429"
                  height="210"
                />
              </a>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="text--right">
              <p className={styles.wantMore}>
                Sponsorships help maintaining and improving Gotenberg -{" "}
                <a href="https://github.com/sponsors/gulien" target="_blank">
                  become a sponsor
                </a>{" "}
                ❤️
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Highlights() {
  return (
    <span>
      {Modules()} {Async()} {Platform()} {Sponsors()}
    </span>
  );
}
