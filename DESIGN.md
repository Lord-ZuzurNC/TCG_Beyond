---
name: TCG Beyond
description: Every card from every game arrives graded, slabbed, and wearing one label.
colors:
  ground: "#1e1e2e"
  inset: "#181825"
  well: "#11111b"
  acrylic: "#313244"
  acrylic-edge: "#45475a"
  acrylic-bevel: "#6c7086"
  plate: "#e4e6f2"
  plate-edge: "#b3b7cc"
  plate-ink: "#11111b"
  plate-ink-soft: "#313244"
  plate-ink-faint: "#45475a"
  ink: "#cdd6f4"
  ink-soft: "#cdd6f4"
  ink-faint: "#a6adc8"
  line: "#45475a"
  line-soft: "#313244"
  accent: "#89b4fa"
  accent-ink: "#11111b"
  positive: "#a6e3a1"
  negative: "#f38ba8"
  negative-ink: "#11111b"
  scrim: "rgb(0 0 0 / 0.62)"
  warn: "#f9e2af"
  holo-a: "#74c7ec"
  holo-b: "#f5c2e7"
  holo-c: "#f9e2af"
  rank-common: "#a6e3a1"
  rank-common-ink: "#11111b"
  rank-rare: "#89b4fa"
  rank-rare-ink: "#11111b"
  rank-legendary: "#f9e2af"
  rank-legendary-ink: "#11111b"
  rank-mythic: "#fab387"
  rank-mythic-ink: "#11111b"
  rank-unique: "#f38ba8"
  rank-unique-ink: "#11111b"
  rank-beyond: "#cba6f7"
  rank-beyond-ink: "#11111b"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.1rem + 1.6vw, 2.125rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 76"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.1
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 84"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.07em"
    fontVariation: "'wdth' 78"
  serial:
    fontFamily: "Azeret Mono, ui-monospace, 'Cascadia Mono', monospace"
    fontWeight: 400
    letterSpacing: "-0.02em"
    fontFeature: "'ss01', tabular-nums"
rounded:
  hairline: "2px"
  field: "3px"
  slab: "5px"
  well: "7px"
  pill: "999px"
spacing:
  s-1: "0.25rem"
  s-2: "0.5rem"
  s-3: "0.75rem"
  s-4: "1rem"
  s-5: "1.5rem"
  s-6: "2rem"
  s-7: "3rem"
  s-8: "4.5rem"
components:
  grade-band:
    backgroundColor: "{colors.rank-rare}"
    textColor: "{colors.rank-rare-ink}"
    typography: "{typography.label}"
    rounded: "0px"
    padding: "0.5rem 0.75rem"
  slab:
    backgroundColor: "{colors.acrylic}"
    textColor: "{colors.ink}"
    rounded: "{rounded.slab}"
    padding: "0px"
  label-plate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.plate-ink}"
    rounded: "0px"
    padding: "0 0.75rem 0.75rem"
  well-empty:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink-faint}"
    rounded: "{rounded.well}"
    padding: "3px"
  action-button:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    rounded: "{rounded.field}"
    padding: "0.5rem"
  action-button-confirm:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.field}"
    padding: "0.5rem"
  input-field:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0.25rem 0.5rem"
    height: "1.75rem"
  nav-section:
    backgroundColor: "{colors.acrylic}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.slab}"
    padding: "0 0.5rem 0 0"
    height: "2.375rem"
  nav-section-active:
    backgroundColor: "{colors.acrylic}"
    textColor: "{colors.accent}"
    rounded: "{rounded.slab}"
    height: "2.375rem"
  register-readout:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink}"
    typography: "{typography.serial}"
    rounded: "{rounded.field}"
    padding: "0.25rem 0.75rem"
---

# Design System: TCG Beyond

## Overview

**Creative North Star: "The Graded Slab"**

Every card in TCG Beyond, from any of seven games, arrives the way a certified
collectible arrives: sealed in a bevelled acrylic case, with a matte cert-label
plate set across the top carrying one grade, one ordinal against the whole
database, one machine serial, and one first-discoverer line. The interface is the
counter that slab is lying on. The theme colours the counter; the slab is the
object. Nothing floats, nothing glows, nothing is trimmed in gold.

