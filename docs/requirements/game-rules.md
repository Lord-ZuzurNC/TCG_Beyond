> TCG Beyond — Game Rules
> Prefix: `GR-*`
> Version: v0.14 — 2026-09-04
> Companion documents: [game-system.md](game-system.md) (GS-*) · [architecture.md](architecture.md) (AC-*)

## Contents

- [Contents](#contents)
- [1. SLM Analysis \& SECCU Scores](#1-slm-analysis--seccu-scores)
- [2. Universal Power Score (UPS)](#2-universal-power-score-ups)
- [3. Original TCG Rarity Weight](#3-original-tcg-rarity-weight)
- [4. Card Stats: PW, HP, EV](#4-card-stats-pw-hp-ev)
- [5. Unique Factor (UF) \& Coiniverse Value (CVS)](#5-unique-factor-uf--coiniverse-value-cvs)
- [6. Rank Determination](#6-rank-determination)
- [7. Rank Escalation Formula](#7-rank-escalation-formula)
- [8. Combat Resolution](#8-combat-resolution)
- [9. Season End Workflow](#9-season-end-workflow)

---

## 1. SLM Analysis & SECCU Scores

- GR-DB-06: A **Small Language Model (SLM)** shall analyse each card's text, mechanics, and the rules of its source TCG to assign five **SECCU** sub-scores:
  - **Synergy (S)** (1–1000) — how strongly the card benefits from or enables interactions with other cards
  - **Economy (E)** (1–1000) — how strongly it generates, saves, accelerates, or manipulates resources
  - **Combat (C)** (1–1000) — how strongly it contributes to direct combat, damage, or board presence
  - **Control (Ctrl)** (1–1000) — how strongly it restricts, removes, or disrupts opponents
  - **Utility (U)** (1–1000) — useful effects that do not fit the above categories
- GR-DB-07: The SECCU total ranges from 5 (min) to 5000 (max). Display divides by 10 rounded up (e.g. a SECCU of 3328 displays as 333).
- GR-DB-08: For each SECCU sub-score the SLM shall produce an individual **confidence rating**. If **any single sub-score's confidence is below 75%**, the entire card evaluation is flagged for **human review** before any scores are committed. Overall average confidence is not sufficient — every sub-score must independently clear the 75% threshold.
- GR-DB-23: Every SLM evaluation run shall record the following **reproducibility fields** alongside its results: Model ID, Model Version, Prompt Version, Evaluation Version, Input Card-Data Version, Timestamp, Confidence (per sub-score and overall), and Human Reviewer (username or `null` if no human review occurred). These fields are stored immutably and are accessible via the Admin Panel SLM review interface.

## 2. Universal Power Score (UPS)

- GR-DB-09: The **UPS** is computed by a weighted sum of SECCU sub-scores using **Archetype Weights (UAW)**:

| Archetype |   S   |   E   |   C   | Ctrl  |   U   |
| --------: | :---: | :---: | :---: | :---: | :---: |
|    Entity | 0.20  | 0.10  | 0.40  | 0.10  | 0.20  |
|     Spell | 0.30  | 0.15  | 0.05  | 0.30  | 0.20  |
|  Resource | 0.10  | 0.50  | 0.00  | 0.10  | 0.30  |
|     Other | 0.20  | 0.20  | 0.20  | 0.20  | 0.20  |

## 3. Original TCG Rarity Weight

- GR-DB-10: Each card's original TCG **Rarity** is mapped to a fixed numeric weight. Example mappings:
  - MTG: Common → 20, Uncommon → 35, Rare → 60, Mythic Rare → 85
  - Pokémon: Common → 20, Uncommon → 35, Rare → 45, Double Rare → 55, Ultra Rare → 65, Illustration Rare → 75, Special Rare → 85, Hyper Rare → 95
  - (Equivalent tables shall be defined for all ingested TCGs.)

## 4. Card Stats: PW, HP, EV

- GR-DB-11: **Power (PW)** is computed per archetype as a weighted combination of **SECCU** sub-scores, **UPS**, and **Rarity weight**:

| Archetype |   S   |   E   |   C   | Ctrl  |   U   |  UPS  | Rarity |
| --------: | :---: | :---: | :---: | :---: | :---: | :---: | :----: |
|    Entity |   -   |   -   | 0.30  |   -   | 0.20  | 0.40  |  0.10  |
|     Spell | 0.25  |   -   |   -   | 0.25  |       | 0.40  |  0.10  |
|  Resource |   -   | 0.25  |   -   |   -   | 0.25  | 0.40  |  0.10  |
|     Other | 0.20  |   -   | 0.20  | 0.20  |   -   | 0.30  |  0.10  |

- GR-DB-12: **Life (HP)** is computed per archetype:

| Archetype |   S   |   E   |   C   | Ctrl  |   U   |  UPS  | Rarity |
| --------: | :---: | :---: | :---: | :---: | :---: | :---: | :----: |
|    Entity | 0.30  |   -   |   -   | 0.20  |   -   | 0.40  |  0.10  |
|     Spell |   -   | 0.25  |   -   |   -   | 0.25  | 0.40  |  0.10  |
|  Resource | 0.25  |   -   |   -   |   -   | 0.25  | 0.40  |  0.10  |
|     Other | 0.20  |   -   |   -   | 0.20  | 0.20  | 0.30  |  0.10  |

- GR-DB-13: **Evasion (EV)** is computed in two steps:

  *Step 1 — EVTemp per archetype:*

| Archetype |   S   |   E   |   C   | Ctrl  |   U   |  UPS  |
| --------: | :---: | :---: | :---: | :---: | :---: | :---: |
|    Entity | 0.30  |   -   |   -   | 0.30  |   -   | 0.40  |
|     Spell |   -   | 0.30  |   -   |   -   | 0.30  | 0.40  |
|  Resource | 0.30  |   -   |   -   | 0.30  |   -   | 0.40  |
|     Other | 0.15  | 0.15  | 0.15  | 0.15  | 0.15  | 0.25  |

  *Step 2 — apply Rank ceiling multiplier:*

| Rank          | EV           |
| ------------- | ------------ |
| Common (C)    | EVTemp × 0.1 |
| Rare (R)      | EVTemp × 0.2 |
| Legendary (L) | EVTemp × 0.3 |
| Mythic (M)    | EVTemp × 0.4 |
| Unique (U)    | EVTemp × 0.5 |
| Beyond (B)    | EVTemp × 0.6 |

- GR-DB-28: **PW** and **HP** values are **integers** (rounded down from their formula result). **EV** is a percentage also truncated to an integer (0–100%). EV is rolled independently on each incoming attack — it is not a fixed state for the duration of a match.

## 5. Unique Factor (UF) & Coiniverse Value (CVS)

- GR-DB-14: Each card definition has a **Unique Factor (UF)** derived deterministically: `UF = DRNG(20, 80, CardDefinitionUID)`.
- GR-DB-15: The **Coiniverse Value Score (CVS)** is the base Coiniverse price used when the Council buys cards from players:

  `CVS = UPS×0.3 + Rarity×0.25 + (10 × log10(1 + MarketPrice))×0.2 + UF×0.25`

  The `MarketPrice` value is a **snapshot** taken from the most recent successful monthly sync. The CVS formula is fully recalculated for every card at each monthly resync using the updated market prices and the current formula version.

## 6. Rank Determination

- GR-DB-16: All Card Definitions are sorted descending by (**UPS**, then **SECCU** total, then **Rarity weight**, then **Card Definition UID**) to produce a **Global Position** for each card (ordinal, Position 1 = highest-scoring card). A card's **Rank** is then derived from the percentile band in which its Global Position falls:

| Rank          | Percentile of card pool |
| ------------- | ----------------------- |
| Beyond (B)    | Top 0.05%               |
| Unique (U)    | Next 0.45% (0.05–0.50%) |
| Mythic (M)    | Next 2.50% (0.50–3.00%) |
| Legendary (L) | Next 6.00% (3.00–9.00%) |
| Rare (R)      | Next 21.0% (9.00–30.0%) |
| Common (C)    | Bottom 70.0%            |

## 7. Rank Escalation Formula

Cards in a booster are generated sequentially (Card 1 → Card 7). The Rank of each successive card is determined by a probability table conditioned on the Rank of the **previous card**. The server selects the target Rank then picks a random card from that Rank uniformly. **Rank assignment is computed at the moment the player opens the booster**, using the rank tables active at that time — not when the booster was generated or queued.

**Cross-Booster & TCG-Booster distribution:**

| Card | Previous Rank |  C%   |  R%   |  L%   |  M%   |  U%   |  B%   |
| ---: | :------------ | :---: | :---: | :---: | :---: | :---: | :---: |
|    1 | —             |  100  |       |       |       |       |       |
|    2 | C             |  70   |  25   |   5   |       |       |       |
|    3 | C             |  70   |  25   |   5   |       |       |       |
|      | R             |       |  70   |  25   |   5   |       |       |
|      | L             |       |       |  65   |  35   |       |       |
|    4 | C             |  70   |  25   |   5   |       |       |       |
|      | R             |       |  70   |  25   |   5   |       |       |
|      | L             |       |       |  65   |  35   |       |       |
|      | M             |       |       |       |  100  |       |       |
|    5 | C             |  70   |  25   |   5   |       |       |       |
|      | R             |       |  70   |  25   |   5   |       |       |
|      | L             |       |       |  70   |  25   |   5   |       |
|      | M             |       |       |       |  65   |  35   |       |
|    6 | C             |  70   |  25   |   5   |       |       |       |
|      | R             |       |  70   |  25   |   5   |       |       |
|      | L             |       |       |  70   |  25   |   5   |       |
|      | M             |       |       |       |  65   |  35   |       |
|      | U             |       |       |       |       |  100  |       |
|    7 | C             |  70   |  25   |   5   |       |       |       |
|      | R             |       |  70   |  25   |   5   |       |       |
|      | L             |       |       |  70   |  25   |   5   |       |
|      | M             |       |       |       |  70   | 29.5  |  0.5  |
|      | U             |       |       |       |       |  95   |   5   |

*Notes: M unlocks at Card 3, U at Card 5, B only possible at Card 7.*

**Overflow-Booster distribution:**

| Card | Previous Rank |  C%   |  R%   |  L%   |  M%   |  U%   |  B%   |
| ---: | :------------ | :---: | :---: | :---: | :---: | :---: | :---: |
|    1 | —             |  100  |       |       |       |       |       |
|    2 | C             |  70   |  25   |   5   |       |       |       |
|    3 | C             |  70   |  25   |   5   |       |       |       |
|      | R             |       |  70   |  25   |   5   |       |       |
|      | L             |       |       |  65   |  35   |       |       |
|    4 | C             |  65   |  30   |   5   |       |       |       |
|      | R             |       |  70   |  25   |   5   |       |       |
|      | L             |       |       |  65   |  30   |   5   |       |
|      | M             |       |       |       |  100  |       |       |
|    5 | C             |  60   |  30   |  10   |       |       |       |
|      | R             |       |  65   |  25   |  10   |       |       |
|      | L             |       |       |  60   |  30   |  10   |       |
|      | M             |       |       |       |  65   |  35   |       |
|    6 | C             |  55   |  35   |  10   |       |       |       |
|      | R             |       |  60   |  30   |  10   |       |       |
|      | L             |       |       |  55   |  35   |  10   |       |
|      | M             |       |       |       |  60   |  40   |       |
|      | U             |       |       |       |       |  100  |       |
|    7 | C             |  50   |  35   |  15   |       |       |       |
|      | R             |       |  50   |  30   |  20   |       |       |
|      | L             |       |       |  50   |  35   |  15   |       |
|      | M             |       |       |       |  59   |  40   |   1   |
|      | U             |       |       |       |       |  94   |   6   |

*Notes: M unlocks at Card 3, U unlocks at Card 4 (one card earlier than Cross), B only possible at Card 7.*

**Rank-Booster distribution:**

|  Card | Rank                                                                  |
| ----: | --------------------------------------------------------------------- |
| 1 & 2 | Fixed to the sacrificed card's Rank                                   |
|     3 | 90% same Rank as sacrificed card; 10% one Rank higher (C→R, R→L, L→M) |

- GR-EXP-20: Each generated card instance receives a unique auto-generated UID. Multiple players may own separate instances of the same card definition; the UID is their only differentiator.
- GR-EXP-21: Opening any booster increments the player's total card count and increments the Discovery Count of each generated card definition.

## 8. Combat Resolution

- GR-JOU-06: At the start of a joute a **coin flip** determines who acts first.
- GR-JOU-07: A player must choose a column (L, C, or R) each turn — **passing is not allowed**.
- GR-JOU-08: Combat sequence for a chosen column:
  1. The attacking card's **PW** is applied as damage to the defending card's current **HP**.
  2. The defending card rolls its **EV** chance. On success, damage is halved (rounded down). On failure, full damage applies.
  3. If the defending card's HP reaches 0 or below, it is eliminated.
- GR-JOU-08a: **Stat visibility** — at the start of a joute, all opponent card stats (PW/HP/EV) are hidden. After the first attack on a given column, both cards involved in that exchange have their PW/HP/EV **permanently revealed** to both players for the remainder of the match. Cards in columns not yet attacked remain hidden.
- GR-JOU-09: When a column's last card is eliminated, the opposing player wins that column. An **emptied column cannot be chosen as the attack target** for the remainder of the match.

## 9. Season End Workflow

- GR-SEA-04: The season end workflow proceeds in fixed stages triggered relative to the admin-set end timestamp:

  | T-offset | Stage                                                                                                                                                                                                                                                                                                                                                                                                                         |
  | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | T−24 h   | **Freeze notice** — a banner appears site-wide announcing the season end time. No new events (WCAT, Council Tournaments) may be created. **No new Market listings may be created.** Existing events and listings continue normally.                                                                                                                                                                                           |
  | T−4 h    | **Event cancel & refund** — all still-active WCAT rounds and Council Tournaments are cancelled. Entrance fees for active WCAT rounds are refunded in full to all participants still in the bracket. **Any Market listing still active at T−4h has its remaining countdown immediately set to 0** (the listing expires instantly: unsold cards are returned to the seller's Museum and escrowed bids are refunded to bidders). |
  | T−1 h    | **Countdown** — a countdown timer is displayed on every page.                                                                                                                                                                                                                                                                                                                                                                 |
  | T=0      | **Maintenance mode** — the game enters a read-only maintenance state. All write operations are rejected.                                                                                                                                                                                                                                                                                                                      |
  | Post-T   | **Snapshot** — a full database snapshot is taken (used as the base for season history and Leaderboard archival).                                                                                                                                                                                                                                                                                                              |
  | Post-T   | **Rewards** — season end rewards (GS-SEA-01) are distributed to eligible players and guilds based on the snapshot.                                                                                                                                                                                                                                                                                                            |
  | Post-T   | **Reset** — season-scoped data is reset: Council Reputation scores → 0 (GR-REP-05), Competitive and Collection scores reset, Lore Shard progress reset.                                                                                                                                                                                                                                                                       |
  | Post-T   | **Sync** — the new season is initialised; the season counter increments; new-season configuration (rewards, WCAT fees, etc.) is applied.                                                                                                                                                                                                                                                                                      |
  | Post-T   | **SLM pass** — the SLM recalculates all card scores for any pending or updated card definitions.                                                                                                                                                                                                                                                                                                                              |
  | Post-T   | **Rank recalculation** — all Card Definition Global Positions and Ranks are recomputed against the full dataset; Peak values are preserved and updated where applicable.                                                                                                                                                                                                                                                      |
  | End      | Maintenance mode lifted; the new season opens.                                                                                                                                                                                                                                                                                                                                                                                |
