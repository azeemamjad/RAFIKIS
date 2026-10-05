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
  for (const name of ["Snacks", "Sides", "Desserts", "Grills"]) {
    const tab = tabs.find((t) => t.textContent === name);
    if (!tab) {
      out[name] = "TAB NOT FOUND";
      continue;
    }
    tab.click();
    await sleep(180);
    out[name] = read();
  }
  out.tabsOnOneRow = tabs.every(
    (t) => Math.abs(t.getBoundingClientRect().top - tabs[0].getBoundingClientRect().top) < 2,
  );
  return out;
})();
