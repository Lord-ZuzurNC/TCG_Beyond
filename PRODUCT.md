# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

- **Client:** SvelteKit (TypeScript). Chosen for the smallest runtime and the strongest
  animation/transition primitives, which the booster draft (seven sequential card flips,
  rank auras, discovery aura, Mysterious Man appearances) leans on heavily, while still
  serving the dense app surfaces — a 50-card paginated Museum grid, WCAT brackets and a
  19-route Admin Panel.
- **Backend:** **BeyondBase** (`~/Lab/BeyondBase`), a custom Backend-as-a-Service built
  only for this game — Rust + PostgreSQL, a single self-hosted binary. TCG Beyond is its
  only consumer. Auth, sessions, idempotent events, the Economy Ledger, audit domains,
  the configuration layer and TCG ingestion plugins all live there and are never
  re-implemented in this repo.
- **Still open:** rendering strategy per route (SSR vs client-only), i18n library, state
  layer, styling approach, and deploy target. These get decided in `docs/decisions/`.

## Users

- **Primary: the collector-player.** Someone who likes opening packs across *several*
  trading card games and has no single place to do it. Their session shape is dictated by
  a 15-minute booster timer (12 for Challengers): short, frequent check-ins to open what
  accumulated, punctuated by longer sessions for Museum organisation, Market bidding,
  Joute and Guild activity. A ten-slot stack means roughly 2.5 hours of absence before
  they start losing timer value — the game is built to be returned to, not sat in.
- **Secondary: the competitor.** Plays Joute and WCAT, tracks the Competitive
  leaderboard (PLS), cares about PW/HP/EV and deck composition more than completion.
- **Secondary: the completionist.** Chases the Global Archive, first-discovery records,
  achievements, Mastery Points and the hidden Lore Shard layer. Tracked separately by the
  Collection leaderboard (CS).
- **Challenger** is a subscription state, not a distinct audience — any of the above may
  hold it (GS-CHL-01).
- **Admins** are players who additionally hold one of five admin roles (GS-AUTH-06). They
  operate the *game* from the in-app `/admin` panel: events, Council, seasons, players,
  moderation, appeals, announcements, SLM review. Platform operation is a different
  surface entirely and lives in BeyondBase's console.

## Product Purpose

TCG Beyond is a web game where players open boosters drawn from **every** trading card
game at once — Magic: The Gathering, Pokémon, Yu-Gi-Oh!, Flesh and Blood, Digimon,
Lorcana and more — and collect, value, trade and battle those cards in one shared
universe with one shared currency and one shared power scale.

Success means a player can pull a Pokémon card and a Magic card from the same pack, see
both scored on the same axes, and trade one for the other at a price both sides
understand.

## Positioning

Every TCG has its own app. TCG Beyond's mechanism is the layer *above* them:

- **One universal scale across incompatible games.** An SLM reads each card against its
  own game's official rules text and scores it on five sub-stats (SECCU: Synergy,
  Economy, Combat, Control, Utility). Those produce a Universal Power Score, a Global
  Position across the entire multi-TCG database, and from that percentile a TCG Beyond
  **Rank** — Common, Rare, Legendary, Mythic, Unique, Beyond. A Pokémon card and a
  Yu-Gi-Oh! card become directly comparable, which no single-TCG product can do.
- **One currency, one market.** Coiniverse prices every card via CVS regardless of its
  source game, so a cross-TCG market and cross-TCG trades actually clear.
- **Cards fight each other across games.** Every card gets PW / HP / EV, so a Lorcana
  card can duel a Flesh and Blood card in a Joute.
- **A hidden narrative layer.** The Council and the Mysterious Man are opposing factions;
  ordinary economic choices (selling to the Council, sacrificing a card to MM for a
  Rank-Booster) silently move a private Council Reputation score, which gates faction
  Lore Shards. The game has a story most players will not notice they are inside.
- **The card database is permanent.** A Card Definition is never removed (GS-DB-27).
  Cards retired from their source game, or from a discontinued TCG, keep existing in
  player Museums. TCG Beyond outlives its sources.

## Operating Context

