import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

// A table too wide for its column scrolls sideways in its panel (see
// custom.css). Make such a table a Tab stop, so a keyboard user can scroll it
// with the arrow keys.
function markScrollableTables() {
  document.querySelectorAll(".markdown table").forEach((table) => {
    if (table.scrollWidth > table.clientWidth) table.tabIndex = 0;
    else table.removeAttribute("tabindex");
  });
}

if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener("resize", markScrollableTables);
}

export function onRouteDidUpdate() {
  // The new page renders after this hook runs.
  requestAnimationFrame(markScrollableTables);
}
