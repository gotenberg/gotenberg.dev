---
id: kubernetes
title: Kubernetes
---

The Docker image uses a dedicated non-root user called `gotenberg` with `uid` and `gid` **1001**.

In the deployment specification of the pod, don't forget to add:

```yaml
securityContext:
  privileged: false
  runAsUser: 1001
```

:::caution

Make sure to provide enough memory and CPU requests (for instance, `512Mi` and `0.2` CPU).

:::

:::tip

The more resources you grant to the pod, the more responsive the API will be.

:::

:::danger

We don't recommend exposing your instances to the external world. In terms of security, you should consider Gotenberg
as a database.

:::