This is a deliberate refusal of the arrangement the category always ships: a dark
screen of glowing rarity gradients, particle bursts, countdown rings and foil
borders. The only saturated field anywhere in the product is the grade band, and
it is saturated because a grade is the one fact worth shouting. Everything else
is printed stock, hairline rules, condensed caps, and tabular figures.

Density is high and the chrome is thin. A slab's label plate takes roughly a
quarter of its body and the card window takes most of the rest, because the card
art is what players came for. The system survives on material logic rather than
decoration: light printed stock stays light in all four themes, bevels catch a
lighter edge on top, acrylic sits proud of its recessed well, and every state a
player must read is readable by silhouette before colour is applied.

**Key Characteristics:**
- One saturated field per slab: the grade band, never anything else.
- Light cert-label plates in all four themes, dark counters in three of them.
- Condensed Archivo caps for labels, Azeret Mono for every number that identifies.
- Recessed wells, bevelled acrylic, hairline rules; depth by material, not by glow.
- Every state separable by silhouette at phone width before colour is read.

## Colors

Four Catppuccin palettes (Latte, Frappé, Macchiato, Mocha; Mocha is default) each
supply a counter, a set of slab materials derived from it, and six fixed rank
colours in that theme's tone. The frontmatter records the Mocha values as
canonical; the other three carry the same token names at the same roles.

### Primary

- **Grade Band Colour** (six fixed values, `--rank-common` … `--rank-beyond`): the
  only saturated field in the product. Used as a filled band across the top of a
  graded slab, as the band on a rank-tier chip, and as the tick on the global
  position axis. Never as text.
- **Band Ink** (`--rank-<id>-ink`): the paired text colour computed per rank *per
  theme* so the band clears 4.5:1. A rank colour and its ink always travel
  together; using one without the other is a bug.

### Secondary

- **Signal Blue** (`--accent`): the one interactive accent. Focus rings, active
  nav section, the confirm button, links, caret, and selection. It says
  "actionable", never "valuable" — value is the grade band's job.

### Tertiary

- **Hologram Trio** (`--holo-a` / `--holo-b` / `--holo-c`): a three-stop sweep used
  only for the laminated security strip and for the ungraded band on an
  Overflow or Challenger-armed slab. It marks *authenticated but ungraded*.
- **Status inks** (`--positive`, `--negative`, `--warn`): free-cost lines, sold
  stamps, error and warning states. Small type only, with one exception —
  `--negative` fills the unread-count badge, and there it carries
  `--negative-ink`, computed per theme to clear 4.5:1 against it.

### Neutral

- **Counter surfaces** (`--ground` → `--inset` → `--well`): the room. `--ground` is
  the page, `--inset` the rail and top bar, `--well` the recessed tray socket and
  input beds.
- **Acrylic** (`--acrylic`, `--acrylic-edge`, `--acrylic-bevel`): the slab case
  body, its border, and the lighter lip on its top edge that makes it read as a
  moulded object.
- **Label-plate ramp** (`--plate`, `--plate-edge`, `--plate-ink`,
  `--plate-ink-soft`, `--plate-ink-faint`): printed card stock and the three inks
  that print on it. Light in all four themes.
- **Counter inks** (`--ink`, `--ink-soft`, `--ink-faint`) and rules (`--line`,
  `--line-soft`): everything printed on the counter rather than on a plate.
- **Scrim** (`--scrim`): the translucent backdrop behind the phone navigation
  drawer, tuned per theme rather than a flat black. It is a scrim, not a surface —
  nothing is ever set on it, so it carries no paired ink and is not an exception
  to The Computed Ink Rule.

### Named Rules

**The Single Saturated Field Rule.** Rank colour appears in exactly one form: a
filled band or chip carrying `--rank-<id>-ink` on it, accompanied by the RankMark
ladder and the spelled rank word. Rank colour is never type, never a border,
never a glow, and never the sole carrier of rank — that last clause is a WCAG 2.2
AA obligation, not a preference.

