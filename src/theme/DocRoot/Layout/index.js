/**
 * Swizzled from @docusaurus/theme-classic DocRoot/Layout (v3.10.1).
 * Only change vs. the original: the sponsors bandeau is rendered as a
 * full-width sibling below the sidebar + content + TOC row (and above the
 * site footer). It sits in the column-flex .main-wrapper, so it spans the
 * full viewport width.
 */
import React, { useState } from "react";
import { useDocsSidebar } from "@docusaurus/plugin-content-docs/client";
import BackToTopButton from "@theme/BackToTopButton";
import DocRootLayoutSidebar from "@theme/DocRoot/Layout/Sidebar";
import DocRootLayoutMain from "@theme/DocRoot/Layout/Main";
import Sponsors from "@site/src/components/documentation/Sponsors";
import styles from "./styles.module.css";

export default function DocRootLayout({ children }) {
  const sidebar = useDocsSidebar();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  return (
    <>
      <div className={styles.docsWrapper}>
        <BackToTopButton />
        <div className={styles.docRoot}>
          {sidebar && (
            <DocRootLayoutSidebar
              sidebar={sidebar.items}
              hiddenSidebarContainer={hiddenSidebarContainer}
              setHiddenSidebarContainer={setHiddenSidebarContainer}
            />
          )}
          <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
            {children}
          </DocRootLayoutMain>
        </div>
      </div>
      <Sponsors />
    </>
  );
}
