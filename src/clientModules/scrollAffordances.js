import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

// A panel wider than its column scrolls sideways, with a shade at the edge
// that has more (see custom.css). This module marks those edges with
// data-more-left and data-more-right, and updates them as the panel scrolls.
// A panel that scrolls also becomes a Tab stop, so a keyboard user can scroll
// it with the arrow keys, and carries data-scrolls, which the stylesheet reads
// to give a table's last column room on a phone.
const PANELS = ".markdown table, .theme-code-block pre, .tabs, [data-scroller]";

function measure(panel) {
  const { scrollLeft, scrollWidth, clientWidth } = panel;
  return {
    scrolls: scrollWidth > clientWidth + 1,
    left: scrollLeft > 1,
    right: scrollLeft + clientWidth < scrollWidth - 1,
  };
}

function flag(panel, key, on) {
  if (on === key in panel.dataset) return;
  if (on) panel.dataset[key] = "";
  else delete panel.dataset[key];
}

function edges(panel, { left, right }) {
  flag(panel, "moreLeft", left);
  flag(panel, "moreRight", right);
}

function markAll() {
  queued = false;
  const panels = Array.from(document.querySelectorAll(PANELS));
  // Read every measure before writing any attribute, so the browser lays the
  // page out once.
  const measures = panels.map(measure);
  panels.forEach((panel, i) => {
    edges(panel, measures[i]);
    // Docusaurus makes every code block a Tab stop on its own.
    if (panel.tagName === "PRE") return;
    if (measures[i].scrolls && panel.tabIndex !== 0) {
      panel.tabIndex = 0;
      panel.dataset.scrolls = "";
    } else if (!measures[i].scrolls && panel.hasAttribute("tabindex")) {
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
  // Scroll events don't bubble: listen in the capture phase for any panel's.
  document.addEventListener(
    "scroll",
    (event) => {
      const panel = event.target;
      if (panel instanceof Element && panel.matches(PANELS)) {
        edges(panel, measure(panel));
      }
    },
    { capture: true, passive: true },
  );
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
