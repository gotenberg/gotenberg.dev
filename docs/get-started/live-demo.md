---
id: live-demo
title: 🔥 Live Demo
---

Before pulling the Docker image, you may want to test Gotenberg first. For this purpose, we provide two demo
URLs:

* 🇺🇸 US (Oregon) - `https://live-demo-us.gotenberg.dev`
* 🇪🇺 EU (Frankfurt) - `https://live-demo-eu.gotenberg.dev`

:::note

**There is no UI**; these URLs are API entry points.

:::

:::tip

The live demo uses a custom Gotenberg's Docker image built with the
[GitHub template repository](https://github.com/gotenberg/gotenberg-template-repository) 👷.

:::

## Usage

The following modules supplies routes you may want to explore first:

* [Chromium](../modules/chromium)
* [LibreOffice](../modules/libreoffice)
* [PDF Engines](../modules/pdf-engines)

While you're reading the documentation, open a terminal and test the routes using one of the demo URLs.

For instance:

```bash
curl \
--request POST 'https://live-demo-us.gotenberg.dev/forms/chromium/convert/url' \
--form 'url="https://sparksuite.github.io/simple-html-invoice-template/"' \
-o my.pdf
```

## Limitations

Each environment runs on a [Render](https://render.com) instance with `1GB` of RAM and `1` CPU.

Currently, the limitations are:

* Two requests per second per IP.
* `5MB` body limit.