**The Computed Ink Rule.** A saturated field never carries inherited ink; it
carries an ink computed against itself. Every filled colour in this system ships
as a pair — `--rank-<id>` with `--rank-<id>-ink`, `--accent` with `--accent-ink`,
`--negative` with `--negative-ink`, `--plate` with the `--plate-ink*` ramp. Adding
a new filled field means adding its ink token in all four themes in the same
edit. Three separate contrast defects in this build came from a filled surface
inheriting the ink of the surface behind it.

**The Printed Stock Rule.** The label plate is light in all four themes, including
the dark ones, because that is physically what a certification label is. Any
element sitting on a plate carries `.on-plate`, which swaps the whole ink ramp to
`--plate-ink*` and the rules to `--plate-edge`. Never hand-pick a plate colour on
a component.

**The Guard Rule.** `.impeccable/contrast.mjs` parses `src/app.css` and checks
every ink/surface pair and every rank/band-ink pair in all four themes against
4.5:1. It also walks every `var(--token)` reference across `src/**` and fails on
any token not defined in `app.css` or locally in the file that uses it — an
undefined token resolves to inherited ink, which is invisible to a pair check and
is how a 1.07:1 badge shipped. It exits non-zero on either failure; a palette or
component edit is not finished until it exits zero.

## Typography

**Display / Body Font:** Archivo (variable, `wdth` 62–125, `wght` 400–800),
self-hosted, with `ui-sans-serif, system-ui, sans-serif` behind it.
**Label/Mono Font:** Azeret Mono (400–700), self-hosted, with `ui-monospace,
'Cascadia Mono', monospace` behind it.

**Character:** One family carries the whole voice by changing width rather than by
changing face. Archivo narrows to 62–80% for anything that behaves like print on a
certification label and opens to 84% for card names; the result reads as a single
industrial hand that tightens when a label needs to fit. Azeret Mono appears only
where a number identifies something — serials, ordinals, timers, balances — so
monospace itself means "this is a machine value".

### Hierarchy

- **Display** (700, `clamp(1.5rem, 1.1rem + 1.6vw, 2.125rem)`, 1.15, `wdth` 76,
  `-0.02em`, balanced): page titles only, one per view.
- **Headline** (600, 1.5rem, 1.1): the register readout and countdown clock, set
  in Azeret Mono with tabular figures.
- **Title** (700, 1.0625rem, `wdth` 84): card names on a slab, the wordmark's
  second line, section headings inside a panel.
- **Body** (400, 0.9375rem, 1.55, pretty-wrapped, max 68ch via `.prose`): the only
  text that is read in sentences.
- **Label** (`.cert-caps`; 700, 0.625rem, `wdth` 78, `+0.07em`, uppercase,
  `--ink-faint`): field names on a cert label — GLOBAL POSITION, TAG, PW/HP/EV,
  SEASON. The dominant text style in the product by count.
- **Serial** (`.serial`; Azeret Mono, tabular-nums, `ss01`, `-0.02em`): cert
  numbers, ordinals, population denominators, prices, timers, slot numbers.

### The ramp

Seven size tokens in `:root`, and nothing else. No component sets a literal
font-size; the roles above are these tokens wearing their family, width and
weight.

| token | value | where |
|---|---|---|
| `--t-micro` | 0.625rem | `.cert-caps` labels, slot numbers, attribution, badge counts |
| `--t-small` | 0.75rem | meta lines, axis values, actions, chips, drop-down rows, discovery line |
| `--t-label` | 0.8125rem | nav labels, notice body, dedicated-slot titles |
| `--t-base` | 0.9375rem | body, register amount, primary buttons |
| `--t-title` | 1.0625rem | card names, last-stored name, wordmark second line |
| `--t-head` | 1.5rem | the countdown clock and register readout |
| `--t-display` | `clamp(1.5rem, 1.1rem + 1.6vw, 2.125rem)` | page title, one per view |

### Named Rules

**The Width-Not-Weight Rule.** Hierarchy is made with Archivo's width axis first
(62 / 70 / 74 / 76 / 78 / 80 / 84%) and weight second. Do not introduce a second
sans family, and do not reach for a heavier weight where narrowing would do.

