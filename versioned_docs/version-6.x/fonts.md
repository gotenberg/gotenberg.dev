---
id: fonts
title: Fonts
---

By default, a handful of fonts are installed. Asian characters are also supported out of the box.

If you wish to use more fonts, you will have to create your own image:

```docker
FROM thecodingmachine/gotenberg:6

USER root

RUN apt-get -y install yourfonts

USER gotenberg
```
