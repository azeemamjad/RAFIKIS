# Rafikis: East African Grill Brand Specification

This is the operating manual for the Rafikis brand. It is the single source of truth for the owners, the designer, the social media manager and the developers. Everything in it comes from the official brand kit (Rafikis Brand Identity.pdf) and from decisions already shipped on the website. If a piece of work disagrees with this document, the work is wrong, not the document. Anything not covered here is a decision waiting to be made, so ask before you invent it.

---

## 1. Brand at a glance

| Item | Value |
| --- | --- |
| Brand name | Rafikis |
| Descriptor / tagline | EAST AFRICAN GRILL |
| Location line | Alserkal Avenue · Al Quoz · Dubai |
| Status line | Opening soon |
| Social handle | @rafikisdubai (`https://instagram.com/rafikisdubai`) |
| Copyright line | © 2026 RAFIKIS |
| Palette | Clay Orange `#9B3B0A` · Sandstone `#CEA984` · Charcoal `#111111` |
| Faces | RAFIKIS (custom, logo and headlines), Work Sans (headings and body), Cormorant Garamond (italic accents) |
| Mode | Dark only. There is no light mode. |

Use the middle dot separator in the location line, always, in that exact order. The handle is `@rafikisdubai`. The wrong URL `instagram.com/rafikidubai` has appeared in drafts; it is missing the `s` in `rafikis` and must never ship.

---

## 2. Colour

### 2.1 Core palette

These three hexes come from the brand kit. They are not approximate and must not be re-picked, warmed up, cooled down or "fixed" for a screen.

| Name | Hex | Role |
| --- | --- | --- |
| Clay Orange | `#9B3B0A` | Accent. Eyebrow labels, rules and dividers, hover states, focus rings, the "MENU" accents. Never body text. |
| Sandstone | `#CEA984` | All type, the wordmark, hairlines at low alpha for borders. |
| Charcoal | `#111111` | The ground. Every surface is Charcoal unless it is photography. |

### 2.2 Sanctioned tints

These derivations are the only permitted ones, because they are the ones in production. Do not add your own opacity steps.

| Tint | Value | Tailwind utility | Use |
| --- | --- | --- | --- |
| Sandstone at 90% | `text-cream/90` | hero sub-headline (serif italic) | Body copy on photography |
| Sandstone at 85% | `text-cream/85` | hero eyebrow, story body copy, footer status and location | Primary reading copy |
| Sandstone at 80% | `text-cream/80` | footer handle link | Interactive text |
| Sandstone at 75% | `text-cream/75` | dish descriptions | De-emphasised copy that still must read |
| Sandstone at 70% | `text-cream/70` | header handle, menu section note | Secondary labels |
| Sandstone at 60% | `text-cream/60` | inactive menu tabs | Interactive text that is not the current item |
| Sandstone at 45% | `text-cream/45` | copyright line | Markedly quiet, still legible |
| Sandstone at 16% | `#CEA98429` | `border-cream/10` | Default hairline border |
| Sandstone at 20% | `#CEA98433` | `border-cream/20` | Input borders |
| Elevated surface | `#171717` | `bg-paper` | Popovers only |

The site currently ships none of the older 50% and 30% steps. They were dropped because both sit below 4.5:1 for normal-size text, and quiet type that cannot be read is not quiet, it is missing.

Rules that follow from the table:

- Never introduce a fourth brand colour.
- No pure white, no pure black, no blue, no green. Not in UI, not in social exports, not in print, not in a "seasonal" variant.
- `#171717` is not a second background. It exists to lift a popover off the Charcoal ground and for nothing else.
- Photography is the only element allowed to carry colours outside the palette, and it still has to be treated (see section 6).
- Do not add opacity steps of your own. If a new role needs a new tint, add a row here first, then use it.

### 2.3 Colour do and don't

**Do**

- Set type in Sandstone at the documented opacity for its role.
- Use Clay Orange for small, deliberate accents: an eyebrow, a one pixel rule, a focus ring, a hover state.
- Keep borders as Sandstone at 16%, and let the content carry the layout rather than boxes.
- Test any new surface against the Charcoal ground before merging it.

**Don't**

