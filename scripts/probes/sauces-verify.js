(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(400);

  // Sauces tab
  const saucesTab = [...document.querySelectorAll('[role="tab"]')].find(
    (t) => t.textContent === "Sauces",
  );
  if (!saucesTab) return { error: "no Sauces tab" };
  saucesTab.click();
  await sleep(200);
  const panel = document.querySelector('[role="tabpanel"]');
  const sauces = [...panel.querySelectorAll("article")].map((a) => ({
    name: a.querySelector("h3").textContent,
    description: a.querySelector("p").textContent,
  }));

  // Story paragraph
  const storyP = [...document.querySelectorAll("#story p")].find((p) =>
    p.textContent.includes("Rafikis is that food"),
  );
  const tabNames = [...document.querySelectorAll('[role="tab"]')].map((t) => t.textContent);

  // Fries description (back on Sides)
  const sidesTab = [...document.querySelectorAll('[role="tab"]')].find(
    (t) => t.textContent === "Sides",
  );
  sidesTab.click();
  await sleep(200);
  const fries = [...document.querySelectorAll('#menu article')].find((a) =>
    a.querySelector("h3").textContent.includes("Fries"),
  );

  return {
    tabNames,
    sauces,
    storySentence: storyP?.textContent.trim() ?? null,
    friesDescription: fries?.querySelector("p").textContent ?? null,
    openingSoonOnPage: document.body.textContent.includes("Opening soon"),
  };
})();
