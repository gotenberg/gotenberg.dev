---
id: install
title: Install
---

Gotenberg is shipped within a Docker image.

**[Gotenberg should ONLY be used in a trusted network by trusted applications. Do NOT expose Gotenberg to the external world.](https://blazej-adamczyk.medium.com/0-day-bug-breaks-multi-million-dollar-system-38c9e31b27e9)**

You may start it with:

```
docker run --rm -p 3000:3000 thecodingmachine/gotenberg:6
```

:::info

The API will be available at [http://localhost:3000](http://localhost:3000).

:::

The image uses a dedicated non-root user called `gotenberg` with uid and gid `1001`.

If you wish to change those uid and gid, you will have to:

- clone the project
- re-build the image
- publish the image in your own Docker repository

For instance:

```
git clone https://github.com/thecodingmachine/gotenberg.git
make publish GOTENBERG_USER_GID=your_custom_gid GOTENBERG_USER_UID=your_custom_uid DOCKER_REGISTRY=your_registry DOCKER_USER=registry_user DOCKER_PASSWORD=registry_password VERSION=version
```

:::info

`main` branch is always up-to-date with the latest version of the API.

:::

## Docker Compose

You may also add it in your Docker Compose stack:

```yaml
version: "3"

services:
  # your other services

  gotenberg:
    image: thecodingmachine/gotenberg:6
```

:::info

The API will be available under `gotenberg:3000` in your Docker Compose network.

:::

## Kubernetes

It may also be deployed with Kubernetes.

Make sure to provide enough memory and CPU requests (for instance `512Mi` and `0.2` CPU).

:::tip

The more resources are granted, the quicker will be the conversions.

:::

In the deployment specification of the pod, also specify the uid of the user `gotenberg`:

```yaml
securityContext:
  privileged: false
  runAsUser: 1001
```

## Cloud Run (Google Cloud)

If you're looking for cost savings, you might be interested by [Cloud Run](https://cloud.google.com/run).
However, according to some users, doing asynchronous conversion (with a webhook) might not working.

In the following examples, we will assume your
Gotenberg API is available at [http://localhost:3000](http://localhost:3000).