- Don't put Clay Orange on a Sandstone fill, or Sandstone text on a Clay Orange fill. That pairing is unreadable (0.31:1).
- Don't use Clay Orange for body copy, paragraphs, menu descriptions or captions. It fails contrast on Charcoal. See section 9.
- Don't ship a Clay Orange wordmark.
- Don't invert the brand with a Sandstone background and Charcoal type, even for a "light" social post.
- Don't invent an opacity like 45% or 80% because it looked better on your screen.

---

## 3. Typography

Three faces, self-hosted, no exceptions and no substitutions.

### 3.1 RAFIKIS (custom face)

- **Role:** logo and headlines. Always all caps.
- **Production constraint that breaks things if ignored:** the supplied font file is a subset containing only A to Z plus the space glyph. It has no lowercase, no digits and no punctuation. If you set lowercase or numbers in it, the browser silently falls back to another face and the wordmark breaks without any error appearing. Always pair it with Work Sans as the fallback so a fallback is at least in-brand.
- **Tracking:** 0.1em, slight positive tracking, in every digital and print lockup.
- **Never** retype the wordmark in this face or any other face. Where the wordmark is required, use the vector or PNG asset. See section 4.

### 3.2 Work Sans

- **Headings:** SemiBold 600, uppercase, generous tracking.
- **Body:** Regular 400.
- **Body sizes in production:** 15px with 1.8 line-height for long copy; 13 to 14px for menu descriptions.
- **Small caps-style labels:** 9 to 11px, weight 500 or 600, tracking 0.2em to 0.5em, uppercase.

### 3.3 Cormorant Garamond

- **Role:** accent and luxury text, italic only.
- **Used for:** the story headline ("Friends, by the fire."), the hero sub-headline, and pull quotes.
- **Never** use it for body copy, buttons or labels.

### 3.4 Digital type styles

Production values for the website and for social templates rendered at 1080px wide. Sizes are the desktop value with the mobile value after the slash where they differ. Tracking is letter-spacing.

| Style | Face | Size | Weight | Tracking | Case |
| --- | --- | --- | --- | --- | --- |
| Hero wordmark | RAFIKIS | `clamp` to 144/160px | 400 | 0.1em | All caps, always |
| Menu heading ("MENU") | RAFIKIS | 48/72px | 400 | 0.1em | All caps, always |
| Header wordmark | RAFIKIS | 20/24px | 400 | 0.1em | All caps, always |
| Hero eyebrow ("EAST AFRICAN GRILL") | Work Sans | 10/11px | 500 | 0.5em | Uppercase |
| Section eyebrow ("OUR STORY") | Work Sans | 10/11px | 500 | 0.5em | Uppercase, Clay Orange |
| Section headline (serif italic) | Cormorant Garamond Italic | 36/48 to 60px | 400 | 0 (normal) | Sentence case |
| Body | Work Sans | 15px | 400 | 0 | Sentence case |
| Dish name | Work Sans | 14px | 600 | 0.2em | Uppercase via CSS |
| Dish description | Work Sans | 14px | 400 | 0 | Sentence case |
| Tab label | Work Sans | 11px | 600 | 0.2em | Uppercase via CSS |
| Footer legal | Work Sans | 9px | 400 | 0.3em | Uppercase |

Notes for whoever implements these:

- The serif italic set at 36px or larger counts as large text for contrast purposes, which is why Sandstone at 90% is comfortable there while the 14px dish description needs 75%.
- Line height for body copy is 1.8. Do not tighten it to fit a layout. Cut copy instead.
- Uppercase is a CSS transform, never typed by hand into an HTML string, so the underlying copy stays sentence case and stays greppable.
- The website's footer location line tracks at 0.32em and the menu tabs at 0.2em. The header wordmark carries no descriptor, so the only tracking on it is the wordmark's own 0.1em.

### 3.5 Fonts on disk

Fonts are self-hosted in `src/assets/fonts/` as woff2 (Work Sans and Cormorant Garamond are variable fonts) so that web, social exports and print all render identically with no third-party requests. Two Work Sans subsets are loaded with `unicode-range` so Latin Extended resolves without pulling the full file.

---

## 4. Logo and lockup rules

### 4.1 Primary lockup

The wordmark RAFIKIS in the custom face, with the descriptor EAST AFRICAN GRILL beneath it, centred, in Work Sans Medium, uppercase, tracked out at about 0.4em to 0.5em, and set at roughly 20 to 25 percent of the wordmark's cap height. Do not eyeball the descriptor size: measure it against the cap height of the R.

