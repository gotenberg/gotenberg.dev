---
id: docker
title: Docker
---

Gotenberg is available as a Docker image for **amd64**, **arm64**, **armhf**, and **i386** architectures.

:::info

If you haven't, install [Docker](https://docs.docker.com/get-docker/) first. 

:::

## Quick Start

To start a default Docker container of Gotenberg, run:

```
docker run --rm -p 3000:3000 gotenberg/gotenberg:7
```

Alternatively, using the historic Docker repository from our sponsor [TheCodingMachine](https://www.thecodingmachine.com):

```
docker run --rm -p 3000:3000 thecodingmachine/gotenberg:7
```

:::tip

The API will be available at [http://localhost:3000](http://localhost:3000).

:::

:::danger

We don't recommend exposing your instances to the external world. In terms of security, you should consider Gotenberg 
as a database.

:::

## Modules' Properties

In the [Modules](../modules/api) chapters, we detail the many properties provided by Gotenberg's modules.

You must set these properties using flags (i.e., `--my-property`). 

For instance:

```
docker run --rm -p 3000:3000 gotenberg/gotenberg:7 \
       gotenberg \
       --my-property=foo
```

## Update

To update your local Docker image of Gotenberg to the latest version, run:

```
docker pull gotenberg/gotenberg:7
```