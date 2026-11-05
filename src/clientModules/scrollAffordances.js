import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

// A panel wider than its column scrolls sideways. A short one shows a thin
// scrollbar, a tall one a shade at the edge that has more (see custom.css).
// A panel that scrolls also becomes a Tab stop, so a keyboard user can
// scroll it with the arrow keys.
const PANELS = ".markdown table, .theme-code-block pre, .tabs, [data-scroller]";

// Under this height a scrollbar sits close enough to the eye; above it, the
// shade reads better.
const TALL = 200;

function markAll() {
  queued = false;
  const panels = Array.from(document.querySelectorAll(PANELS));
  // Read every measure before writing any attribute, so the browser lays the
  // page out once. clientHeight leaves the scrollbar out, so the cue does not
  // change the measure it depends on.
  const marks = panels.map((panel) => ({
    panel,
    cue: panel.clientHeight > TALL ? "shade" : "bar",
    scrolls: panel.scrollWidth > panel.clientWidth + 1,
  }));
  for (const { panel, cue, scrolls } of marks) {
    if (panel.dataset.scroll !== cue) panel.dataset.scroll = cue;
    // Docusaurus makes every code block a Tab stop on its own.
    if (panel.tagName === "PRE") continue;
    if (scrolls && panel.tabIndex !== 0) panel.tabIndex = 0;
    else if (!scrolls && panel.hasAttribute("tabindex"))
      panel.removeAttribute("tabindex");
  }
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