### 4.2 The wordmark itself

The wordmark was drawn on a four-column grid. It is a custom letterform. Never retype it in another font, never recreate it from a system font, never trace it, and never rebuild it from the letters of the RAFIKIS subset face. Use the supplied artwork.

### 4.3 Clear space

At least the cap height of the "R" on all four sides. Nothing may enter that space: no rule, no photo edge, no badge, no "Opening soon" sticker, no collaborator logo.

### 4.4 Minimum size

24px wide on screen, 12mm wide in print. Below that the counters fill in and the mark stops reading as the mark.

### 4.5 Colour

- Sandstone on Charcoal is the default and covers almost everything.
- Sandstone on photography is allowed only when the photograph is dimmed enough that the wordmark keeps a contrast ratio of at least 4.5:1 against the pixels directly behind it. Check the actual pixels behind the mark, not the average of the image.
- Clay Orange wordmarks are not permitted.

### 4.6 Website header lockup

The website header carries the wordmark alone on the Charcoal bar, with nothing stacked beneath it. Earlier versions set "Dubai" under the wordmark; that has been removed, and it must not come back. The descriptor EAST AFRICAN GRILL belongs to the full lockup (section 4.1) and to the hero eyebrow, not to the sticky header. This keeps the header mark identical in shape to the favicon, which is also the bare wordmark.

### 4.7 Things you may not do to the wordmark

Do not stretch it, outline it, add gradients to it, add drop shadows to it, rotate it, or re-colour it. This list is not a set of suggestions and it is not shortened by a deadline.

---

## 5. Voice and copy rules

Warm, plain-spoken, specific, never salesy. Short sentences. Concrete nouns: mishkaki, chooza, pili pili, mogo, mandazi. If a sentence could appear on any restaurant website in the city, rewrite it or delete it.

Rules:

1. Always "Opening soon" rather than a hard date, unless a date has been confirmed with the client. A missed opening date is worse than no date.
2. Always give the location as "Alserkal Avenue · Al Quoz · Dubai" using the middle dot separator.
3. Write dish names in Title Case in body copy, and in ALL CAPS only when the CSS uppercases them.
4. Do not translate or shorten the word Rafikis. It stays "Rafikis" in every language and every context.
5. Never write "Rafiki's" with an apostrophe. The name is not possessive and is not English.
6. No em dashes in customer-facing copy. Use a comma, a colon or a full stop.
7. No exclamation marks. No "authentic", no "vibrant", no "hidden gem", no "taste of Africa".
8. Prices do not appear in brand copy until the menu is final.

### 5.1 Good and bad examples

| Situation | Works | Does not work |
| --- | --- | --- |
| Opening status | "Opening soon at Alserkal Avenue." | "Grand opening on 14 March! Book now." |
| Dish description | "Beef Mishkaki: Swahili street-food skewers of marinated beef, grilled until juicy and tender." | "Our mouth-watering, authentic beef skewers are a taste explosion you won't forget." |
| Naming | "Rafikis is opening in Al Quoz." | "Rafiki's is opening in Al Quoz." |
| Location | "Alserkal Avenue · Al Quoz · Dubai" | "Alserkal Ave, Al Quoz, Dubai, UAE" |
| Story mention | "Rafikis: Swahili for \"friends.\"" | "Rafiki means friend in Swahili." |

### 5.2 Approved story copy

This copy is approved and must be reproduced exactly, including "Rafikis: Swahili for \"friends.\"" The website renders the quotation marks as typographic quotes, which is correct.

> **Rafikis: Swahili for "friends."**
>
> For generations, a community made its home along the East African coast, Tanzania, Kenya, Uganda, building a culinary tradition where Indian spice met Arab charcoal, and Portuguese chilli met Swahili Coconut.
>
> In the 1970s, that community lost its home. Families resettled across the world. The recipes went with them.
>
> Growing up in the diaspora, the weekly ritual was the tiny community restaurant. Mishkaki off the skewer. Chooza chicken with pili pili. Jungle ribs. Kababs and samosas hot from the fryer. That food is how the community held.
>
> Rafikis is that food. East African street food, off the grill, out of the fryer, made for sharing.
>
> Rafikis brings it to the greatest city in the world. A city that welcomed us, and where this food belongs.

Do not edit this for length on a social card. Crop the post, not the paragraph.

---

## 6. Photography direction

