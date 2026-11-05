import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

// A panel wider than its column scrolls sideways, with a shade at the edge
// that has more (see custom.css). Such a panel also becomes a Tab stop, so a
// keyboard user can scroll it with the arrow keys, and carries data-scrolls,
// which the stylesheet reads to give a table's last column room on a phone.
const PANELS = ".markdown table, .theme-code-block pre, .tabs, [data-scroller]";

function markAll() {
  queued = false;
  const panels = Array.from(document.querySelectorAll(PANELS));
  // Read every measure before writing any attribute, so the browser lays the
  // page out once.
  const scrolling = panels.map(
    (panel) => panel.scrollWidth > panel.clientWidth + 1,
  );
  panels.forEach((panel, i) => {
    // Docusaurus makes every code block a Tab stop on its own.
    if (panel.tagName === "PRE") return;
    if (scrolling[i] && panel.tabIndex !== 0) {
      panel.tabIndex = 0;
      panel.dataset.scrolls = "";
    } else if (!scrolling[i] && panel.hasAttribute("tabindex")) {
      panel.removeAttribute("tabindex");
      delete panel.dataset.scrolls;
    }
  });
}

let queued = false;
function queue() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(markAll);
}

if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener("resize", queue);
  // The homepage rewrites its code panels as its controls change. Attributes
  // stay unobserved, so the marks above never queue another pass.
  new MutationObserver(queue).observe(document.documentElement, {
    childList: true,
    characterData: true,
    subtree: true,
  });
  if (document.fonts) document.fonts.ready.then(queue);
}

export function onRouteDidUpdate() {
  // The new page renders after this hook runs.
  queue();
}
