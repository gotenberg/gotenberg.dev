---
id: docker-compose
title: Docker Compose
---

:::info

If you haven't, install [Docker](https://docs.docker.com/get-docker/) and 
[Docker Compose](https://docs.docker.com/compose/install/) first.

:::

## Quick Start

Adding Gotenberg in your Docker Compose services stack is as simple as:

```yaml title="docker-compose.yml"
version: "3"

services:
  # Your other services.

  gotenberg:
    image: gotenberg/gotenberg:7
```

:::tip

The API will be available under `gotenberg:3000` in your Docker Compose network.

:::

:::tip

To scale up your number of Docker containers, you may run:

```
docker-compose up --scale gotenberg=your_number_of_instances
```

:::

:::danger

We don't recommend exposing your instances to the external world. In terms of security, you should consider Gotenberg
as a database.

:::

## Modules' Properties

In the [Modules](../modules/api) chapters, we detail the many properties provided by Gotenberg's modules.

You must set these properties using flags (i.e., `--my-property`). 

For instance:

```yaml title="docker-compose.yml"
version: "3"

services:
  # Your other services.

  gotenberg:
    image: gotenberg/gotenberg:7
    command:
      - "gotenberg"
      - "--my-property=foo"
```

## Update

To update the `gotenberg` service to the latest version, run:

```
docker-compose pull gotenberg
```
