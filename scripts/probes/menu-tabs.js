(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const read = () => ({
    tabs: [...document.querySelectorAll('[role="tab"]')].map((tab) => ({
      label: tab.textContent,
      selected: tab.getAttribute("aria-selected"),
      controls: tab.getAttribute("aria-controls"),
      underlined: tab.className.includes("border-cream "),
      onOneRow:
        Math.abs(
          tab.getBoundingClientRect().top -
            document.querySelector('[role="tab"]').getBoundingClientRect().top,
        ) < 2,
    })),
    panelId: document.querySelector('[role="tabpanel"]')?.id,
    dishes: [...document.querySelectorAll('[role="tabpanel"] article h3')].map(
      (h) => h.textContent,
    ),
    note: document.querySelector('[role="tabpanel"] > p')?.textContent ?? null,
  });

  const fonts = {
    brand: getComputedStyle(document.querySelector("h1")).fontFamily,
    brandLoaded: document.fonts.check('16px "Rafikis"'),
    body: getComputedStyle(document.body).fontFamily,
    workSansLoaded: document.fonts.check('16px "Work Sans"'),
    accent: getComputedStyle(document.querySelector("#story h2")).fontFamily,
    cormorantLoaded: document.fonts.check('italic 16px "Cormorant Garamond"'),
  };

  const colors = {
    background: getComputedStyle(document.body).backgroundColor,
    bodyColor: getComputedStyle(document.body).color,
    rule: getComputedStyle(document.querySelector(".brand-rule")).backgroundColor,
  };

  const out = { initial: read(), fonts, colors, afterClicks: [] };

  for (const label of ["Snacks", "Sides", "Desserts", "Grills"]) {
    const tab = [...document.querySelectorAll('[role="tab"]')].find((t) => t.textContent === label);
    tab.click();
    await sleep(120);
    out.afterClicks.push({ clicked: label, ...read() });
  }

  const tabNodes = [...document.querySelectorAll('[role="tab"]')];
  out.tabsShareOneRow = tabNodes.every(
    (t) => Math.abs(t.getBoundingClientRect().top - tabNodes[0].getBoundingClientRect().top) < 2,
  );
  return out;
})();
