(async () => {
  const meta = (sel) => document.querySelector(sel)?.getAttribute("content") ?? null;
  return {
    title: document.title,
    ogTitle: meta('meta[property="og:title"]'),
    ogDescription: meta('meta[property="og:description"]'),
    ogUrl: meta('meta[property="og:url"]'),
    ogImage: meta('meta[property="og:image"]'),
    ogImageAlt: meta('meta[property="og:image:alt"]'),
    ogType: meta('meta[property="og:type"]'),
    ogSiteName: meta('meta[property="og:site_name"]'),
    twitterCard: meta('meta[name="twitter:card"]'),
    twitterTitle: meta('meta[name="twitter:title"]'),
    twitterImage: meta('meta[name="twitter:image"]'),
    description: meta('meta[name="description"]'),
    hasEmDash: document.head.innerHTML.includes("\u2014"),
  };
})();
