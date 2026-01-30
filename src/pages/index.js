import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Hero from "../components/Hero";
import Highlights from "../components/Highlights";
import Stats from "../components/Stats";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.tagline} description={siteConfig.tagline}>
      <Hero />
      <main>
        <Stats />
        <Highlights />
      </main>
    </Layout>
  );
}
