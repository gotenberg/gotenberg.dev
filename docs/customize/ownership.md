---
id: ownership
title: Ownership
---


By default, the Docker image uses a dedicated non-root user called `gotenberg` with `uid` and `gid` **1001**.

If you want to change these identifiers, you will have to build a Docker image.

For instance:

```docker
FROM gotenberg/gotenberg:7

USER root

RUN usermod -u {uid} -g {gid} gotenberg

USER gotenberg
```

