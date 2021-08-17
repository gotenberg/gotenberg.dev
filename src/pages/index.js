import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Hero from "../components/Hero";
import Pulls from "../components/Pulls";
import Highlights from "../components/Highlights";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagLine}>
      <Hero />
      <main>
        <Pulls />
        <Highlights />
      </main>
    </Layout>
  );
}
