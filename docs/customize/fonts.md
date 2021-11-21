---
id: fonts
title: Fonts
---

By default, the Docker image contains many fonts, including Asian ones.

If you wish to use more fonts, you will have to build a Docker image.

## `.ttf`

```docker
FROM gotenberg/gotenberg:7

USER root

COPY /local/path/to/{font}.ttf /usr/local/share/fonts/{font}.ttf

USER gotenberg
```

Or, if you have many fonts:

```docker
FROM gotenberg/gotenberg:7

USER root

COPY /local/path/to/fonts/* /usr/local/share/fonts/

USER gotenberg
```

## `apt-get install`

```docker
FROM gotenberg/gotenberg:7

USER root

RUN DEBIAN_FRONTEND=noninteractive apt-get install -y -qq --no-install-recommends my-fonts-package

USER gotenberg
```


