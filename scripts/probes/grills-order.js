(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(400);
  const tab = [...document.querySelectorAll('[role="tab"]')].find(
    (t) => t.textContent === "Grills",
  );
  tab.click();
  await sleep(200);

  const dishes = [...document.querySelectorAll('#menu [role="tabpanel"] article')].map((a) => {
    const r = a.getBoundingClientRect();
    return {
      name: a.querySelector("h3").textContent,
      top: Math.round(r.top),
      left: Math.round(r.left),
    };
  });

  // Group into visual rows by top offset, not by column.
  const rows = [];
  for (const d of dishes) {
    const row = rows.find((r) => Math.abs(r.top - d.top) < 8);
    if (row) row.items.push(d.name);
    else rows.push({ top: d.top, items: [d.name] });
  }
  rows.sort((a, b) => a.top - b.top);

  return {
    readingOrder: dishes.map((d) => d.name),
    visualRows: rows.map((r, i) => `row ${i + 1}: ${r.items.join("  |  ")}`),
  };
})();
