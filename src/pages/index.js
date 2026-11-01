import React from "react";
import Layout from "@theme/Layout";
import { PageMetadata } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Homepage from "../components/homepage";

// Only the homepage presents Gotenberg 9 so far: it carries its own social
// card, while the docs keep the site-wide one.
export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.tagline}
      description="Converts web pages and office documents to PDF, then remediates, signs and delivers them. Validates any PDF against PDF/A, PDF/UA and Factur-X."
    >
      <PageMetadata image="/img/og-image-9.png" />
      <Homepage />
    </Layout>
  );
}