Warm, smoky, low-key photography only. The food and the fire are the light source. If a photograph needs a flash to work, it does not belong in the brand.

- **Treatment:** every full-bleed photo sits under a Charcoal overlay or gradient so that Sandstone type always reads. A flat `#111111` at 40 to 65 percent, or a gradient running from Charcoal to transparent, is the standard. The smoke plate on the hero uses a radial Charcoal gradient, which is the reference implementation.
- **Subject:** open flame, charcoal, smoke, hands, shared plates, skewers coming off the grill. Product shots should look like the food was just cooked, not styled for an hour.
- **Light:** warm and directional. Practical light, embers, late afternoon through a window.
- **Colour:** the photo may carry saturated fire tones, but the frame overall should sit close to Charcoal so the palette holds. No daylight-flat food photography, no bright blue skies in the background, no green-heavy scenes as a hero.
- **Never** place type on a bright or busy area of an image. If the words do not hold a 4.5:1 ratio against the pixels behind them, add more overlay.
- **People:** faces are fine, but the food leads. Avoid stock-looking portraits.
- **Aspect ratios in use:** 16:9 or wider for hero and web banners, 1:1 for feed and profile-adjacent posts, 4:5 for feed portraits, 9:16 for stories and reels covers.

---

## 7. Social playbook

### 7.1 Profile picture

Charcoal `#111111` ground with the full RAFIKIS wordmark in Sandstone `#CEA984`, centred, inside the clear space rule from section 4.3. Export at 1080 by 1080 and let the platform crop it. The "EAST AFRICAN GRILL" descriptor sits under the wordmark, tracked out; nothing else. This is the same treatment as the website favicon, so the two always match. Do not use a food photo as the profile picture. `public/brand/social/instagram-profile-1000.png` is the exported asset and `brand-templates/social.html` is its source.

### 7.2 Grid consistency

The grid should read as one object when someone lands on the profile.

- Charcoal is the ground of every graphic post. No post is light-mode.
- Alternate photographs and type cards. Never post three type cards in a row, and never post three near-identical photos in a row.
- One idea per post. One headline, one supporting line, at most.
- Keep the eyebrow, the rule and the footer legal line in the same position on every card so the grid has a rhythm.
- Every post gets the same 1:1 or 4:5 canvas choice per run, not per post.

### 7.3 Caption formula

Four lines, in this order:

1. **Hook:** one short sentence in plain English. "Mishkaki, straight off the skewer."
2. **Detail:** one concrete sentence. What it is, how it is cooked, what is in it.
3. **Invitation or status:** "Opening soon at Alserkal Avenue · Al Quoz · Dubai." or a question that a real person would answer.
4. **Tags:** hashtags on their own line.

Keep it under 125 characters before the hashtags so it does not truncate. Warm, specific, no hype, no em dashes, no exclamation marks.

### 7.4 Hashtags

Use these seven, consistently, and do not invent new ones without approval:

`#Rafikis` `#EastAfricanGrill` `#DubaiDining` `#AlserkalAvenue` `#Mishkaki` `#PiliPili` `#OpeningSoon`

Order them as listed, with `#Rafikis` and `#EastAfricanGrill` first. Seven is the ceiling for a normal post. One or two dish tags may be swapped in for a dish-specific post, but `#Rafikis`, `#EastAfricanGrill`, `#DubaiDining` and `#AlserkalAvenue` are on every post.

---

## 8. Where the assets live

Verified against the repository. Everything listed as existing is on disk now.

