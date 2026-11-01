import React from "react";
import cx from "./cx";
import Hero from "./Hero";
import Conformance from "./Conformance";
import Invoicing from "./Invoicing";
import Deliver from "./Deliver";
import Operate from "./Operate";
import Architectures from "./Architectures";
import Sponsors from "./Sponsors";
import Closing from "./Closing";

export default function Homepage() {
  return (
    <main className={cx("g9 cb xb")}>
      <Hero />
      <Sponsors />
      <Conformance />
      <Invoicing />
      <Deliver />
      <Operate />
      <Architectures />
      <Closing />
    </main>
  );
}
