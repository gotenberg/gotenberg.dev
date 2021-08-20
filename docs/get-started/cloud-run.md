---
id: cloud-run
title: Cloud Run
---

If you're looking for cost savings, you might be interested in using [Cloud Run](https://cloud.google.com/run).

If so, prefer the `gotenberg/gotenberg:7-cloudrun` Docker image tag.

Alternatively, you may also use `thecodingmachine/gotenberg:7-cloudrun` from our 
sponsor, [TheCodingMachine](https://www.thecodingmachine.com).

:::info

For security reasons, the non-root user `gotenberg` does not own the [Tini](https://github.com/krallin/tini)
binary by default. However, some providers like Cloud Run from Google Cloud cannot start a Docker container in that case.

:::

:::danger

We don't recommend exposing your instances to the external world. In terms of security, you should consider Gotenberg
as a database.

:::