| Path | Contains |
| --- | --- |
| `public/brand/*.svg` | Print and design lockups, outlined so they need no font: `lockup-primary.svg` (Sandstone on Charcoal), `lockup-primary-transparent.svg`, `lockup-clay-orange.svg`, `wordmark.svg`, `wordmark-charcoal.svg`. |
| `public/brand/*.png` | Raster lockups for decks and social: `lockup-primary.png`, `lockup-primary-on-sandstone.png`, `lockup-clay-orange.png`, `lockup-horizontal.png`, `wordmark.png` (transparent), `mark-square.png`. |
| `public/brand/social/` | Exported social cards. Profile: `instagram-profile-1000.png`. Posts, 1080 by 1080: `post-opening-announcement-1080.jpg`, `post-chooza-chicken-1080.jpg`, `post-beef-ribs-1080.jpg`, `post-beef-mishkaki-1080.jpg`, `post-lamb-chops-1080.jpg`, `post-samosas-1080.jpg`, `post-pili-pili-fries-1080.jpg`, `post-mandazi-ice-cream-1080.jpg`. Stories, 1080 by 1920: `story-beef-mishkaki-1080x1920.jpg`, `story-our-story-1080x1920.jpg`. |
| `public/favicon.svg`, `public/icon-512.png`, `public/apple-touch-icon.png`, `public/favicon-64.png`, `public/favicon-32.png` | The app icon set: the Sandstone wordmark centred on a Charcoal square, at 76% of the frame width. See the legibility note under this table before changing it. |
| `public/icon-wordmark-1024.png` | The supplied icon artwork, cropped square and rescaled so the wordmark spans 80% of the frame. The source of record for the square wordmark treatment. |
| `brand-templates/icon-sizes.html` | Legibility sheet: the favicon and the 1024 artwork at 16, 32, 48, 64 and 180px. Regenerate and re-read this before changing the icon. |
| `public/og.jpg`, `public/og.png` | Open Graph share image, 1200 by 630, referenced by the site metadata. |
| `public/site.webmanifest` | Web app manifest naming the icons and the Charcoal theme colour. |
| `brand-templates/` | Editable HTML sources. HTML is the master; the exports above are never retouched by hand. `lockups.html`, `social.html`, `og.html`, `icons.html`, plus `fonts.css`, `brand.css` and `templates.css`. |
| `scripts/` | Render tooling. `scripts/render-brand-assets.mjs` renders every asset above; `scripts/lib/cdp.mjs` is the headless-Chrome driver; `scripts/serve-templates.mjs` serves the templates over HTTP; `scripts/shot.mjs` and `scripts/probe.mjs` are ad hoc screenshot and page-verification tools; `scripts/make-lockup-svgs.py` regenerates the outlined lockup SVGs from the master wordmark. |
| `src/styles.css` | The Tailwind v4 design tokens: palette, font faces, radii, semantic tokens. |
| `src/assets/fonts/` | `RAFIKIS-Regular.ttf` (logo subset, A to Z only), `WorkSans-Variable.woff2` and `WorkSans-Variable-ext.woff2`, `CormorantGaramond-Italic.woff2` and `CormorantGaramond-Variable.woff2`. |
| `src/assets/rafikis-wordmark.svg` | The vector wordmark. This is the master artwork; every lockup is derived from it. |

Notes:

- **The icon is the full wordmark, and that is a deliberate trade-off.** The wordmark is six letters wide, so in a square icon at a comfortable margin it occupies 76% of the width and only about 14% of the height. At 32px that is roughly 5px of ink and under 2px per letter, which is at the edge of what a browser tab can resolve. It was chosen over an "R" monogram anyway, for consistency with the wordmark-first identity. If legibility in small tabs ever becomes a complaint, the fix is to swap `public/favicon.svg` for the "R" from the wordmark: the same letterform, which stays clean down to 16px. Compare both in `brand-templates/icon-sizes.html` before deciding.
- Keep the wordmark's own 5.775 ratio in any square icon. Never stretch it to fill the frame: the icon carries margin above and below by design.
- To rebuild the icon set: `python scripts/make-icons.py <path-to-supplied-artwork>`, then `python scripts/inline-favicon.py`, then `npm run brand:render -- --only=icons`. The inline step is idempotent, so re-run it whenever `favicon.svg` changes or the raster PNGs will drift from the SVG.
- `src/styles.css` is where the palette lives for the web. It defines `--color-ink` and `--color-charcoal` as `#111111`, `--color-cream` and `--color-sandstone` as `#CEA984`, and `--color-ember` and `--color-clay` as `#9B3B0A`, which give the utilities `bg-ink`, `text-cream`, `text-ember`, `border-cream/10` and so on. These hexes must not be changed. `--radius` is `0.125rem`, effectively square corners: do not round cards or buttons.

---

## 9. Accessibility checks

Contrast was calculated with the WCAG 2.1 relative luminance formula against the Charcoal ground `#111111`.

