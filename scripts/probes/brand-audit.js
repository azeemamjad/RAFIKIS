(async () => {
  await new Promise((r) => setTimeout(r, 800));

  const out = {
    title: document.title,
    canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
    icons: [
      ...document.querySelectorAll(
        'link[rel="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]',
      ),
    ].map((l) => l.getAttribute("href")),
    ogImage: document.querySelector('meta[property="og:image"]')?.content ?? null,
    themeColor: document.querySelector('meta[name="theme-color"]')?.content ?? null,
    tabsOneRow: null,
    tabColors: [],
    samples: {},
    headingOrder: [...document.querySelectorAll("h1, h2, h3, h4")].map(
      (h) => h.tagName + " " + h.textContent.trim().slice(0, 40),
    ),
  };

  const tabs = [...document.querySelectorAll('[role="tab"]')];
  out.tabsOneRow = tabs.every(
    (t) => Math.abs(t.getBoundingClientRect().top - tabs[0].getBoundingClientRect().top) < 2,
  );
  out.tabColors = tabs.map((t) => ({
    label: t.textContent,
    color: getComputedStyle(t).color,
    selected: t.getAttribute("aria-selected"),
  }));

  const pick = (label, el) => {
    if (!el) return;
    const cs = getComputedStyle(el);
    out.samples[label] = {
      color: cs.color,
      fontSize: cs.fontSize,
      face: cs.fontFamily.split(",")[0].replace(/"/g, ""),
      tracking: cs.letterSpacing,
    };
  };

  pick("heroWordmark", document.querySelector("h1"));
  pick("heroEyebrow", document.querySelector("#top p"));
  pick("heroSubhead", document.querySelector("#top .font-serif-italic"));
  pick("storyEyebrow", document.querySelector("#story p"));
  pick("storyHeadline", document.querySelector("#story h2"));
  pick("storyBody", document.querySelector("#story .space-y-5 p:not(.font-serif-italic)"));
  pick("menuHeading", document.querySelector("#menu h2"));
  pick("menuTabActive", tabs[0]);
  pick("menuTabIdle", tabs[1]);
  pick("dishName", document.querySelector("#menu article h3"));
  pick("dishDescription", document.querySelector("#menu article p"));
  pick("footerStatus", document.querySelector("footer .space-y-3 p"));
  pick("footerHandle", document.querySelector("footer a"));
  pick("copyright", document.querySelector("footer > div > div > p:last-child"));

  const storyImg = document.querySelector("#story img");
  out.storyImage = {
    loading: storyImg?.getAttribute("loading"),
    src: storyImg?.currentSrc?.slice(-40),
  };
  out.bodyBackground = getComputedStyle(document.body).backgroundColor;
  return out;
})();
