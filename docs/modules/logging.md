---
id: logging
title: Logging
---

The Logging module provides a logger to Gotenberg.

:::info

The logger writes [structured logs](https://www.sumologic.com/glossary/structured-logging/#:~:text=Structured%20logging%20is%20the%20practice,data%20sets%20rather%20than%20text.).

:::

## Properties

```
--log-format        string  Specify the format of logging. Options include auto, json, or text (default "auto")
--log-level         string  Choose the level of logging detail. Options include error, warn, info, or debug (default "info")
--log-fields-prefix string  Prepend a specified prefix to each field in the logs
```