**The Machine Figures Rule.** Any number that identifies, counts, or counts down
is Azeret Mono with `tabular-nums`. Any number that is part of a sentence is not.

**The Seven Sizes Rule.** The ramp is seven tokens and a component may not set a
literal font-size. If a new surface seems to need an eighth size, it needs one of
the seven plus a different width or weight. This build once carried nine sizes
across a 0.56–1.06rem band — that is a continuum, not a scale, and it was
consolidated rather than documented.

## Layout

A two-axis app shell: a fixed left nav rail (`--rail-w` 14.5rem, collapsing to
`--rail-w-collapsed` 3.5rem) and a sticky top bar (`--bar-h` 3.25rem), laid out
with CSS grid areas `rail bar / rail main` and a 260ms width transition on
collapse. Below 900px the grid drops to a single column, the rail becomes an
off-canvas drawer at `min(14.5rem, 84vw)` behind a scrim, and the top bar grows a
menu button.

Content is capped at 62rem and centred, with page padding of `1.5rem 1rem 2rem`.
The tray row is a two-column grid — a five-across well grid at `minmax(0, 1fr)`
plus a fixed 11.5rem stack of dedicated boosters — so ten slots wrap as two rows
of five and stay at object scale rather than shrinking to thumbnails.

Spacing is a single eight-step rhythm (`--s-1` 0.25rem through `--s-8` 4.5rem) in
`0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4.5` rem. Gaps below `--s-1` (1px, 2px, 3px)
appear only inside a slab's own internal printing, where they are part of the
label's print rhythm, not of page layout.

**The Object Scale Rule.** A booster slot renders as an object, not a thumbnail. A
tray well holds a 9:16 body; a draft slab holds a 5:8 facedown and a 1:1 card
window. Slots keep their dimensions when assets are missing; they never collapse.

## Elevation & Depth

Hybrid, and the hybrid is the whole material story. Depth comes from two opposite
directions: wells are pressed *into* the counter with an inner shadow, and slabs
sit *on* it with a drop shadow plus a lighter bevel on the top border. There is no
ambient glow anywhere and no blur-based elevation; a hover raises an object by
2–5px and deepens its existing shadow rather than adding a new effect.

### Shadow Vocabulary

- **Slab at rest** (`--shadow-slab`, e.g. `0 1px 2px rgb(0 0 0 / 0.55), 0 5px 16px
  rgb(0 0 0 / 0.55)` in Mocha): every acrylic case, the active nav section, the
  season notice.
- **Slab lifted** (`--shadow-lift`): hover and focus-visible on an openable well or
  facedown card, the notification drop-down, the phone drawer.
- **Well interior** (`--well-inner`, e.g. `inset 0 2px 6px rgb(0 0 0 / 0.8)`): the
  empty tray socket, the Coiniverse register readout, the countdown readout, input
  beds. Anything recessed uses it; nothing else does.

### Named Rules

**The Bevel Rule.** A slab's top border is `--acrylic-bevel` while its other three
are `--acrylic-edge`. That one-sided lighter lip is what makes the case read as
moulded plastic under a light from above; remove it and the slab flattens into a
card.

**The Two-Directions Rule.** Recessed means inner shadow and no border-top bevel.
Raised means drop shadow and a bevel. Never both on one element.

## Shapes

Five radii and no more, all tokenised: hairline `--r-hair` 2px (card window, edge
plate, small tags), field `--r-field` 3px (inputs, action buttons, stamps, small
chips), slab `--slab-radius` 5px (every acrylic case, nav section, notice, panel),
well `--well-radius` 7px (the recessed tray socket, one step softer than the slab
that sits in it), and pill `--r-pill` 999px. Focus rings round at 2px regardless of
what they surround.

**The Pill Has One Job Rule.** `--r-pill` exists for the unread-count badge and the
scrollbar thumb. It is not a general-purpose radius and it is not the shape of a
button, a chip, or a tag — everything in this world is a rectangular object with a
tight corner, and a fully round end is reserved for the two places that are
genuinely not slabs. Off-scale literals (1px, 4px, 6px, 8px) were removed from the
build rather than added to this list; the only remaining literal is the 50% on the
facedown card's circular back-mark, which is a circle, not a radius step.

