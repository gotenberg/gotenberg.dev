import { useWindowSize } from "@docusaurus/theme-common";
import OriginalDocSidebar from "@theme-original/DocSidebar";
import React from "react";
import { useLocation } from "react-router";
import styles from "./styles.module.css";

function buildScript(src, attrs = {}) {
  const script = document.createElement("script");
  script.async = true;
  for (const [attr, value] of Object.entries(attrs)) {
    script.setAttribute(attr, value);
  }
  script.src = src;

  return script;
}

export default function DocSidebar(props) {
  const ref = React.useRef();
  const windowSize = useWindowSize();
  const { pathname } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Load a new ad when the documentation route changes.
  React.useEffect(() => {
    if (windowSize !== "desktop") {
      return;
    }
    const script = buildScript(
      "//cdn.carbonads.com/carbon.js?serve=CWYI4KQL&placement=gotenbergdev",
      {
        type: "text/javascript",
        id: "_carbonads_js",
      },
    );
    const sidebar = ref.current?.firstElementChild;
    if (!sidebar) {
      return;
    }

    const carbonWrapper = document.createElement("div");
    carbonWrapper.classList.add(styles.carbonWrapper);

    // Keep the sidebar fully scrollable until Carbon actually renders an ad.
    // Otherwise blocked ad requests leave an empty 130px gap below the menu.
    const observer = new MutationObserver(() => {
      if (carbonWrapper.querySelector("#carbonads")) {
        carbonWrapper.classList.add(styles.carbonLoaded);
        observer.disconnect();
      }
    });
    observer.observe(carbonWrapper, { childList: true, subtree: true });

    carbonWrapper.appendChild(script);
    sidebar.appendChild(carbonWrapper);

    // Remove the unused wrapper if Carbon does not serve an ad.
    const checkTimer = setTimeout(() => {
      if (!carbonWrapper.querySelector("#carbonads")) {
        observer.disconnect();
        carbonWrapper.remove();
      }
    }, 3000);

    return () => {
      clearTimeout(checkTimer);
      observer.disconnect();
      carbonWrapper.remove();
    };
  }, [pathname, windowSize]);

  // A span avoids creating a containing block for the sticky desktop sidebar.
  return (
    <span ref={ref}>
      <OriginalDocSidebar {...props} />
    </span>
  );
}
