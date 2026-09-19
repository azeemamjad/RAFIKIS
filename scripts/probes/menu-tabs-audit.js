(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(500);

  const tabs = [...document.querySelectorAll('[role="tab"]')].map((tab) => {
    const cs = getComputedStyle(tab);
    const r = tab.getBoundingClientRect();
    return {
      label: tab.textContent,
      selected: tab.getAttribute("aria-selected"),
      color: cs.color,
      borderBottomColor: cs.borderBottomColor,
      borderBottomWidth: cs.borderBottomWidth,
      fontWeight: cs.fontWeight,
      fontSize: cs.fontSize,
      onOneRow: true,
      width: Math.round(r.width),
    };
  });
  const top = document.querySelector('[role="tab"]').getBoundingClientRect().top;
  for (const tab of document.querySelectorAll('[role="tab"]')) {
    const r = tab.getBoundingClientRect();
    tabs.find((t) => t.label === tab.textContent).onOneRow =
      Math.abs(r.top - top) < 2;
  }

  return {
    viewport: [window.innerWidth, window.innerHeight],
    tabs,
    tabsOneRow: tabs.every((t) => t.onOneRow),
    // Does this environment even support hover? Headless Chrome usually does not.
    hoverMediaQuery: window.matchMedia("(hover: hover)").matches,
    pointerFine: window.matchMedia("(pointer: fine)").matches,
  };
})();
