(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(500);

  const hero = document.querySelector("#top");
  const footer = document.querySelector("footer");
  const heroKids = [...hero.querySelectorAll("p, h1, div")].map((el) => el.textContent.trim());

  const box = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: Math.round(r.top + window.scrollY), height: Math.round(r.height) };
  };

  const heroInner = [...hero.querySelectorAll("div")].find(
    (d) => getComputedStyle(d).textAlign === "center" && d.querySelector("h1"),
  );
  const heroTexts = [...heroInner.children].map((el) => ({
    text: el.textContent.trim().slice(0, 48),
    height: Math.round(el.getBoundingClientRect().height),
  }));

  return {
    openingSoonOnPage: document.body.textContent.includes("Opening soon"),
    heroTexts,
    heroInner: box(heroInner),
    heroContentHeight:
      Math.round(heroInner.getBoundingClientRect().height) -
      Number.parseFloat(getComputedStyle(heroInner).paddingTop) -
      Number.parseFloat(getComputedStyle(heroInner).paddingBottom),
    footerTexts: [...footer.querySelectorAll("div, p, a")].map((el) =>
      el.children.length === 0 ? el.textContent.trim() : null,
    ).filter(Boolean),
    footerHeight: Math.round(footer.getBoundingClientRect().height),
    docHeight: document.documentElement.scrollHeight,
  };
})();
