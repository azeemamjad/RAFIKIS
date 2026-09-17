(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(500);

  const hero = document.querySelector("#top");
  const children = [...hero.children].map((el, i) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      i,
      cls: el.className.slice(0, 60),
      top: Math.round(r.top + window.scrollY),
      bottom: Math.round(r.bottom + window.scrollY),
      height: Math.round(r.height),
      padding: `${cs.paddingTop} / ${cs.paddingBottom}`,
      justify: cs.justifyContent,
      minHeight: cs.minHeight,
      zIndex: cs.zIndex,
    };
  });

  // The content wrapper is the child that carries text-align: center.
  const content = [...hero.querySelectorAll("div")].find(
    (d) => getComputedStyle(d).textAlign === "center" && d.querySelector("h1"),
  );
  const cr = content.getBoundingClientRect();
  const ccs = getComputedStyle(content);
  const padTop = Number.parseFloat(ccs.paddingTop);
  const padBottom = Number.parseFloat(ccs.paddingBottom);

  const kids = [...content.children].map((el) => {
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName,
      text: el.textContent.trim().slice(0, 26),
      top: Math.round(r.top + window.scrollY),
      height: Math.round(r.height),
      mt: getComputedStyle(el).marginTop,
    };
  });

  const header = document.querySelector("header").getBoundingClientRect();
  const contentTop = Math.round(cr.top + window.scrollY);

  return {
    viewport: [window.innerWidth, window.innerHeight],
    heroChildren: children,
    content: {
      top: contentTop,
      height: Math.round(cr.height),
      paddingTop: padTop,
      paddingBottom: padBottom,
      justify: ccs.justifyContent,
      minHeight: ccs.minHeight,
    },
    kids,
    innerContentHeight: Math.round(cr.height - padTop - padBottom),
    gapHeaderToContent: contentTop - Math.round(header.bottom),
    gapContentBottomToHeroBottom:
      Math.round(hero.getBoundingClientRect().bottom) - (contentTop + Math.round(cr.height)),
    docHeight: document.documentElement.scrollHeight,
  };
})();
