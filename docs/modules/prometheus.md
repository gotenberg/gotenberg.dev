---
id: prometheus
title: Prometheus
---

The Prometheus module collects metrics from other modules.

## Properties

```
--prometheus-collect-interval      duration  Set the interval for collecting modules' metrics (default 1s)
--prometheus-namespace             string    Set the namespace of modules' metrics (default "gotenberg")
--prometheus-disable-collect       bool      Disable the collect of metrics
--prometheus-disable-route-logging bool      Disable the route logging
```

## Route

`GET /prometheus/metrics`

This route exposes the metrics from other modules.

## Metrics

### Modules

The following modules provide metrics:

* [Chromium](chromium#metric)
* [LibreOffice](libreoffice#metrics)
* [PDF Engines](pdf-engines#metrics)