The recurring silhouette is a vertical case divided by one horizontal hairline:
label plate on top, card window below. That division is what makes a sealed slab
distinguishable from an empty well with colour removed. An Overflow slab adds two
further silhouette cues — a 10px clipped top-right corner and a floating 6px
hologram strip inset from every edge — so all three tray states separate by
outline alone at phone width.

Borders are always 1px and always a token (`--line`, `--line-soft`, `--acrylic-edge`,
`--plate-edge`). Dashed borders carry exactly two meanings: an empty well, and a
provisional state (the list form divider, the sold/listed stamp).

## Components

### Slab Well (tray slot)

The counter socket. A 9:16 recessed well (`--well`, `--well-inner`, 1px
`--line-soft`, 7px radius, 3px padding) holding one of three states, each readable
by silhouette: **empty** switches the border to dashed and shows only its slot
number in serial type plus an optional fill countdown; **sealed** contains an
acrylic slab whose plate is 27% of the body with a hatched blank band — sealed
means ungraded, so no rank colour appears — and a card window inset at 32%/7%/9%;
**overflow** clips its top-right corner by 10px and runs the hologram strip.
Only the leftmost filled well is interactive; it renders as a `<button>`, borders
in accent-mixed edge, and on hover or focus-visible translates `-4px` into
`--shadow-lift` over 240ms.

### Draft Slab (signature component)

The graded card. A flex column inside an acrylic case: grade band, cert line, card
name, origin, position axis, card window, PW/HP/EV stats, discovery line, action
block — each separated by a `--line-soft` hairline. The **grade band** bleeds full
width of the plate, carries `background: var(--rank)` with `color: var(--rank-ink)`,
and holds the RankMark, the rank word in 800-weight tracked caps, and the single
letter code pushed to the right. The **position axis** is a 4px track with a 3px
rank-coloured tick at the card's ordinal and a 1px `--ink-faint` peak marker — a
continuous visible axis, never a badge. Per-card actions (tag, Sell to Council,
List on Market) print onto the lower label; there is no modal.

### RankMark

The non-colour carrier for rank: a 24×16 mono-stroke SVG of six bars in ascending
height, lit to the rank's ladder value (Common 1, Beyond 6) with unlit bars at
0.22 opacity, filled with `currentColor` so it inherits the band ink. Its ink mass
*is* the rank at any size. Always shipped with the grade band, never instead of
the rank word.

### Nav Rail

Each section is a slab seen edge-on: an acrylic row (2.375rem, 5px radius,
bevelled top border) with a 1.875rem light `--plate` edge plate at its left
carrying the icon — the label you read when the case is closed. Hover slides the
row 2px right; the active section slides 5px, takes `--shadow-slab`, borders and
inks in `--accent`, and flips its edge plate to `--accent` / `--accent-ink`.
Collapsed, only the edge plates remain — the rail becomes a row of coloured
spines. Child links are a 1px-ruled indented list. On phone the rail is a drawer
and always shows its labels.

### Top Bar

`--inset` band, sticky, 1px bottom rule. Carries the Coiniverse register readout
(a recessed `--well` pill with inner shadow, amount in 0.9375rem Azeret Mono) and
the bell. The unread-count badge is a filled `--negative` pill carrying
`--negative-ink`. The notification drop-down lands on `--plate` with
`--shadow-lift`, rows divided by `--line-soft` hairlines; because it is plate
stock it carries `.on-plate`, like every other plate in the world.

### Inputs / Fields

Bedded rather than outlined: `--well` background, 1px `--line`, 3px radius, 0.75rem
type, placeholder in `--ink-faint`. Focus is the global ring — 2px `--accent`,
2px offset — not a border shift.

### Buttons

- **Action** (`.act`): a `--well` row with a 1px `--line` border, 3px radius,
  `--t-small`/600 label left and its serial value right; hover moves the border to
  `--accent` over 160ms. Nothing else moves.
- **Confirm**: filled `--accent` with `--accent-ink`, 3px radius, 700 weight. One
  per action group.