- **Genuinely co-equal desktop, tablet and phone** (AC-UI-07), with both mouse and touch.
  Neither leads: the 15-minute timer makes phone the natural check-in device, while the
  Museum grid, WCAT bracket and Admin Panel are dense desktop work. Every surface is
  designed at full quality for both — there is no fallback posture.
- **Sessions are short and timer-driven.** Open what is waiting, decide per card
  (Museum / sell to Council / list on Market), leave. The draft flow is the single most
  repeated experience in the product and survives reload and session timeout without
  card loss (GS-EXP-31).
- **Rhythms the product runs on:** a 15-minute booster timer, a 6-hour Challenger
  Overflow timer, a 24-hour free TCG-Booster, daily Joute/WCAT limits, a monthly card
  database resync, and admin-declared seasons of at least 30 days that trigger rank
  recalculation, snapshots and reward distribution.
- **Real-time is tiered, not uniform:** WebSocket only on Market listing pages,
  ≤5 s polling in Joute/WCAT matches, ≤30 s polling for chat and the notification bell
  (AC-RT-01/02/03).
- **14 player sections plus Admin**, in a fixed navigation order (AC-UI-04), behind a
  full-height collapsible left panel and a persistent top bar carrying Coiniverse
  balance and the notification bell.

## Capabilities and Constraints

- **Authority:** `docs/requirements/game-system.md` (GS-*), `game-rules.md` (GR-*) and
  `architecture.md` (AC-*) are product truth — currently v0.14, 2026-09-04. They are
  never silently reinterpreted. `CLAUDE.md` holds the authority order and the
  non-negotiable invariants.
- **Boosters:** Cross-Booster (free, timer, 10 slots, 7 cards), Overflow-Booster (higher
  odds, one at a time), TCG-Booster (paid, single-TCG, 1 000 Coiniverse base),
  Rank-Booster (sacrifice a card, 3 cards, 10 % upgrade chance on card 3), Event-Booster
  (admin), Season Reward Booster (season-end only).
- **Collection:** Museum with tags, doublon filter and 50-per-page grid; Global Archive
  where undiscovered cards are silhouettes until globally first-discovered; per-card
  Nerd Stats exposing the entire computation chain; rank/position history graphs across
  seasons.
- **Economy:** Coiniverse is a **non-negative integer** — floating point is forbidden and
  fractional results truncate down (AC-DEV-03). 5 % Council commission on market sales,
  5 % Council share of WCAT prize pools. The Economy Ledger is immutable and append-only,
  a new file each month, invisible to players entirely.
- **Social and competitive:** friends, invitation-only guilds with levels/EXP/bank/shared
  9-card deck, private and global chat, trades with counter-offer chains, Market
  auctions, Joute (vs friend/guild, vs random, vs Council, WCAT 16-player knockout,
  Guild WCAT), two leaderboards (Competitive PLS, Collection CS) each with Season and
  Lifetime views.
- **Progression:** achievements → Mastery Points (lifetime, never spent) → cosmetic
  frames, name colours and titles; Council Reputation (−50…+60, private, season-reset,
  locked at either extreme); 13 Embryon Lore Shards of which at most 12 are obtainable
  in one season, read in the Library — a nav entry that does not exist until the first
  shard is unlocked.
- **Hard rules:** the client is never authoritative (AC-SEC-06/07). Museum mutations are
  atomic (AC-SEC-08). Every player-state mutation is an idempotent event with a unique
  UID; a duplicate logs `SKIPPED — already processed` (AC-DEV-05). Scoring formulas are
  versioned and stored values retain the version that produced them (AC-DEV-04). Anything
  that may change over time comes from the configuration layer, never hardcoded
  (GS-DEV-01). Each TCG is an independent ingestion plugin (AC-DEV-02/GS-DB-21). Hiding
  admin UI is never authorization. Historical data is never destroyed.
- **Terminology is fixed and non-obvious:** Museum, Global Archive, Joute, WCAT,
  Coiniverse, Challenger, Council, Card Definition vs Card Instance, Global Position,
  Rank vs Rarity, SECCU, UPS, UF, CVS, PW/HP/EV, Lore Shard, MM Assets. Card Definition
  and Card Instance are distinct concepts and are never merged.
