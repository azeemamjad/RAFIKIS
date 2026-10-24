(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(400);

  const read = () => {
    const panel = document.querySelector('[role="tabpanel"]');
    return {
      note: panel.querySelector(":scope > p")?.textContent ?? null,
      dishes: [...panel.querySelectorAll("article")].map((a) => {
        const r = a.getBoundingClientRect();
        return {
          name: a.querySelector("h3").textContent,
          description: a.querySelector("p").textContent,
          spansBothColumns: a.className.includes("col-span-2"),
          left: Math.round(r.left),
          width: Math.round(r.width),
        };
      }),
    };
  };

  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const out = {};
  // Read the tab names from the page instead of a hardcoded list, so the probe
  // keeps working as sections come and go.
  for (const tab of tabs) {
    tab.click();
    await sleep(180);
    out[tab.textContent] = read();
  }
  out.tabsOnOneRow = tabs.every(
    (t) => Math.abs(t.getBoundingClientRect().top - tabs[0].getBoundingClientRect().top) < 2,
  );
  return out;
})();