| Pair | Ratio | Verdict |
| --- | --- | --- |
| Sandstone `#CEA984` on Charcoal `#111111` | 8.66:1 | Passes AA and AAA for body text |
| Sandstone on elevated surface `#171717` | approximately 8.2:1 | Passes AAA for body text |
| Sandstone at 90% (hero sub-headline) on Charcoal | approximately 7.3:1 | Passes AAA |
| Sandstone at 85% (body copy) on Charcoal | approximately 6.6:1 | Passes AA and AAA |
| Sandstone at 80% on Charcoal | approximately 6.0:1 | Passes AA and AAA |
| Sandstone at 75% (dish descriptions) on Charcoal | approximately 5.4:1 | Passes AA for body text |
| Sandstone at 70% (secondary labels) on Charcoal | approximately 4.9:1 | Passes AA for body text |
| Sandstone at 60% (inactive tabs) on Charcoal | approximately 3.9:1 | Passes AA only as large text. Shipped at 11px semibold with 0.2em tracking, where the letterspacing and weight carry it; raise to 70% if it is ever set smaller. |
| Sandstone at 45% (copyright line) on Charcoal | approximately 2.6:1 | Deliberately quiet. Marketing furniture, not reading copy. |
| Clay Orange `#9B3B0A` on Charcoal `#111111` | 2.72:1 | Fails AA for text. See the rule below. |
| Clay Orange on Sandstone | well under 1:1 | Never, under any circumstances |

**The Clay Orange rule, stated plainly: Clay Orange is NEVER used for body text.** It is used only for one-pixel rules, non-text accents such as hover states, and eyebrow labels that are uppercase, tracked out at 0.2em or wider, and set as a short label rather than a sentence. It is an accent, not a reading colour.

Tint figures are computed from the same relative luminance formula and are approximate by nature, because a tinted colour composited over Charcoal is exactly what the visitor's eye receives. If a checker reports a different second decimal, the verdict in the right-hand column is what governs.

Other standing requirements:

- Focus rings use Clay Orange. They are visible on every interactive element, including links inside body copy, and they are never removed without a replacement of equal contrast.
- Nothing communicates meaning through colour alone. The active menu tab is marked by a Sandstone underline as well as a colour change.
- Type is never set below 9px anywhere in the brand.
- Every photograph carrying type is checked at the pixel level, not by eye on a bright monitor.

---

## 10. Change control

### 10.1 Regenerating social assets

1. Edit the HTML source in `brand-templates/`. HTML is the master. Never retouch an exported image.
2. Start the template server: `npm run brand:serve`. It serves the templates and the self-hosted fonts, so what you export is what the site renders.
3. Render: `npm run brand:render` in a second terminal. Narrow it with `--only=social`, `--only=lockups`, `--only=og` or `--only=icons`. Cards are written as JPEG for upload and flat artwork as PNG.
4. Regenerate the outlined lockup SVGs with `npm run brand:lockups` after any change to `src/assets/rafikis-wordmark.svg`.
5. Check every export for the four things that break most often: lowercase or digits set in the RAFIKIS face, a wordmark under 24px, type sitting on a bright part of a photo, and a colour that is not in the palette.
6. The outputs land in `public/brand/` and `public/brand/social/`. Update the table in section 8 if a file name changes.

### 10.2 Who approves what

- **Palette changes:** the owners approve, together, and only with a written reason. No one else can approve a palette change, including a designer acting alone or a developer under deadline. A palette change means editing this document, `src/styles.css`, the favicon, the OG image and every template in one pass, and re-exporting every social asset. There is no such thing as a temporary colour.
- **Typography changes:** the designer proposes, the owners approve. Face substitutions are not a design choice, they are a brand change.
- **Logo and lockup changes:** the owners approve. The wordmark artwork itself is fixed and is not up for revision by anyone on this team.
- **Copy changes:** the owners approve new story or positioning copy. Day to day menu and caption copy is the social media manager's call, inside the rules in section 5.
- **Website implementation:** the developers own the code, but not the tokens. Changing a hex in `src/styles.css` is a brand change and needs the same approval as a palette change.
- **This document:** propose a change as a pull request against `BRAND.md` with one sentence explaining why. If the change is approved, it lands here first and then the assets follow, never the other way around.

### 10.3 Contrast debt already settled

An earlier draft of the site used Sandstone tints at 50% (de-emphasised copy) and 30% (the copyright line). Both were dropped, because 50% lands at about 3.9:1 and 30% at about 2.0:1, which is below what quiet type needs to stay readable. The site now runs the tint table in section 2.2 and nothing else. When porting older artwork, do not copy the 50% and 30% steps forward.