- **Explicitly undecided:** the Cyberpunk TCG data source (GS-DB-01/03 mark it TBD);
  the Mysterious Man's real name ("Mysterious Man" is a working title); the per-
  sub-section admin access matrix beyond the minimum in AC-ADMIN-04; the Challenger
  subscription price and payment platform.

## Brand Commitments

- The name is **TCG Beyond** (repo `TCG_Beyond`). **Beyond** is also the top card Rank
  and the endgame title "Beyond Human" — the word carries the product's whole ambition
  and is not decorative.
- **GPLv3**, free and open source.
- The README carries the **KeepAndroidOpen** caution banner.
- **Four Catppuccin themes** — Latte (light), Frappé, Macchiato, Mocha (**default**).
  Colour tokens adapt per theme (AC-UI-06).
- **Rank colours are fixed by requirement** and are game grammar, not styling choices:
  Common green · Rare blue · Legendary yellow · Mythic orange · Unique red · Beyond
  purple (GS-EXP-28). They appear as card auras and as text colour in trade lists.
- **Third-party IP is attributed, never appropriated.** Every card view displays the
  publisher's trademark and copyright notice; source attribution metadata is retained;
  TCG Beyond never implies sponsorship or endorsement by any TCG publisher (GS-IP-01…04).
- Voice: sparse and withholding where the lore speaks. The Mysterious Man says things
  like *"Interesting choice."* and *"The Council is watching."* — never explanation.
  The faction narrative is never announced, only discovered (GS-NPC-05).

## Evidence on Hand

- **Requirements:** `docs/requirements/{game-system,game-rules,architecture}.md` — 1 690
  lines of numbered, versioned requirements. This is the substantial asset.
- **Backend product record:** `~/Lab/BeyondBase/PRODUCT.md`, `~/Lab/BeyondBase/DESIGN.md`
  and `~/Lab/BeyondBase/docs/decisions/` (ADR-0001 relay node state, ADR-0002
  node-to-main transport, ADR-0003 console operator identity).
- **No code exists.** `src/` and `tests/` are empty directories.
- **No visual assets exist.** No logo or wordmark, no card back art (GS-EXP-27 requires a
  custom one), no Mysterious Man character design, no booster slot icons, no blason
  components, no profile frames. All of it is to be created.
- **No players, no cards ingested, no metrics, no revenue, no legal review.** GS-IP-04
  requires legal counsel approval of third-party IP usage *before* public release; that
  has not happened. Never invent adoption figures, card counts, performance numbers,
  testimonials or competitor comparisons.

## Product Principles

1. **One universe, many games.** Every card from every TCG is scored, priced and fought
   on the same scale. Anything that reintroduces per-game silos works against the
   product's only real reason to exist.
2. **The server decides; the client displays.** Rewards, ownership, values, booster
   results, randomness and combat outcomes are server truth. Client state is a display
   cache and nothing more.
3. **The draft is the product.** Opening a booster is the most repeated moment in the
   game. It deserves more craft than any other surface, and it must never lose a card.
4. **Nothing is destroyed.** Card Definitions, ledger entries, season snapshots and rank
   history are permanent. The product accumulates; it does not prune.
5. **The story is discovered, not told.** The Council/MM conflict, Council Reputation and
   the Lore Shards reward players who look. They never interrupt players who do not.

## Accessibility & Inclusion

- **WCAG 2.2 AA**, matching BeyondBase and the EU Accessibility Act baseline that applies
  to selling Challenger subscriptions to EU consumers.
- Semantic HTML, ARIA where semantics fall short, full keyboard operation and visible
  focus throughout (AC-UI-08).
- **Rank must never be conveyed by colour alone.** The six rank colours are the
  product's densest use of colour as meaning; every rank aura, trade-list entry and
  market card needs a text or shape carrier alongside it. The same applies to trade
  Accept/Modify/Cancel (green/yellow/red) and to Market History's red-loss/green-gain.
- Undiscovered Global Archive cards are silhouettes with no accessible name to leak —
  their announced state must convey "undiscovered" without revealing the card.
- Timers, live Market bid updates and Joute turn changes are dynamic content that must be
  announced to assistive technology without flooding it.
- **Internationalization from day one** (GS-I18N-02): English, French, Spanish, German,
  Italian and Portuguese prioritised at launch, with more added later and no
  architectural change required. Language is persisted per account.