- **Stamp** (`.stamp`): not a button — a dashed-border receipt in `--positive` or
  `--accent` marking a completed sell or listing.

### Icons

One authored 16×16 set (`Icon.svelte`): 1.4 stroke, round caps and joins, no
fills, `currentColor`, one hand across all fourteen rail sections. There is no
icon font and no third-party icon package in the build.

### Motion

One authored moment: the label print. On reveal a slab turns in
(`rotate: y -82deg → 0`, 420ms), the grade band floods left-to-right
(`scale: 0 1 → 1 1`, 460ms at 120ms), and cert, name, origin, axis, window,
stats, discovery and actions rise 6px in a 50ms-stepped cascade. Everything uses
`--ease-print` (`cubic-bezier(0.16, 1, 0.3, 1)`) — a hard exponential out, the
motion of a mechanism stopping. Under `prefers-reduced-motion` every duration
collapses to 0.01ms and the label simply lands printed; the hologram sweep and the
window rays stop entirely.

## Do's and Don'ts

### Do:

- **Do** pair every rank colour with its `--rank-<id>-ink`, the RankMark, and the
  spelled rank word. All four travel together.
- **Do** wrap anything printed on a label plate in `.on-plate` and let the ink ramp
  switch itself.
- **Do** use `.cert-caps` for field names and `.serial` for any identifying number;
  those two classes carry most of the product's voice.
- **Do** keep slab chrome thin — the plate near a quarter of the body, the card
  window the majority. The card art is the payload.
- **Do** make every state separable by silhouette before colour: outline, division,
  clipped corner, strip.
- **Do** ship every new filled field with its own ink token in all four themes, in
  the same edit.
- **Do** reach for a token for every size, radius and colour. No component in this
  build sets a literal for any of the three.
- **Do** run `node .impeccable/contrast.mjs` after any palette or component edit
  and require a zero exit.
- **Do** build depth from the two material directions: inner shadow for recessed,
  drop shadow plus top bevel for raised.

### Don't:

- **Don't** set type in a rank colour, or use a rank colour as a border, glow, or
  background tint. One filled field, nothing else.
- **Don't** darken the label plate in a dark theme. It is printed stock in all four.
- **Don't** let a filled field inherit its text colour from the surface behind it,
  and don't paint `--plate` on anything without `.on-plate`.
- **Don't** show rank colour on a sealed slab — sealed means ungraded, and the band
  is hatched blank until the grade prints.
- **Don't** add a second sans family or a display face; hierarchy comes from
  Archivo's width axis.
- **Don't** introduce gradients outside the three hologram stops, and don't use the
  hologram for decoration — it means authenticated-but-ungraded.
- **Don't** add a sixth radius, an eighth type size, a new shadow, or a second
  easing curve. Reach for a token, or consolidate.
- **Don't** put a per-card decision in a modal; actions print onto the lower label.
- **Don't** let a slot shrink to a thumbnail or collapse when its asset is missing.

## Pending, not settled

One detector suppression is recorded in `.impeccable/config.json`:
`design-system-color` on `#000`, which is the opaque stop of the
`mask-image: radial-gradient(...)` on the discovery-aura rays in
`DraftSlab.svelte`. A mask uses only its alpha channel — that colour is never
painted, so it is not a palette value and no token could express it better. The
suppression is scoped to that one value and is not permission to hardcode a
colour anywhere a pixel is actually painted.

Three things in the shipped build are placeholders and must not be inherited as
system decisions:

- `src/lib/data/fixtures.ts` is labelled synthetic demonstration data standing in
  for the BeyondBase backend, which does not exist yet.
- The card window's "unprinted plate" treatment (registration marks plus IMAGE ON
  FILE and the trademark owner line) is a deliberate placeholder for TCG-ingested
  card art, not a permanent component.
- Ten assets are pending commission (`docs/assets/commission-brief.md`). The
  RankMark ladder glyph in particular is a placeholder holding an accessibility
  requirement open; its API — six values, one per rank, square, mono-stroke, in a
  24×16 box — is what is fixed, not the drawing.
