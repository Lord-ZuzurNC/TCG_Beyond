# Asset commission brief — Explore, draft and app shell

> Status: open. Nothing in this list exists yet.
> Visual world: **The Graded Slab** (see `.impeccable/surfaces/src-routes-explore-page-svelte.md`).

The build ships with every slot below dimensioned and labelled, so a delivered
asset drops in without a layout change. Two rules apply to all of them:

- **Deliver at 2× the listed CSS box**, or as SVG where the box is small.
- **Isolated ink and objects arrive as PNG with real alpha** (no matte, no
  chroma key), so they sit on the page's own ground across all four themes.

Item 1 is **accessibility-blocking**: until it lands, the shipped ladder glyph
is doing its job, but it is a placeholder holding a WCAG 2.2 AA requirement
open. Everything else is a quality ceiling, not a blocker.

---

## 1. Rank marks — the non-colour carrier ⚠ a11y-blocking

Six marks, one per rank. Rank is fixed by GS-EXP-28 to a colour, and WCAG 2.2 AA
forbids colour as the sole carrier, so these marks are functional, not
decorative. They appear on the grade band, in the tray, in the last-stored strip
and anywhere rank is named.

| | |
|---|---|
| **Box** | 24 × 16 (SVG viewBox), rendered 12–16 px tall |
| **Format** | 6 SVGs, single path each, `currentColor` fill, no hardcoded colour |
| **States** | One per rank: Common, Rare, Legendary, Mythic, Unique, Beyond |
| **Must** | Read as *escalation* — a viewer must see that Beyond outranks Common without reading the word. Distinguishable from each other in pure silhouette at 12 px. |
| **Must not** | Rely on colour, fill density alone, or fine detail below 1 px stroke at 12 px |
| **Replaces** | The six-segment ladder in `src/lib/components/RankMark.svelte`. Keep the 24 × 16 box and the `currentColor` contract and no other change is needed. |

## 2. Card back (GS-EXP-27)

The back of every face-down slab in the draft, and the only thing a player sees
before the first turn. Requirement calls for "a custom design created
specifically for TCG Beyond".

| | |
|---|---|
| **Box** | 5 : 8 portrait. CSS box ≈ 142 × 227 at 1440 desktop, ≈ 173 × 277 at 390 mobile. **Deliver 420 × 672.** |
| **Format** | PNG, opaque (it is printed stock, not a cutout) |
| **States** | 1 base, plus 1 holographic variant for an Overflow-Booster card |
| **Must** | Survive being tiled seven across at 142 px wide without turning to mush; carry the TCG Beyond identity with no third-party IP anywhere in it |
| **Slot** | `.back` in `DraftSlab.svelte` |

## 3. The Mysterious Man (GS-NPC-02)

MM appears on exactly four events and is otherwise never seen. He is a working
title and his face is deliberately unresolved in the lore (GS-NPC-05), so the
brief is presence, not portraiture.

| | |
|---|---|
| **Box** | Up to 640 × 900, transparent |
| **Format** | PNG with alpha, one file per appearance |
| **States** | 4: (1) touching slot 10 as it becomes an Overflow, (2) presenting the three Rank tiers, (3) presenting the TCG list, (4) showing both sides of a completed trade |
| **Must** | Read at 320 px tall on a phone; work on both a Latte and a Mocha ground; stay legible as *a presence* rather than a character portrait |
| **Slot** | Currently the Rank-Booster and TCG-Booster panels present their choices plainly, with a comment marking where he enters |

## 4. Booster slot icons

Three dedicated slot marks, distinct from the ten Cross-Booster wells.

| | |
|---|---|
| **Box** | 32 × 32 SVG |
| **Format** | SVG, 1.4 stroke, round caps — must match `src/lib/components/Icon.svelte` exactly |
| **States** | 3 types (Cross, Rank, TCG) × 2 states (unpaid outline / paid filled) = 6 |
| **Must** | Sit in the same optical size family as the fourteen nav icons |

## 5. Holographic security strip

The carrier for two different meanings: an Overflow-Booster in the tray, and the
Challenger slot-1 glow (GS-EXP-25).

| | |
|---|---|
| **Box** | Tiling strip, 512 × 64, horizontally seamless |
| **Format** | PNG, opaque |
| **States** | 1 texture; the build animates the sweep |
| **Must** | Stay legible as *foil* at 6 px tall — the strip is only ~30 % of a 40 %-height label plate in the tray |
| **Replaces** | The CSS gradient in `SlabWell.svelte` |

## 6. Wordmark

| | |
|---|---|
| **Box** | Two-line lockup, ≈ 180 × 42; also a single-line variant |
| **Format** | SVG, `currentColor` where possible, plus a fixed-colour variant |
| **States** | Full lockup for the expanded rail; a mark-only version ≤ 28 × 28 for the collapsed rail |
| **Must** | "Beyond" carries the weight — it is also the top rank and the endgame title |
| **Slot** | `.wordmark` in `NavRail.svelte` |

## 7. TCG set symbols

| | |
|---|---|
| **Box** | 16 × 16 SVG |
| **Format** | SVG, monochrome, `currentColor` |
| **States** | One per TCG: Magic, Pokémon, Yu-Gi-Oh!, Flesh and Blood, Digimon, Lorcana (Cyberpunk pending a data source per GS-DB-01) |
| **Must** | Be **original marks identifying the source game inside TCG Beyond**, never a reproduction of a publisher's own set symbol or logo. GS-IP-03 forbids implying sponsorship or endorsement. Legal review (GS-IP-04) covers this item. |

## 8. Guild blason kit (AC-UI-34)

| | |
|---|---|
| **Box** | Shapes 128 × 128; icons 64 × 64 |
| **Format** | SVG |
| **States** | ~8 blason shapes × ~24 icons/symbols × the theme-safe colour set |
| **Must** | Compose combinatorially without collision; every icon must read inside every shape |

## 9. Profile frames and name colours (GS-MP-02)

| | |
|---|---|
| **Box** | Frame 256 × 256, transparent centre |
| **Format** | PNG with alpha |
| **States** | 6 frames (Bronze, Silver, Gold, Platinum, Diamond, Beyond) + 6 name colours that must pass 4.5 : 1 against all four theme grounds |
| **Must** | Escalate legibly; the name colours are text, so contrast is a hard gate, not a preference |

## 10. Lore Shard media (GS-LIB-04)

| | |
|---|---|
| **Box** | Full-panel overlay, up to 1600 × 1000 |
| **Format** | Per shard: a static image, an image + written text, or a **silent** video |
| **States** | 13 distinct shards for the Embryon season (6 MP milestones, 2 faction extremes, 4 hidden achievements, 1 Embryonist title) |
| **Must** | Reveal the Council/MM narrative progressively and never explain it outright (GS-NPC-05). Video carries no audio track. |

---

## Not on this list

**Card front art is not a commission.** It arrives from the TCG ingestion
pipeline (GS-DB-02) with its original attribution metadata, and until that
pipeline exists the card window shows an unprinted plate with registration marks
and the publisher's trademark notice (GS-IP-01) rather than a stand-in
illustration.
