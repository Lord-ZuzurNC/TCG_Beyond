> TCG Beyond — Game System Specification
> Prefix: `GS-*`
> Version: v0.14 — 2026-09-04
> Companion documents: [game-rules.md](game-rules.md) (GR-*) · [architecture.md](architecture.md) (AC-*)

## Contents

- [Contents](#contents)
- [1. Glossary](#1-glossary)
- [2. Card Database](#2-card-database)
  - [2.1 Ingestion](#21-ingestion)
  - [2.2 Card Archetypes](#22-card-archetypes)
  - [2.9 Season System](#29-season-system)
  - [2.10 Card Definition and Card Instance](#210-card-definition-and-card-instance)
- [3. Player Accounts](#3-player-accounts)
  - [3.1 Registration \& Authentication](#31-registration--authentication)
  - [3.2 Player Record](#32-player-record)
  - [3.3 Admin Roles](#33-admin-roles)
  - [3.4 Account Workflow](#34-account-workflow)
  - [3.5 Session Management](#35-session-management)
  - [3.6 Account Deletion During Active Events](#36-account-deletion-during-active-events)
- [4. Exploration (Booster System)](#4-exploration-booster-system)
  - [4.1 Cross-Booster (Standard)](#41-cross-booster-standard)
  - [4.2 Overflow-Booster](#42-overflow-booster)
  - [4.3 TCG-Booster](#43-tcg-booster)
  - [4.4 Rank-Booster](#44-rank-booster)
  - [4.5 Event-Booster](#45-event-booster)
  - [4.6 Season Reward Booster](#46-season-reward-booster)
  - [4.8 Booster Stack UI](#48-booster-stack-ui)
  - [4.9 Drafting Experience](#49-drafting-experience)
- [5. Museum](#5-museum)
  - [5.1 Own Collection](#51-own-collection)
  - [5.2 Global Archive](#52-global-archive)
  - [5.3 Card Tagging](#53-card-tagging)
- [6. Market](#6-market)
  - [6.1 Listing a Card](#61-listing-a-card)
  - [6.2 Bidding](#62-bidding)
  - [6.3 Selling to the Council](#63-selling-to-the-council)
  - [6.4 Trade Commission](#64-trade-commission)
  - [6.5 Market History](#65-market-history)
  - [6.6 Anti-Manipulation Rules](#66-anti-manipulation-rules)
- [7. Friends](#7-friends)
- [8. Exchange](#8-exchange)
- [9. Guild](#9-guild)
  - [9.1 Membership](#91-membership)
  - [9.2 Role Permissions](#92-role-permissions)
  - [9.3 Guild Progression](#93-guild-progression)
  - [9.4 Guild Stats](#94-guild-stats)
  - [9.5 Guild Bank](#95-guild-bank)
  - [9.6 Guild Deck](#96-guild-deck)
  - [9.7 Guild Dissolution](#97-guild-dissolution)
- [10. Joute (Battle)](#10-joute-battle)
  - [10.1 Deck](#101-deck)
  - [10.2 Turn Timer \& Idle Rules](#102-turn-timer--idle-rules)
  - [10.3 Mode: vs Friend / Guild Member](#103-mode-vs-friend--guild-member)
  - [10.4 Mode: vs Random Player (Single Duel)](#104-mode-vs-random-player-single-duel)
  - [10.5 Mode: WCAT Tournament](#105-mode-wcat-tournament)
  - [10.6 Mode: vs Council](#106-mode-vs-council)
  - [10.7 Daily Limits](#107-daily-limits)
  - [10.8 Mode: Guild WCAT](#108-mode-guild-wcat)
- [11. Chat](#11-chat)
- [12. Achievements (Successes)](#12-achievements-successes)
- [13. Leaderboard](#13-leaderboard)
  - [13.1 Active Player Requirement](#131-active-player-requirement)
  - [13.2 Competitive Leaderboard (PLS)](#132-competitive-leaderboard-pls)
  - [13.3 Collection Leaderboard](#133-collection-leaderboard)
  - [13.4 Guild Leaderboard](#134-guild-leaderboard)
  - [13.5 Personal Leaderboard History](#135-personal-leaderboard-history)
- [14. Profile](#14-profile)
- [15. Settings](#15-settings)
- [16. Challenger Subscription](#16-challenger-subscription)
- [17. Council](#17-council)
- [18. Internationalization](#18-internationalization)
- [19. Trademark \& Intellectual Property](#19-trademark--intellectual-property)
- [20. Tutorial](#20-tutorial)
- [21. Season End Rewards](#21-season-end-rewards)
- [22. Mastery Points (MP)](#22-mastery-points-mp)
- [23. Council Reputation](#23-council-reputation)
- [24. Mysterious Man](#24-mysterious-man)
- [25. Lore System](#25-lore-system)
- [26. Library](#26-library)


NOTE:
- Card Database *(behavioral rules; formulas in game-rules.md §2.3–§2.8)*
- Exploration *(rank escalation formula in game-rules.md §4.7)*
- Joute *(combat resolution in game-rules.md §10.2)*
- Season End Rewards *(season end workflow in game-rules.md §24.1)*

---

## 1. Glossary

|                   Term | Definition                                                                                                                                                                                                                                                                                                                   |
| ---------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|             **Museum** | A player's personal card collection                                                                                                                                                                                                                                                                                          |
|     **Global Archive** | Read-only view of all cards ever discovered across all players                                                                                                                                                                                                                                                               |
|              **Joute** | A card battle between two parties                                                                                                                                                                                                                                                                                            |
|               **WCAT** | World Card Arts Tournament — a paid 16-player knockout tournament                                                                                                                                                                                                                                                            |
|         **Coiniverse** | The app's virtual currency                                                                                                                                                                                                                                                                                                   |
|         **Challenger** | A player with an active monthly subscription                                                                                                                                                                                                                                                                                 |
|            **Council** | The admin-controlled entity acting as PvE opponent and market regulator                                                                                                                                                                                                                                                      |
|       **Council Bank** | The Council's Coiniverse reserve, funded by trade commissions                                                                                                                                                                                                                                                                |
|     **Council Museum** | Cards collected by the Council via PvE wins and direct player sales                                                                                                                                                                                                                                                          |
|    **Card Definition** | A season-immutable global card identity comprising a card's name, TCG name, set name, image, and all computed attributes (Archetype, SECCU, UPS, CVS, PW, HP, EV, Rank, UF). Multiple Card Instances may reference a single Card Definition.                                                                                 |
|      **Card Instance** | An individual virtual copy of a Card Definition, owned by a player, guild, or the Council. Identified by a unique auto-generated UID. Card Instances are the atomic units of ownership and trade.                                                                                                                            |
|    **Global Position** | A card's ordinal rank among all Card Definitions in the database, sorted descending by (UPS, SECCU total, MarketPrice, Rarity weight). Position 1 is the highest-scoring card. A card's Rank tier is derived from the percentile band in which its Global Position falls.                                                    |
|               **Rank** | TCG Beyond's rarity tier for a card, derived from its Global Position percentile: C → R → L → M → U → B                                                                                                                                                                                                                      |
|             **Rarity** | The original TCG rarity of a card (e.g. MTG Mythic Rare, Pokémon Ultra Rare)                                                                                                                                                                                                                                                 |
|          **Archetype** | One of four card role categories: Entity, Spell, Resource, Other                                                                                                                                                                                                                                                             |
|              **SECCU** | Five internal sub-stats: Synergy (S), Economy (E), Combat (C), Control (Ctrl), Utility (U)                                                                                                                                                                                                                                   |
|                **UPS** | Universal Power Score — weighted sum of SECCU per archetype                                                                                                                                                                                                                                                                  |
|                 **UF** | Unique Factor — a deterministic pseudo-random modifier per card definition                                                                                                                                                                                                                                                   |
|                **CVS** | Coiniverse Value Score — the base Coiniverse price of a card                                                                                                                                                                                                                                                                 |
|                 **PW** | Power — a card's maximum damage output per attack                                                                                                                                                                                                                                                                            |
|                 **HP** | Life — total damage a card can absorb before elimination                                                                                                                                                                                                                                                                     |
|                 **EV** | Evasion — percentage chance to halve incoming damage; capped by Rank                                                                                                                                                                                                                                                         |
|             **Season** | An admin-defined period; season change triggers rank recalculation and snapshot                                                                                                                                                                                                                                              |
|      **Cross-Booster** | The standard free booster earned by timer                                                                                                                                                                                                                                                                                    |
|   **Overflow-Booster** | A Cross-Booster transformed to higher odds when the 11th timer completes                                                                                                                                                                                                                                                     |
|        **TCG-Booster** | A paid booster containing cards from a single TCG                                                                                                                                                                                                                                                                            |
|       **Rank-Booster** | A booster opened by sacrificing a card; produces controlled-rank output                                                                                                                                                                                                                                                      |
|      **Event-Booster** | An admin-configured booster distributed during special events                                                                                                                                                                                                                                                                |
|         **Guild Deck** | A guild's single shared 9-card deck, usable in admin events                                                                                                                                                                                                                                                                  |
|         **Guild Bank** | A guild's shared Coiniverse reserve, funded by member deposits                                                                                                                                                                                                                                                               |
|                 **MP** | Mastery Points — a lifetime score earned by completing achievements; unlocks cosmetics                                                                                                                                                                                                                                       |
| **Council Reputation** | A personal score (−50 to +60) tracking a player's alignment with the Council                                                                                                                                                                                                                                                 |
|     **Mysterious Man** | A sparsely speaking NPC appearing during certain player actions; tied to the game's lore. "Mysterious Man" is a working title — a proper name may be assigned in a future update                                                                                                                                             |
|          **MM Assets** | The Mysterious Man's private reserve of cards and Coiniverse, accumulated through player card sacrifices and booster purchases. Never visible to players; accessible to admins via /admin/mm                                                                                                                                 |
|         **Lore Shard** | A collectible narrative fragment unlocking part of the TCG Beyond universe story. Named after the active Lore Season; in the first season ("Embryon") regular shards are **Embryon Lore Shards**, the MM-faction shard is the **MM Embryon Lore Shard**, and the Council-faction shard is the **Council Embryon Lore Shard** |
|       **Hidden Title** | A cosmetic title that does not appear on the achievement list until it is unlocked                                                                                                                                                                                                                                           |

## 2. Card Database

### 2.1 Ingestion

- GS-DB-01: The system shall ingest card data for the following TCGs in v1: **Magic: The Gathering**, **Pokémon**, **Yu-Gi-Oh!**, **Flesh and Blood**, **Digimon**, **Lorcana**, and **Cyberpunk** (if a usable data source is available).
- GS-DB-02: For each card the system shall store: TCG name, card name, set/edition name, card image, external source URL, and trademark/copyright owner.
- GS-DB-03: Card databases shall be resynced **monthly**. Data source priority: (1) official dedicated TCG API, (2) APITCG.com, (3) TCGPlayer API (if access is granted). Known preferred sources per TCG:
  - Magic: The Gathering → Scryfall API
  - Pokémon → TCGdex API
  - Yu-Gi-Oh! → YGOProDeck API
  - Flesh and Blood → `the-fab-cube/flesh-and-blood-cards` GitHub repository
  - Digimon → digimoncard.io API
  - Lorcana → lorcana-api.com
  - Cyberpunk → TBD
- GS-DB-04: The trademark/copyright owner shall be derived from the TCG name and displayed on every card view.
- GS-DB-21: Each TCG data source and its ingestion pipeline shall be implemented as an **independent plugin module**. Adding a new TCG requires only adding a new plugin; no modifications to the core ingestion logic are permitted.
- GS-DB-22: If a data source is unavailable during a scheduled monthly sync, the system shall **alert admins** and **skip that TCG's sync cycle** without halting the sync of other TCGs. The most recently synced data for that TCG is retained with its timestamp until the next successful resync.
- GS-DB-26: During ingestion, the system shall also fetch and store the **official game rules** for each TCG. This rules text is consumed by the SLM (see §2.3) to evaluate card mechanics in context; it is a backend resource only and is never displayed to players.
- GS-DB-27: Once ingested, a Card Definition is **never removed** from the database. If a card is retired from its source TCG, if the source fails to include it in future syncs, or if a TCG is discontinued, the card remains in the TCG Beyond database and continues to exist in player Museums unaffected.

### 2.2 Card Archetypes

- GS-DB-05: Each card shall be assigned exactly one of four **Archetypes** by the SLM (see §2.3):
  - **Entity** — creatures, Pokémon, monsters, heroes, or anything representing a character
  - **Spell** — action cards that do not remain on the board (instants, sorceries, trainers, traps, events)
  - **Resource** — cards that generate or manage resources (lands, energies, locations)
  - **Other** — cards that fit no other category (enchantments, vanguard cards, etc.)

### 2.9 Season System

- GS-DB-17: Rank recalculation occurs only during a **season change**, which is declared arbitrarily by admins/developers.
- GS-DB-18: At each season change, a **snapshot** of all card ranks and positions is persisted. No historical data is lost.
- GS-DB-19: Players and the community are notified in advance of incoming TCG/set ingestions and of imminent rank promotions or demotions.
- GS-DB-20: Cards that have existed across more than one season shall display: **Global Position**, **Global Rank**, **Peak Position**, **Peak Rank**, and a **line graph** (left Y-axis = position, right Y-axis = Rank, X-axis = season) showing rank and position history.

### 2.10 Card Definition and Card Instance

- GS-DB-24: The data model shall maintain a strict distinction between:
  - **Card Definition** — the immutable-identity global card record. Fully immutable fields: UID, card name, TCG name, set name, card image, Archetype, UF. Season-recalculated fields: SECCU, UPS, CVS, PW, HP, EV, Rank, Global Position. Multiple Card Instances may reference a single Card Definition.
  - **Card Instance** — an individual virtual copy owning only instance-specific state.

- GS-DB-25: **Global Position and Rank are Card Definition–level attributes**, not instance-level. Global Position is ordered ascending: #1 is the highest-scoring card, #N is the lowest. Every Card Definition holds:
  - Current Global Position and Current Rank
  - Peak Global Position and Peak Rank (best values across all seasons)
  - Per-season history (for the line graph — see GS-DB-20)
  - Global first-discovery record: Discoverer player username and UTC discovery timestamp

- GS-DB-26b: Every **Card Instance** shall store only instance-specific fields:

  | Field                   | Description                                                              |
  | :---------------------- | :----------------------------------------------------------------------- |
  | Instance UID            | Unique auto-generated identifier for this copy                           |
  | Card Definition ID      | Reference to the shared Card Definition record                           |
  | Owner ID                | UID of the current owner (player, guild, Council, or MM)                 |
  | Acquisition Timestamp   | UTC timestamp when this instance was opened from a booster               |
  | Global Position at acq. | Card Definition's Global Position at the moment this instance was opened |
  | Rank at acq.            | Card Definition's Rank at the moment this instance was opened            |

## 3. Player Accounts

### 3.1 Registration & Authentication

- GS-AUTH-01: A player shall register with: username, email address, and password.
- GS-AUTH-02: Passwords shall **never be stored in reversible form**. They shall be stored using an **adaptive password hashing scheme** (e.g. bcrypt or Argon2). Email addresses and subscription status shall be stored encrypted at rest. TCG Beyond **does not store payment method details** — payment method data is held exclusively by the payment platform; TCG Beyond stores only the name of the payment platform chosen by the player.
- GS-AUTH-03: All data in transit shall use encrypted channels (TLS).
- GS-AUTH-04: All authenticated API endpoints shall validate a secure token on every request.
- GS-AUTH-05: The system shall support login and logout.

### 3.2 Player Record

- GS-PLAYER-01: Each player account shall store: username, email (encrypted), password (hashed), chosen payment platform name, subscription status (encrypted), total card count, card collection (Museum), Coiniverse balance.
- GS-PLAYER-02: A player may change their username at most once every 30 days.
- GS-PLAYER-03: An account is considered **active** as long as it has had at least one valid web session within the last 6 months. After 6 months of inactivity all cards are transferred to the Council Museum and all player data is permanently deleted.
- GS-PLAYER-04: Players may opt in to receive an **email warning** before auto-deletion (opt-in is enabled by default in Settings). If disabled, no warning is sent.
- GS-PLAYER-05: A player may manually delete their account from the Danger Zone in Settings; all their cards transfer to the Council Museum and all personal data is purged immediately.

### 3.3 Admin Roles

- GS-AUTH-06: An account may be assigned at most one **Admin role** in addition to being a normal player account. Admin roles determine access to the Admin Panel (§34) and to Audit Logs (§33). The five Admin roles are:

  | Role        | Description                                                                                     |
  | :---------- | :---------------------------------------------------------------------------------------------- |
  | Owner       | Unrestricted access to all Admin Panel sections, all logs, and the Economy Ledger               |
  | Developer   | Access to Ledger, In-Game Log, Admin Action Log, and Server Log                                 |
  | Super Admin | Access to Ledger, In-Game Log, and Admin Action Log; full Admin Panel operational access        |
  | Support     | Access to Ledger, In-Game Log, and Subscription & Payment Log; player account lookup only       |
  | Moderator   | Access to In-Game Log (including chat moderation records); chat moderation tools in Admin Panel |

- GS-AUTH-07: Admin roles are assigned and revoked by the Owner through the Admin Panel. A player account with no admin role assigned is a standard player with no access to any Admin Panel section.

### 3.4 Account Workflow

- GS-AUTH-08: **Email verification at registration** — after a player submits the registration form, a verification code is sent to the provided email address. Account activation is blocked until the code is submitted.
- GS-AUTH-09: **Forgot password** — a player may request a password reset by providing their registered email address. A reset link is sent to that address. The reset link is single-use and expires after a short window (defined in the tech-stack specification).
- GS-AUTH-10: **Change password** — from Settings, a player may change their password. The system sends a verification code to the account's email; the player must submit the code before the new password is accepted. On successful change, all existing sessions for that account are invalidated.
- GS-AUTH-11: **Change email** — from Settings, a player may request an email change. The system sends a verification code to both the current email address and the new email address. The change is accepted only when both codes are submitted. If the current email is no longer accessible, the player must contact Support.

### 3.5 Session Management

- GS-AUTH-12: Access tokens expire after **30 minutes** of inactivity.
- GS-AUTH-13: When an access token expires, a **refresh token** is issued. Refresh tokens are rotated on each use (single-use).
- GS-AUTH-14: **Concurrent sessions** are permitted. A player may be logged in on multiple devices simultaneously (e.g. PC and smartphone).
- GS-AUTH-15: A player may **log out from all devices** from Settings. This immediately invalidates all access and refresh tokens associated with their account.
- GS-AUTH-16: A password change (GS-AUTH-10) automatically invalidates all active sessions across all devices.

### 3.6 Account Deletion During Active Events

- GS-PLAYER-06: When a player's account is deleted (manually or via auto-deletion) and they have active events in progress, the following rules apply:
  - **Market — active listing**: the listing continues until its natural expiry (GS-MKT-16).
  - **Market — active bid**: the bid is immediately cancelled; the escrowed Coiniverse is removed from circulation; the next-highest bidder becomes the new leading bidder.
  - **Pending trade**: the trade proposition is immediately cancelled; any locked items are released to their respective owners' Museums.
  - **Active Joute**: the Joute ends immediately with **no winner** for either side. No cards are transferred and no penalties are applied.
  - **Active WCAT**: the player is immediately **disqualified** and forfeits their current round. Their opponent advances by default.
  - **Guild membership**: the player is automatically removed from their guild. If the deleted account was the Guild Leader, the guild is dissolved (see §9.7).

## 4. Exploration (Booster System)

### 4.1 Cross-Booster (Standard)

- GS-EXP-01: Each player has a **15-minute** countdown timer (12 minutes for Challengers). When the timer reaches 0 it fills the next empty booster slot (1 → 10 in order) and resets.
- GS-EXP-02: The booster stack has **10 slots**. Boosters fill from slot 1 to slot 10. Players open boosters starting from slot 1.
- GS-EXP-03: Once slot 10 is filled, an **11th timer** of 15 minutes (12 min for Challengers) starts. If the 11th timer completes while all 10 slots are still full, the booster in slot 10 is transformed into an **Overflow-Booster**.
- GS-EXP-04: If a player opens any booster before the 11th timer completes, the timer will fill that freed slot instead of transforming slot 10. All 10 slots must remain full for the transformation to occur.
- GS-EXP-05: Once slot 10 holds an Overflow-Booster and all 10 slots are full, all timers pause until the player opens at least one booster.
- GS-EXP-06: An Overflow-Booster in slot 10 persists through any partial openings; it remains until the player opens it specifically.

### 4.2 Overflow-Booster

- GS-EXP-07: An Overflow-Booster contains **7 cards** and uses a higher-probability rank distribution (see §4.6).
- GS-EXP-08: Only one Overflow-Booster can exist in a player's stack at a time.
- GS-EXP-09: **Challenger bonus**: an independent **6-hour countdown timer** runs alongside the normal booster timer. When it reaches 0, **slot 1 begins to glow** (same shiny visual as an Overflow-Booster slot 10). The timer then pauses. The glow persists on slot 1 whether the slot is empty or filled. The **next time the player opens the slot 1 booster**, it is delivered as an **Overflow-Booster**. After the player opens it, the glow clears and the 6-hour timer restarts from 0.

### 4.3 TCG-Booster

- GS-EXP-10: Each TCG has its own **TCG-Booster**; all 7 cards come from that TCG only.
- GS-EXP-11: TCG-Boosters are purchased individually with Coiniverse at a **starting price of 1 000 Coiniverse per booster** (admin-configurable). They cannot be stacked; each must be paid and opened one at a time.
- GS-EXP-12: The Coiniverse spent on a TCG-Booster goes entirely to **MM Assets** (not the Council Bank).
- GS-EXP-13: The rank distribution of a TCG-Booster is the same as a Cross-Booster (see §4.6).
- GS-EXP-14: **Challenger bonus**: one free TCG-Booster (player's choice of TCG) every **24 hours**.

### 4.4 Rank-Booster

- GS-EXP-15: Three variants exist: **Common-Booster**, **Rare-Booster**, **Legendary-Booster**. No Rank-Boosters exist for Mythic, Unique, or Beyond.
- GS-EXP-16: A player sacrifices one owned card instance of the corresponding Rank to open its Rank-Booster. The sacrificed card instance goes to the Mysterious Man's assets.
- GS-EXP-17: A Rank-Booster yields **3 cards** of the sacrificed Rank. Card 3 has a **10% chance** of being one Rank higher (C→R, R→L, L→M).
- GS-EXP-18: Rank-Boosters cannot be stacked; each sacrifice-and-open is a single action.

### 4.5 Event-Booster

- GS-EXP-19: Admins may create **Event-Boosters** during special events, configuring price, card count, Rank distribution, and duration.

### 4.6 Season Reward Booster

- GS-EXP-34: A **Season Reward Booster** is a special booster distributed exclusively as a season end reward. It cannot be purchased, sacrificed for, or obtained by any other means.
- GS-EXP-35: The Season Reward Booster contains **3 cards** and uses the standard Rank Escalation Formula (see §4.7). The admin configures the starting Rank tier (default for 1st-place player reward: Mythic). No sacrifice is required to open it.
- GS-EXP-36: Season Reward Boosters are placed directly into the recipient's booster inventory and are not part of the standard 10-slot Cross-Booster stack.

### 4.8 Booster Stack UI

- GS-EXP-22: The booster stack is displayed as a **row of 10 logo-style slot icons**, ordered left (slot 1) → right (slot 10).
- GS-EXP-23: Each slot icon has two states: **outlined/empty** (no booster) and **filled/plain** (booster ready).
- GS-EXP-24: Slot 10 displays a **shiny** visual when it holds an Overflow-Booster.
- GS-EXP-25: Slot 1 displays a **shiny** visual for Challengers when the independent 6-hour Overflow timer has fired and is waiting for the player to open slot 1 (see GS-EXP-09). The shiny persists whether slot 1 is empty or filled. The 11th timer only affects slot 10 and is independent of slot 1.
- GS-EXP-26: Rank-Booster and TCG-Booster each have a **dedicated separate slot icon** (distinct from the Cross-Booster stack). When the slot is empty/unpaid it appears outlined; once the price is paid it appears filled and becomes clickable to start drafting.

### 4.9 Drafting Experience

- GS-EXP-27: A player opens a booster by clicking the leftmost filled Cross-Booster (or Overflow-Booster) slot. This displays **7 face-down card backs** in a row (left = Card 1, right = Card 7). The card back art is a custom design created specifically for TCG Beyond.
- GS-EXP-28: The player reveals cards one at a time by clicking the leftmost unrevealed card back. On click, the card flips to reveal:
  - The card image, name, TCG, and set
  - A **rank aura** — a coloured glow specific to its Rank: Common: green, Rare: blue, Legendary: yellow, Mythic: orange, Unique: red, Beyond: purple
  - PW / HP / EV stats
  - A distinct **"discovery aura"** (large white rays rendered above the rank aura but behind the card art) if this card is the **global first discovery** of that card definition
- GS-EXP-29: Once revealed, three controls appear beneath the card:
  - A **tag field** — allows the player to assign or create tags immediately (see §5.3)
  - A **Sell to Council** icon — immediately sells the card to the Council at its CVS price; the Coiniverse is added to the player's balance
  - A **List on Market** icon — opens a small inline form beneath the card (without leaving the draft screen) showing the card name, a starting bid field, a listing duration selector, and a Confirm button. On confirm the card is immediately locked and listed on the market in the background; the player continues the draft normally
- GS-EXP-30: After all 7 cards are revealed, a **Store** button appears. Clicking it sends all undecided cards (not sold to Council, not listed on market) directly to the player's Museum.
- GS-EXP-31: If the page is reloaded or the session times out during an active draft, all remaining unrevealed cards are **automatically drafted and sent to the Museum** with no loss. Cards already sold or listed are unaffected.
- GS-EXP-32: After the Store button is clicked (or auto-draft resolves), the interface returns to the booster stack view, the opened slot is cleared, and the timer resumes (or starts if it was paused).
- GS-EXP-33: For **TCG-Boosters** and **Rank-Boosters**, clicking the dedicated slot icon shows the cost (Coiniverse price or required sacrifice card). Once the player confirms payment, the slot becomes filled. The drafting flow is identical to Cross-Booster, except Rank-Boosters display only **3 card backs** (Card 1 → Card 3).

## 5. Museum

### 5.1 Own Collection

- GS-MUS-01: A player shall be able to browse and search their own card collection.
- GS-MUS-02: Card detail view shall show: name, image, TCG, set, Current/Peak Rank, Current/Peak Position, PW/HP/EV, line graph if any, UID of this instance, the username of the global first discoverer and the date of first discovery, and trademark notice.
- GS-MUS-07: Card detail view shall include a **Nerd Stats** toggle. When enabled, it reveals the full computation chain: S/E/C/Ctrl/U scores, confidence levels, UPS, Archetype, Rarity weight, PW/HP/EV formula inputs and results, UF, Card Definition ID, and CVS.
- GS-MUS-03: From the card detail view, a player may: list the card on the market, initiate an exchange with a friend or guild member, or sell the card directly to the Council.
- GS-MUS-04: A card listed on the market or in pending exchange is **locked** (unavailable for decks or any other action) until the listing expires, the card sells, or the card is exchanged.
- GS-MUS-08: The Museum collection filter shall include a **"Doublon"** option to show only cards for which the player owns more than one instance of the same card definition.

### 5.2 Global Archive

- GS-MUS-05: A secondary sub-tab called the **Global Archive** shows all cards in the database with the following sort/filter modes:
  - TCG name (A → Z) with Rank as sub-filter
  - Rank (B → C) with card name as sub-filter *(default)*
  - Card name (A → Z) with Rank as sub-filter
  - PW (high → low) with Rank as sub-filter
  - HP (high → low) with Rank as sub-filter
  - Discovery order (first-discovered first) with Rank as sub-filter
- GS-MUS-06: Cards not yet discovered by any player are shown in the Global Archive as a **silhouette only** — the card shape is visible but the name, TCG, and set are hidden. A card is globally revealed (name and metadata become visible) on its **first discovery by any player**.

### 5.3 Card Tagging

- GS-TAG-01: A player may assign one or more **tags** to any card they own. Tags may be applied from the Museum card detail view and during the booster drafting flow.
- GS-TAG-02: Tags are free-form text labels created by the player. If a typed tag does not already exist, it is created on the fly. There is no limit on the number of tags a player may create.
- GS-TAG-03: The Museum collection view shall include a **tag filter** that is separate from and combinable with the existing sort/filter options (Rank, name, TCG, etc.). Only one tag may be active at a time; selecting a second tag deselects the first.
- GS-TAG-04: Tags belong to the player, not to the card instance. Two players may use the same tag label independently.
- GS-TAG-05: A tag that has no cards assigned to it is **automatically purged** from the player's tag list.
- GS-TAG-06: The tag filter shall include a **"No Tag"** option to show all owned cards that have no tags assigned.
- GS-TAG-07: The tag selector in the Museum includes an **"Edit tags"** mode. In this mode a player may:
  - **Rename** a tag — the new name is applied to every card that carries the tag.
  - **Delete** a tag — all cards carrying the tag are silently untagged; the tag ceases to exist.

## 6. Market

### 6.1 Listing a Card

- GS-MKT-01: A player may list any unlocked owned card on the market by setting a starting Coiniverse bid and a listing duration: 1 h, 3 h, 6 h, 9 h, 12 h, or 24 h.
- GS-MKT-02: If a listing receives no bids for 50% of its duration, the seller may lower the starting bid **once**.
- GS-MKT-03: When a card sells, the seller receives the winning bid minus the 5% Council commission. The card transfers to the buyer's Museum.

### 6.2 Bidding

- GS-MKT-04: Any player may browse the market and bid on listings. If a bid is placed with **30 seconds or fewer** remaining, the timer extends by **1 minute**.
- GS-MKT-05: Each new bid must be at least **10% above** the current highest bid, rounded up. A player may enter a custom amount and may bid multiple times, provided each bid satisfies the minimum.
- GS-MKT-12: When a player places a bid, the Coiniverse amount is immediately **escrowed** (deducted from their balance). If a higher bid is placed by another player, the previous top bidder is automatically and instantly refunded the full escrowed amount.
- GS-MKT-13: The market listing view shall display a **simulated net amount** the seller would receive at the current highest bid (current bid × 0.95, rounded down), making the Council's 5% commission transparent to both buyer and seller.
- GS-MKT-06: At expiration the highest bidder wins the card. With no bids the card returns to the seller's Museum.

### 6.3 Selling to the Council

- GS-MKT-07: A player may sell any unlocked owned card directly to the Council at the system-computed CVS price (GR-DB-15).
- GS-MKT-08: Cards sold to the Council are added to the Council Museum.

### 6.4 Trade Commission

- GS-MKT-09: **5%** of every player-to-player sale is credited to the Council Bank.

### 6.5 Market History

- GS-MKT-11: A player may view the full history of their market activity: cards listed, bids won/lost, and cards sold.

### 6.6 Anti-Manipulation Rules

- GS-MKT-14: The minimum starting bid for any listing is **1 Coiniverse**. No listing may be created with a starting bid below 1 Coiniverse.
- GS-MKT-15: A seller may cancel a listing at any time **only if no bids have been placed**. Once a bid from another player is received, the listing is locked and cannot be cancelled by the seller.
- GS-MKT-16: If a seller's account is deleted while one of their listings is active, the listing continues until its natural expiry:
  - **If the card sells**: the buyer pays in full; the 5% Council commission is collected and credited to the Council Bank; the remaining proceeds are removed from circulation (the deleted account no longer exists to receive them).
  - **If the card does not sell**: the standard account-deletion rule applies and the card is transferred to the Council Museum.
- GS-MKT-17: A seller **cannot bid on their own listing**. Any bid attempt on a card the player currently has listed is rejected by the server.
- GS-MKT-18: **Multi-account ownership is permitted** unless accounts are used to manipulate gameplay, the economy, auctions, rankings, achievements, or other game systems. (See also GS-SEC-09.)

## 7. Friends

- GS-FRD-01: A player may send friend invitations by username.
- GS-FRD-02: The Friends screen shows three lists: accepted friends, sent invitations, received invitations.
- GS-FRD-03: From the friend list a player may: open a chat, initiate an exchange, challenge to a Joute, view their Museum (subject to visibility setting), or remove them.

## 8. Exchange

- GS-EXC-01: A player may initiate an exchange proposition with a friend or guild member. **No Coiniverse commission is taken by the Council** on exchanges.
- GS-EXC-02: Each side may offer zero or more of their cards and/or zero or more Coiniverse.
- GS-EXC-03: Both parties may view each other's Museum while composing the exchange.
- GS-EXC-04: Both parties may view the complete proposition details — each card and Coiniverse amount offered by each side — at any time while the proposition is pending.
- GS-EXC-05: The recipient may **accept**, propose a **counter-offer**, or **refuse**. A counter-offer reverses roles (original proposer becomes the new recipient) and may modify any element of either side of the proposition.
- GS-EXC-06: The exchange executes only when both parties accept the current proposition. Either party may cancel at any point before final acceptance.
- GS-EXC-07: A trade proposition **expires automatically after 4 hours** if not accepted or manually cancelled. On expiry, the proposition is cancelled with no cards or Coiniverse transferred; both parties receive an in-app notification (TRD-4/TRD-5 as applicable).

## 9. Guild

### 9.1 Membership

- GS-GLD-01: A player may create or join a guild. Each player belongs to at most one guild at a time.
- GS-GLD-02: A guild has three roles: **Leader**, **Manager**, **Rookie**. There is exactly **one Leader** per guild at any time. When the current Leader promotes another member to Leader, they are automatically demoted to Manager.

### 9.2 Role Permissions

| Action                            | Leader | Manager | Rookie |
| :-------------------------------- | :----: | :-----: | :----: |
| Rename guild                      |   ✓    |         |        |
| Change description                |   ✓    |    ✓    |        |
| Change logo                       |   ✓    |    ✓    |        |
| Invite members                    |   ✓    |    ✓    |   ✓    |
| Exclude members                   |   ✓    |    ✓    |        |
| Promote/demote Rookies & Managers |   ✓    |   ✓*    |        |
| Promote a Manager to Leader       |   ✓    |         |        |
| Leave guild (dissolves it)        |   ✓    |         |        |
| Leave guild                       |        |    ✓    |   ✓    |
| Chat / Joute / Exchange a member  |   ✓    |    ✓    |   ✓    |

*Managers may promote/demote Rookies and other Managers, not the Leader.

### 9.3 Guild Progression

- GS-GLD-03: Guild level determines the member cap. Starting cap is **10 members**; each level gained adds **5 slots**. The maximum cap is **128 members**, regardless of guild level.
- GS-GLD-04: Guild EXP is earned through member activities. Exact values are admin-configurable (GS-DEV-01); defaults:

  **General**

  | Event                                                    | Guild EXP |
  | :------------------------------------------------------- | :-------: |
  | Member discovers a card                                  |     2     |
  | Member drafts a duplicate                                |     1     |
  | Member completes a trade                                 |     2     |
  | Member donates 10 Coiniverse to Bank                     |     3     |
  | Member daily login                                       |     1     |
  | 4+ members each complete the Daily Challenge (GS-GLD-17) |    10     |
  | 10 members each complete the Daily Challenge             |    50     |
  | All members complete the Daily Challenge                 |    300    |

  **Duels**

  | Event                                           | Guild EXP |
  | :---------------------------------------------- | :-------: |
  | Member plays a duel                             |     8     |
  | Member wins a duel                              |    +10    |
  | Member wins with Perfect Victory (no card loss) |    +5     |
  | Member achieves a 5-win streak                  |    +15    |
  | Member loses a duel¹                            |     4     |

  ¹ Losing awards 4 EXP total (not 8+4) — a consolation participation reward, not a deduction.

  **WCAT**

  | Placement   | Guild EXP |
  | :---------- | :-------: |
  | Participate |    25     |
  | Top 32      |    40     |
  | Top 16      |    60     |
  | Top 8       |    90     |
  | Top 4       |    130    |
  | Top 3       |    180    |
  | Top 2       |    250    |
  | Top 1       |    400    |

  **Social**

  | Event                             | Guild EXP |
  | :-------------------------------- | :-------: |
  | Member reports a confirmed bug    |    50     |
  | Member's feature request approved |    100    |

  Admins may award bonus EXP during special events.
- GS-GLD-05: When a player joins an existing guild, their past activities (pre-join) do not retroactively contribute EXP.
- GS-GLD-15: Guild level is determined by accumulated guild EXP. Thresholds for levels 1–10 are fixed; from level 11 onward the formula is `500 × CurrentLevel²` EXP required to reach the next level. Default thresholds (admin-configurable):

  | Level | Cumulative EXP required |
  | :---: | :---------------------: |
  |   2   |           500           |
  |   3   |          1 250          |
  |   4   |          2 250          |
  |   5   |          3 500          |
  |   6   |          5 000          |
  |   7   |          6 750          |
  |   8   |          8 750          |
  |   9   |         11 000          |
  |  10   |         12 500          |
  |  11+  | previous + 500 × Level² |

- GS-GLD-16: Reaching certain guild levels unlocks cosmetic and functional benefits:

  | Level | Unlock                         |
  | :---: | :----------------------------- |
  |   2   | Guild Blason — classic icons   |
  |   3   | Guild Blason — classic shapes  |
  |   8   | Guild Blason — extended icons  |
  |  15   | Guild Blason — extended shapes |
  |  20   | Guild Hall — classic skins     |
  |  30   | Guild Hall — extended skins    |
  |  40   | Guild Golden Status            |
  |  50   | Guild Prestige Badge           |

- GS-GLD-17: **Daily Challenge** — Each day at **midnight UTC** (default; admin-configurable), each player is presented with **10 daily objectives**. Completing any **4** of these 10 completes the Daily Challenge for that day. Each objective counts once per day regardless of how many times it is completed. The 10 objectives (values admin-configurable per GS-DEV-01):

  | #   | Daily objective                     |
  | --- | :---------------------------------- |
  | 1   | Open 10 boosters                    |
  | 2   | Open an Overflow-Booster            |
  | 3   | Purchase 3 TCG-Boosters             |
  | 4   | Purchase 2 Rank-Boosters            |
  | 5   | Win a Joute vs Random or vs Council |
  | 6   | Participate in a WCAT               |
  | 7   | Finish top 4 in a WCAT              |
  | 8   | List 5 cards on the Market          |
  | 9   | Sell 10 cards to the Council        |
  | 10  | Win a bid on the Market             |

  Completing the Daily Challenge triggers guild EXP bonuses (GS-GLD-04) based on how many guild members completed their challenge that day.

### 9.4 Guild Stats

- GS-GLD-06: A guild tracks: member count / cap, total cards discovered by members, total jouttes won, total cards sold on market, and total achievements completed by members.
- GS-GLD-07: A guild leaderboard is accessible to all players.

### 9.5 Guild Bank

- GS-GLD-08: Each guild has a **Guild Bank** — a shared Coiniverse reserve. Members may voluntarily deposit Coiniverse into it.
- GS-GLD-09: The Guild Bank may only be spent on: (1) admin-organized guild special events, or (2) purchasing cards from the Council Museum via the **Reveal mechanism**:
  - Any **Manager or Leader** may initiate a reveal. On initiation, **100 Coiniverse is immediately deducted** from the Guild Bank and credited to the Council Bank.
  - The Council responds with **9 random cards of a chosen Rank** drawn from its Museum. The 9 cards are visible to **all Leaders and Managers** of the guild.
  - The feature is **locked** (no other guild action may be started) until a card is purchased or the reveal is cancelled via a **Cancel / Withdraw** button.
  - The guild may buy **one of the 9** at **CVS × 1.30**, paid from the Guild Bank and credited to the Council Bank. Purchased cards go directly into the Guild Deck — they do not enter any player's Museum.
  - To see a different selection of 9 cards, another **100 Coiniverse** must be spent (each new reveal request is an independent transaction). The reveal fee is **non-refundable** even if the reveal is cancelled.
- GS-GLD-10: The Guild Bank balance **cannot be transferred** to or from any player's personal Coiniverse balance in any way.

### 9.6 Guild Deck

- GS-GLD-11: Each guild has a single **Guild Deck** of 9 cards (3×3 grid) contributed by members.
- GS-GLD-12: When a player contributes a card to the Guild Deck, they **permanently relinquish ownership** of that card. The card is removed from their Museum and cannot be retrieved, sold, traded, or used in personal decks.
- GS-GLD-13: The guild Leader may sell any card from the Guild Deck to the Council at CVS price. Proceeds go directly to the **Guild Bank**, not to the Leader's personal Coiniverse balance.
- GS-GLD-14: The Guild Deck is usable only in admin-scheduled special events.

### 9.7 Guild Dissolution

- GS-GLD-18: A guild is **dissolved** when its Leader's account is deleted (see GS-PLAYER-06).
- GS-GLD-19: On dissolution:
  - All cards in the **Guild Bank** (Coiniverse balance) and **Guild Deck** are transferred to **MM Assets**.
  - If the guild is participating in an active **WCAT round**, the guild receives an **instant loss** for that round.
  - All members are removed from the guild; their personal EXP and any guild-level cosmetics are **permanently lost** for that guild.
- GS-GLD-20: A dissolved guild's name enters a **24-hour cooldown** before it may be claimed by a new guild. The guild name and dissolution event are **kept in the audit records** permanently for historical and anti-abuse purposes.

## 10. Joute (Battle)

### 10.1 Deck

- GS-JOU-01: A joute deck has exactly **9 cards** in a 3×3 grid (columns: Left, Center, Right; rows 1–3 per column).
- GS-JOU-02: Cards fight only within their column.
- GS-JOU-03: The frontmost card in each column (row 1) is the active fighter. When eliminated, the card behind it advances.
- GS-JOU-04: A player who wins 2 out of 3 columns wins the joute.
- GS-JOU-05: A player may save up to **16 decks**.
- GS-JOU-05a: **Deck composition rules**:
  - No two card slots may hold instances of the **same Card Definition** (no duplicates by definition, regardless of instance UID).
  - Each Card Instance may occupy **at most one position** across all saved decks.
  - A card that is part of a saved deck and is **locked** (listed on market, in pending exchange, being sacrificed, or in another active operation) cannot be traded, gifted to a guild, sold on the Market, sold to the Council, sacrificed for a Rank-Booster, or added to another deck while the deck lock is held.
  - A player may **not modify any deck** (add, remove, or reorder cards) while they are in a Joute match or in a WCAT queue/match.

### 10.2 Turn Timer & Idle Rules

- GS-JOU-10: Each turn has a **5-minute** active timer. If the player does not act within 5 minutes, the idle clock begins drawing from their **1-hour idle bank**.
- GS-JOU-11: When a player acts, the idle clock stops but retains its remaining value for any future idle periods in the same match.
- GS-JOU-12: When a player's idle bank is fully exhausted and they again fail to act within 5 minutes, the joute ends. The result is recorded as a **loss** for the idling player.

### 10.3 Mode: vs Friend / Guild Member

- GS-JOU-13: A player challenges a friend or guild member; a notification is sent and the recipient may accept or decline.
- GS-JOU-14: If accepted, both select a deck. The joute uses all **3 rows** per column.

### 10.4 Mode: vs Random Player (Single Duel)

- GS-JOU-15: A player broadcasts a wish to duel. When two players broadcast simultaneously they are matched. Uses all **3 rows** per column.

### 10.5 Mode: WCAT Tournament

- GS-JOU-16: A player enters a WCAT by paying the entrance fee. The bracket requires **16 players**; the queue remains open until full.
- GS-JOU-17: WCAT jouttes use **2 rows** per column.
- GS-JOU-18: Prize pool distribution: 1st → 39%, 2nd → 29%, 3rd → 19%, 4th → 8%, 5% is kept by the Council in its Bank (total: 100%).
- GS-JOU-19: Tournament types:
  - **Classic**: standard fee, always available.
  - **Super Tournament**: 10× standard fee; triggered at **0.5% chance** on each new Classic WCAT creation.
  - **Council Tournament**: admin-created only. Rewards include Coiniverse and/or Council Museum cards. All players except first-round eliminees are refunded their entrance fee. Requires the Council Museum to hold the designated card rewards and the Council Bank to have sufficient Coiniverse.
- GS-JOU-20: Challengers receive a daily free Classic WCAT entry pass.

### 10.6 Mode: vs Council

- GS-JOU-21: A player challenges the Council, selecting a Rank tier beforehand. The **Council Museum must contain at least 3 eligible Card Instances of the chosen Rank** for the challenge to be accepted; if insufficient cards are available the challenge is rejected with an informative message.
- GS-JOU-22: Council joutes use only the **first row** (3 cards per side, one per column).
- GS-JOU-23: The Council's deck for a vs Council joute is **3 random cards** drawn from the Council Museum of the **same Rank tier** selected by the player.
- GS-JOU-24: Player win → they select 1 of the **3 card instances the Council played** during the match as their reward.
- GS-JOU-25: Council win → the player selects 1 of the **3 card instances they themselves played** in the match to forfeit to the Council Museum.
- GS-JOU-26: The Council Museum contents are never visible to players.

### 10.7 Daily Limits

- GS-JOU-27: Daily joute limits:

| Mode              | Standard  | Challenger |
| ----------------- | :-------: | :--------: |
| vs Random         |   5/day   |   8/day    |
| vs Council        |   5/day   |   10/day   |
| vs Friend / Guild | unlimited | unlimited  |
| WCAT              |   1/day   |   2/day    |

- GS-JOU-28: **Challenger WCAT Free Pass** — Challengers earn **1 free Classic WCAT entry pass per day**. Unused passes may be stockpiled. A Challenger may use at most **2 WCAT per day** regardless of pass count. The cost of a free pass is covered by the **Council Bank** (not deducted from prize pool nor from the Challenger's Coiniverse).

### 10.8 Mode: Guild WCAT

- GS-JOU-29: A **Guild WCAT** is an admin-created special event tournament where **16 guilds** compete in a knockout bracket. Guild jouttes use the **Guild Deck** (GS-GLD-11) instead of individual player decks.
- GS-JOU-30: Guild WCAT entry cost, bracket size constraints, and rewards are configured by the admin when the event is created. Entry cost is paid from the **Guild Bank**.
- GS-JOU-31: Guild WCAT results contribute to Guild achievements (see GS-ACH-02). Any EXP awarded for Guild WCAT placements is admin-configured per event.

## 11. Chat

- GS-CHT-01: A player may send and receive messages with friends, guild members, other players (by username), and admins.
- GS-CHT-02: The Chat screen displays all active conversations grouped by recipient.
- GS-CHT-03: All chat messages (global, guild, and private) pass through **automatic AI-based moderation**. Detected infractions trigger escalating mute durations: 1st → 10 minutes; 2nd → 1 hour; 3rd → 24 hours; 4th (after 3 mutes) → **flagged for human review** at `/admin/appeals`. An immediate permanent ban is only applied **after a Moderator or higher approves the ban** through the appeals interface.
- GS-CHT-04: The infraction counter resets after **31 consecutive days** without a new infraction.
- GS-CHT-05: When a player has an active infraction count, a system message is shown when they open any chat: *"You have N warning(s). After the 3rd, a detected infraction will permanently ban you from the chat."*
- GS-CHT-06: When a mute is applied, a system message is sent to the player stating: their current mute count, the mute duration, and the detected reason.
- GS-CHT-07: A player may **contest a mute**. The contest is reviewed by an SLM moderation agent:
  - If the contest is valid: the mute ends immediately and the infraction counter is not incremented.
  - If the player is abusive toward the moderation system during the contest: an immediate permanent chat ban is applied regardless of current mute count.
- GS-CHT-08: Individual chat conversations persist for **180 days of inactivity**, then are deleted. A player may delete a conversation at any time.
- GS-CHT-09: In any chat, a player may reply to a specific message using a "Reply" action. The reply quotes the original message and sends a notification to the quoted player.

## 12. Achievements (Successes)

- GS-ACH-01: Achievements are organised into **8 categories**. Each achievement has a **Tier** (I–VII) that determines its MP and Coiniverse reward. Tier rewards (admin-configurable defaults):

  | Tier  | Name     |  MP   | Coiniverse |
  | :---: | :------- | :---: | :--------: |
  |   I   | Tutorial |  10   |    100     |
  |  II   | Bronze   |  20   |    250     |
  |  III  | Silver   |  40   |    500     |
  |  IV   | Gold     |  80   |   1 000    |
  |   V   | Diamond  |  150  |   2 000    |
  |  VI   | Ruby     |  300  |   5 000    |
  |  VII  | Titanium |  500  |   10 000   |

- GS-ACH-02: Full achievement list by category:

  **Exploration**

  | Achievement            | Tier  |
  | :--------------------- | :---: |
  | Discover 1 card        |   I   |
  | Discover 100 cards     |  III  |
  | Draft 1 Mythic         |  II   |
  | Draft 10 Mythics       |  IV   |
  | Draft 1 Unique         |  III  |
  | Draft 10 Uniques       |   V   |
  | Draft 1 Beyond         |  IV   |
  | Draft 10 Beyonds       |  VII  |
  | Draft 1 of each TCG    |  IV   |
  | Draft 1 of each rarity |  IV   |
  | Draft a duplicate      |   I   |
  | Draft 10 duplicates    |  II   |

  **Museum**

  | Achievement             | Tier  |
  | :---------------------- | :---: |
  | Collect 100 cards       |  II   |
  | Collect 1 000 cards     |  IV   |
  | Complete a set of 1 TCG |   V   |
  | Collect all Common      |   V   |
  | Collect all Rare        |  VI   |
  | Collect all Legendary   |  VII  |

  **Trade**

  | Achievement                       | Tier  |
  | :-------------------------------- | :---: |
  | Complete a trade                  |   I   |
  | Complete 10 trades                |  III  |
  | Complete 100 trades               |   V   |
  | Get a trade refused               |   I   |
  | Get 10 trades refused             |  II   |
  | Sell a card to the Council        |   I   |
  | Sell 10 cards to the Council      |  III  |
  | Sell a card on the Market         |  II   |
  | Sell 10 cards on the Market       |  IV   |
  | List a card that receives no bids |  II   |
  | Win a bid on a Beyond card        |  VI   |

  **Joutes**

  | Achievement                          | Tier  |
  | :----------------------------------- | :---: |
  | Win a joute                          |  II   |
  | Win 10 joutes                        |  III  |
  | Win 100 joutes                       |   V   |
  | Win 1 000 joutes                     |  VII  |
  | Win a Perfect Victory (no card lost) |  III  |
  | Win 10 Perfect Victories             |   V   |
  | Win a streak of 5                    |  IV   |
  | Win a streak of 10                   |  VI   |
  | Lose 10 joutes in a row              |  IV   |
  | Lose 100 joutes                      |   V   |

  **WCAT**

  | Achievement                           | Tier  |
  | :------------------------------------ | :---: |
  | Enter a WCAT for the first time       |  III  |
  | Enter a WCAT 3 seasons consecutively  |   V   |
  | Finish top 4 in a WCAT                |  VI   |
  | Win a WCAT (top 1)                    |  VII  |
  | Enter a Super WCAT for the first time |  IV   |
  | Finish top 4 in a Super WCAT          |  VI   |
  | Win a Super WCAT (top 1)              |  VII  |

  **Guild**

  | Achievement                           | Tier  |
  | :------------------------------------ | :---: |
  | Join or create a guild                |  II   |
  | Donate 100 Coiniverse to Guild Bank   |  II   |
  | Donate 1 000 Coiniverse to Guild Bank |  IV   |
  | Guild reaches level 10                |  III  |
  | Guild reaches level 20                |  IV   |
  | Guild reaches level 30                |   V   |
  | Guild reaches level 40                |  VI   |
  | Guild reaches level 50                |  VII  |
  | Guild participates in a Guild WCAT    |   V   |
  | Guild finishes top 4 in a Guild WCAT  |   V   |
  | Guild reaches top 10 at season end    |  VI   |
  | Guild finishes top 1 at season end    |  VII  |

  **Seasons**

  | Achievement                       | Tier  |
  | :-------------------------------- | :---: |
  | Play through a season             |  II   |
  | Play through 5 seasons            |  IV   |
  | Accumulate 100 000 Coiniverse     |  III  |
  | Accumulate 1 000 000 Coiniverse   |   V   |
  | Accumulate 10 000 000 Coiniverse  |  VI   |
  | Accumulate 100 000 000 Coiniverse |  VII  |
  | Reach top 10 at season end        |  VI   |
  | Reach top 1 at season end         |  VII  |
  | Participate in a Special Event    |  IV   |

  **Prestige**

  | Achievement                           | Tier  |
  | :------------------------------------ | :---: |
  | Accumulate 1 000 000 000 Coiniverse   |  VII  |
  | Collect all Unique cards              |  VII  |
  | Collect all Beyond cards              |  VII  |
  | Play for 1 year                       |   V   |
  | Play for 2 years                      |  VI   |
  | Play for 5 years                      |  VII  |
  | Complete all Exploration achievements |  VI   |
  | Complete all Museum achievements      |  VI   |
  | Complete all Trade achievements       |  VI   |
  | Complete all Joutes achievements      |  VI   |
  | Complete all WCAT achievements        |  VI   |
  | Complete all Guild achievements       |  VI   |
  | Complete all Seasons achievements     |  VI   |

- GS-ACH-03: A player may view all achievements organised by category, with tier, completion status, and unclaimed reward clearly shown. Completed but unclaimed achievements are shown in black-and-white until the player clicks to claim the reward, after which they turn coloured and MP + Coiniverse are credited.

- GS-ACH-04: **Hidden Achievements** are a separate set of achievements that do **not** appear in the achievement list and do **not** award MP. They are discovered naturally through gameplay and award **Embryon Lore Shards** instead (see §30):
  - Draft 2 Beyond cards in consecutive boosters → 1 Embryon Lore Shard
  - Open 100 boosters without drafting any Beyond → 1 Embryon Lore Shard
  - Complete an entire TCG set → 1 Embryon Lore Shard
  - Win 100 joutes in a row → 1 Embryon Lore Shard

- GS-ACH-05: **Hidden Title "Embryonist"** — Awarded automatically and without prior announcement when a player completes all seven "Complete all X achievements" entries in the Prestige category. The title does not appear on any list until it is unlocked. Upon unlock, the player also receives 1 Embryon Lore Shard.

- GS-ACH-06: **Meta-achievements** (see GS-LORE-03) are season-specific. All Lore Shards for a given season are obtainable only during that season; once the season ends they become unobtainable unless re-enabled by an admin. Because the Council Reputation lock (GS-REP-03) prevents reaching both extremes in the same season, a player can collect at most one faction shard per season — either the MM Embryon Lore Shard or the Council Embryon Lore Shard, never both. When an admin re-enables a prior season's shards, the shards are **awarded directly and for free** to eligible players — past-season shards are never incorporated as rewards into a different active season's progression.

## 13. Leaderboard

The Leaderboard section contains two independent leaderboards: **Player Leaderboard** and **Guild Leaderboard**.

### 13.1 Active Player Requirement

- GS-LDB-01: A player is considered **active** in a season if they opened at least one booster on a minimum of **10 distinct calendar days** (UTC) during that season. A player who does not meet this threshold for a given season has no rank on the Season Leaderboard for that season, and that season does not count toward their Lifetime averages.

### 13.2 Competitive Leaderboard (PLS)

- GS-LDB-02: The **Competitive Leaderboard** ranks players by **Player Leaderboard Score (PLS)**. Only Joutes vs Random and Joutes vs Council contribute to PLS. PLS accumulates over the season and resets at each season change.
- GS-LDB-03: **Joute PLS** (per completed match):

  | Result                                                               |    PLS    |
  | :------------------------------------------------------------------- | :-------: |
  | Win                                                                  |    25     |
  | Perfect Victory (all opponent cards eliminated, zero own cards lost) | +10 bonus |

- GS-LDB-04: **WCAT PLS** (per tournament):

  | Milestone   |  PLS  |
  | :---------- | :---: |
  | Participate |   5   |
  | Top 32      |  10   |
  | Top 16      |  20   |
  | Top 8       |  40   |
  | Top 4       |  70   |
  | Top 3       |  110  |
  | Top 2       |  160  |
  | Top 1       |  220  |

- GS-LDB-05: When two players have equal PLS, the one who reached that total first (earlier timestamp) ranks higher.
- GS-LDB-06: **Lifetime Competitive** — a player's Lifetime PLS is the **arithmetic mean** of their PLS scores across all seasons in which they were active. Seasons where the player was inactive (GS-LDB-01) are excluded.

### 13.3 Collection Leaderboard

- GS-LDB-07: The **Collection Leaderboard** ranks players by **Collection Score (CS)** — a weighted count of unique cards in the player's Museum at season end. Duplicate instances of the same Card Definition do not stack.

  `CS = ⌈ Σ (0.5 × CSrankModifier × uniqueCardCount_at_rank) ⌉`

  | Rank      | CSrankModifier |
  | :-------- | :------------: |
  | Common    |       1        |
  | Rare      |       2        |
  | Legendary |       3        |
  | Mythic    |       4        |
  | Unique    |       5        |
  | Beyond    |       6        |

- GS-LDB-08: When two players have equal CS, the one who reached that total first ranks higher.
- GS-LDB-09: **Lifetime Collection** — a player's Lifetime CS is the **arithmetic mean** of their CS scores across all seasons in which they were active (GS-LDB-01).

### 13.4 Guild Leaderboard

- GS-LDB-10: The **Guild Leaderboard** ranks guilds by accumulated guild EXP (GS-GLD-04). Season view shows EXP earned in the current season only; Lifetime view shows total cumulative guild EXP across all seasons.
- GS-LDB-11: When two guilds have equal EXP, the one that reached that total first ranks higher (timeline tiebreaker).

### 13.5 Personal Leaderboard History

- GS-LDB-12: A player's personal Leaderboard history is accessible from their own Profile page (see §16). It displays one tab per existing season in which the player participated, plus a **Lifetime** tab. Each season tab shows the player's final Competitive PLS, Collection CS, Competitive rank, and Collection rank for that season. The Lifetime tab shows their Lifetime PLS and Lifetime CS averages.

## 14. Profile

- GS-PRF-01: A player profile displays: username, profile picture, Challenger badge (if subscribed), account creation date, number of unique cards in Museum, and visibility setting.
- GS-PRF-02: Visibility toggles between **Public** and **Friends/Guild only**.
- GS-PRF-03: A profile page links to the player's Museum, Friend list, Guild, Chat, and Settings.
- GS-PRF-04: A **Leaderboard History** tab on the player's own profile shows their personal ranking record. It contains one sub-tab per season the player participated in, plus a **Lifetime** sub-tab. Each season tab shows the player's final Competitive PLS, Collection CS, Competitive rank, and Collection rank for that season. The Lifetime tab shows Lifetime PLS and CS averages (GS-LDB-12).

## 15. Settings

- GS-SET-01: A player may update their email address and/or password.
- GS-SET-02: A player may change their username (subject to 30-day cooldown).
- GS-SET-03: A player may select their display language (major European languages at launch; more added over time).
- GS-SET-04: A player may select a UI theme (Catppuccin 4 themes at launch; more on request).
- GS-SET-05: A player may subscribe to or cancel the Challenger monthly subscription.
- GS-SET-06: The subscription sub-tab shows: subscription status and the name of the active payment platform.
- GS-SET-07: A purchase history sub-tab shows all past subscription transactions.
- GS-SET-09: A player may toggle the **pre-deletion email notification** (enabled by default).
- GS-SET-10: A player may log out.
- GS-SET-11: A **Danger Zone** section allows permanent account deletion (cards go to Council Museum, all personal data purged).
- GS-SET-12: A **Legals** section at `/settings/legal` lists all TCG licences used by TCG Beyond, with for each: the TCG name, the licence type, a link to the official terms URL, the name of the reviewer who verified the licence, and the date last verified.

## 16. Challenger Subscription

- GS-CHL-01: A Challenger subscription grants:
  - **12-minute** Cross-Booster timer (vs. 15 min for standard)
  - **1 Overflow-Booster added to slot 1 every 6 hours**
  - **1 free TCG-Booster every 24 hours** (player's choice of TCG)
  - **1 free Classic WCAT entry pass per day**, stockpileable, funded by the Council Bank (see GS-JOU-28)
  - **8 vs Random jouttes/day** (vs. 5 for standard)
  - **10 vs Council jouttes/day** (vs. 5 for standard)
  - **2 WCAT entries/day** (vs. 1 for standard)
  - Unlimited vs Friend / Guild jouttes (same as standard)
- GS-CHL-02: The subscription is charged monthly via the stored payment method.
- GS-CHL-03: A player may cancel at any time; benefits end at the close of the current billing period.
- GS-CHL-04: **Payment failure** — if billing fails, the player is notified by email and the system retries after **24 hours**. After **3 consecutive failures** the subscription is automatically cancelled.
- GS-CHL-05: **Grace period** — the player retains full Challenger benefits for **3 days** from the first payment failure while retries are pending.
- GS-CHL-06: **No refund policy** — subscriptions are non-refundable once charged.
- GS-CHL-07: **Chargeback** — if a player opens a support ticket demonstrating that Challenger benefits were not activated despite a successful payment, they are offered either: (a) a compensatory free Challenger period, or (b) a chargeback and immediate subscription cancellation. The choice is for the player to choose, option (b) if no response within 3 days.
- GS-CHL-08: **Account suspension** — if an account is banned for cheating or exploitation, no subscription refund is issued.
- GS-CHL-09: **Renewal** — the subscription renews automatically every **30 days**. It may be cancelled at any time with no commitment or early-termination penalty.
- GS-CHL-10: **Price change protection** — if the subscription price changes, currently subscribed players retain their existing price until they cancel and start a new subscription.
- GS-CHL-11: **VAT** — VAT is applied at the rate applicable to the player's country of residence (default 20% for France). The displayed base price does not include VAT; the applicable amount is shown at checkout.
- GS-CHL-12: **Country-specific pricing** — the base subscription price is global. Only the VAT rate varies by country. Payment provider webhook verification is defined in the tech-stack specification.

## 17. Council

- GS-CNC-01: The Council is an admin-managed entity, not a player account.
- GS-CNC-02: The Council Bank accumulates Coiniverse from: the **5% market transaction commission**, the **5% Council share of every WCAT prize pool** (GS-JOU-18), **direct card sales from players at CVS price** (GS-MKT-07), and the **Guild Bank reveal fees and card purchase prices** from the Council Museum reveal mechanism (GS-GLD-09).
- GS-CNC-03: The Council Museum accumulates cards from: player PvE Joute losses and direct card sales. There is no maximum capacity.
- GS-CNC-04: Admins may organize Council Tournaments using Council Bank Coiniverse and/or Council Museum cards as rewards.
- GS-CNC-05: The Council Bank balance and Museum contents are never directly visible to players. The sole exception is the Guild Bank Reveal mechanism (GS-GLD-09), which shows a randomly drawn selection of 9 cards of a chosen Rank — not the full Museum inventory.

## 18. Internationalization

- GS-I18N-01: Major European languages (English, French, Spanish, German, Italian, Portuguese, and others) shall be prioritised for launch and early updates.
- GS-I18N-02: The i18n infrastructure shall be built in from day one to allow adding languages without architectural changes.
- GS-I18N-03: A player's preferred language is persisted in their account settings.

## 19. Trademark & Intellectual Property

- GS-IP-01: Every card view clearly displays a trademark and copyright notice attributing ownership to the respective TCG publisher.
- GS-IP-02: Card images and names retain their original attribution metadata from the source.
- GS-IP-03: TCG Beyond shall not represent any third-party TCG as being owned, operated, sponsored or endorsed by TCG Beyond.
- GS-IP-04: All third-party intellectual property usage shall be reviewed and approved by legal counsel before public release.

## 20. Tutorial

- GS-TUT-01: On first login after account creation, a step-by-step guided tutorial is triggered automatically, walking the player through each main section: Explore, Museum, Market, Profile, Guild, Chat, Joute, Success, Leaderboard, Settings.
- GS-TUT-02: The tutorial may be skipped at any time during its progression.
- GS-TUT-03: The tutorial appears only once automatically. It can be replayed at any time from Settings > General.

## 21. Season End Rewards

- GS-SEA-01: At the end of each season, the system distributes rewards to top-ranked players and guilds. Default reward table:

  | Position   | Player reward                                        | Guild reward (per member) |
  | :--------- | :--------------------------------------------------- | :------------------------ |
  | 1st        | 1 Season Reward Booster (Mythic-tier, see GS-EXP-34) | 1 000 Coiniverse          |
  | 2nd        | 1 Legendary-Booster                                  | 500 Coiniverse            |
  | 3rd        | 1 Rare-Booster                                       | 250 Coiniverse            |
  | 4th – 10th | 1 Common-Booster                                     | 100 Coiniverse            |

- GS-SEA-02: Season end reward values are **admin-configurable** before each season close; no reward amount or booster type is hardcoded.
- GS-SEA-03: A season has a **minimum duration of 30 calendar days**. There is no maximum duration; season end is triggered manually by an admin.

## 22. Mastery Points (MP)

- GS-MP-01: **Mastery Points (MP)** are a permanent lifetime score credited to a player's account when they claim achievement rewards (see GS-ACH-03). MP is never spent or lost.
- GS-MP-02: Accumulating MP unlocks cosmetic rewards. Milestones and unlocks (thresholds admin-configurable):

  | MP threshold | Unlock                                          |
  | -----------: | :---------------------------------------------- |
  |            5 | Bronze Profile Frame                            |
  |           10 | Bronze Profile Name colour                      |
  |           15 | Title **"Adventurer"** + 1 Embryon Lore Shard   |
  |           50 | Silver Profile Frame                            |
  |           55 | Silver Profile Name colour                      |
  |           60 | Title **"Mercenary"** + 1 Embryon Lore Shard    |
  |          200 | Gold Profile Frame                              |
  |          220 | Gold Profile Name colour                        |
  |          250 | Title **"Knight"** + 1 Embryon Lore Shard       |
  |          500 | Platinum Profile Frame                          |
  |          550 | Platinum Profile Name colour                    |
  |          600 | Title **"Noble"** + 1 Embryon Lore Shard        |
  |        1 000 | Diamond Profile Frame                           |
  |        1 100 | Diamond Profile Name colour                     |
  |        1 200 | Title **"Legend"** + 1 Embryon Lore Shard       |
  |        5 000 | Beyond Profile Frame                            |
  |        5 500 | Beyond Profile Name colour                      |
  |        6 000 | Title **"Beyond Human"** + 1 Embryon Lore Shard |

- GS-MP-03: A player may select which unlocked Profile Frame, Profile Name colour, and Title to display on their profile. Only one of each may be active at a time.

## 23. Council Reputation

- GS-REP-01: Each player has a **Council Reputation** score on a bar from **−50 to +60**. The bar maps to six tiers:

  | Tier       | Score range |
  | :--------- | :---------- |
  | Enemy      | −50 (exact) |
  | Suspicious | −49 to −10  |
  | Neutral    | −9 to +15   |
  | Friendly   | +16 to +35  |
  | Trusted    | +36 to +59  |
  | Confident  | +60 (exact) |

- GS-REP-02: The following player actions modify Council Reputation:
  - **+1**: Sell a card to the Council · Create or join a Guild · Participate in a WCAT · Play a Joute vs Friend/Guild
  - **−1**: Open a Rank-Booster (sacrifice) · Open a TCG-Booster · Open an Overflow-Booster · Play a Joute vs Council

  *Lore rationale:* Actions that strengthen Council power or break player solidarity raise Reputation (the Council approves of selling cards to it, of Guilds operating under its jurisdiction, of WCAT visibility, and of players weakening each other in duels). Actions that empower the Mysterious Man's faction or reinforce the players as an independent force lower Reputation (MM brokers Rank-Boosters, TCG-Boosters, and Overflow-Boosters; fighting the Council directly in Jouttes is an open act of defiance).

- GS-REP-03: Reputation tier effects:

  | Tier       | Mysterious Man behaviour             | Extra reward                          | Lock  |
  | :--------- | :----------------------------------- | :------------------------------------ | :---: |
  | Enemy      | Friendly and talkative toward player | 1 MM Embryon Lore Shard unlocked      |   ✓   |
  | Suspicious | More talkative than usual            | —                                     |   —   |
  | Neutral    | Default behaviour                    | —                                     |   —   |
  | Friendly   | Less talkative than usual            | —                                     |   —   |
  | Trusted    | Even less talkative                  | —                                     |   —   |
  | Confident  | Silent — no dialogue at all          | 1 Council Embryon Lore Shard unlocked |   ✓   |

- GS-REP-04: When a player's reputation reaches the **Enemy** or **Confident** extreme, the score is **locked for the season**. During the lock the score cannot move in either direction.
- GR-REP-05: At the end of each season, every player's Council Reputation score **resets to 0** (Neutral tier).
- GS-REP-06: Council Reputation is **private**. A player's score and tier are visible only to themselves on their own profile. No other player can view another player's Reputation.

## 24. Mysterious Man

- GS-NPC-01: The **Mysterious Man (MM)** is a sparsely speaking NPC woven into the game's lore. He has no profile, museum, or interactive account. MM accumulates cards and Coiniverse through player actions — collectively referred to as **MM Assets** (see §1 Glossary) — and these assets are admin-visible at `/admin/mm`. Through MM's dialogue lines and Lore Shards, players gradually discover that MM and the Council are sworn enemies representing two opposing factions. Players themselves form a potential third, neutral faction — actions that empower MM or strengthen the player collective please MM; actions that expand Council authority or break player solidarity please the Council (see GS-REP-02). "Mysterious Man" is a working title; a proper name may be assigned in a future update.
- GS-NPC-02: MM appears in the UI on exactly four events:
  1. **Overflow-Booster trigger** — MM appears and touches slot 10, which transforms into a glowing Overflow-Booster.
  2. **Rank-Booster (card sacrifice)** — MM appears and presents the available Rank tiers (C, R, L) for the player to choose from.
  3. **TCG-Booster purchase** — MM appears and presents the available TCGs for the player to select.
  4. **Trade success** — MM appears and shows both sides of the completed trade. This triggers **exactly once**: on the first time the player opens the "trade success" notification or the trade detail view. Subsequent openings of the same notification or trade detail do not trigger MM again.
- GS-NPC-03: MM occasionally delivers a short line of dialogue during his appearances. Example lines: *"Interesting choice."* · *"We've met before."* · *"You're getting closer."* · *"The Council is watching."* The dialogue is sparse and chosen pseudo-randomly; he does not speak on every appearance.
- GS-NPC-04: MM's talkativeness and tone adapt to the player's Council Reputation tier (see GS-REP-03): talkative and warm at Enemy tier, progressively quieter through Friendly/Trusted, completely silent at Confident tier.
- GS-NPC-05: MM's role and faction narrative are never announced to players directly. They are revealed progressively through Lore Shards. The deeper the player engages with the game's hidden layer, the more of MM's story they uncover.

## 25. Lore System

- GS-LORE-01: **Lore Shards** are collectible narrative fragments that, when gathered, reveal parts of the TCG Beyond universe story (origin of the Council, the Boosters, the Guilds, the Mysterious Man, the Coiniverse, why some cards are Beyond, the nature of players, the path to the "Beyond Human" title, etc.).
- GS-LORE-02: Lore Shards are awarded through: MP milestones (6 shards), Council Reputation extremes (2 faction shards — mutually exclusive per season), Hidden Achievements (4 shards), and the Embryonist Hidden Title (1 shard). The total number of distinct shards in the Embryon season is **13**:
  - 6 from MP milestones
  - 1 — **MM Embryon Lore Shard** (Enemy tier Reputation extreme)
  - 1 — **Council Embryon Lore Shard** (Confident tier Reputation extreme)
  - 4 from Hidden Achievements
  - 1 from the Embryonist Hidden Title

  Because the Reputation lock (GS-REP-03) prevents reaching both extremes in the same season, a player can obtain at most **12 of the 13 shards** in any single season. Collecting the remaining faction shard would require a separate season in which admins re-enable that season's shards.

- GS-LORE-03: Two **meta-achievements** exist for the Embryon season:
  - **"I choose Rebellion"** — collect all 11 non-Council shards (6 MP + 4 Hidden + Embryonist) plus the **MM Embryon Lore Shard**. Reward: the full MM faction lore narrative becomes readable in-game.
  - **"I seek Order"** — collect all 11 non-MM shards (6 MP + 4 Hidden + Embryonist) plus the **Council Embryon Lore Shard**. Reward: the full Council faction lore narrative becomes readable in-game.
  Meta-achievements do not award an additional Lore Shard. If an admin re-enables a prior season's shards, missing shards are granted directly for free; a player who then holds all 12 required shards has the corresponding meta-achievement retroactively unlocked.

- GS-LORE-04: Embryon Lore Shards and both meta-achievements are not listed in the standard achievement UI. They are part of the hidden discovery layer of the game alongside Hidden Achievements.
- GS-LORE-05: Lore Shards are named after the active **Lore Season**. The first Lore Season is named **"Embryon"**, so all shards in this season are called **Embryon Lore Shards**. Future Lore Seasons will introduce shards under their own season name.
- GS-LORE-06: As the Lore narrative develops across seasons, players may be offered the opportunity to become an official **third faction**, distinct from MM's faction and the Council. This can include faction-choice events, side missions, or cross-faction battles. This is a post-launch, lore-driven feature activated by admin when sufficient player investment is observed.
- GS-LORE-07: Collected Lore Shards are stored and read in the **Library** section (§31, /lore). The Library is the sole in-game interface for accessing Lore Shard content.

## 26. Library

- GS-LIB-01: The **Library** (/lore) is the player-facing interface for all collected Lore Shards. It is accessible from the navigation panel and organised by Lore Season name.
- AC-LIB-02: The Library nav entry is **completely hidden** from the navigation panel until the player unlocks their first Lore Shard. Once visible it remains permanently in the nav regardless of subsequent Reputation resets or season changes.
- GS-LIB-03: Within the Library, **only unlocked Lore Shards are shown** — there are no placeholder tiles, no blank slots, and no indication of the total shard count for locked shards. The page is divided by sub-tabs, one per Lore Season the player has at least one shard from.
- GS-LIB-04: Clicking a Lore Shard opens it in a full-panel overlay. A shard may be re-opened and read any number of times with no restriction. Each shard carries one of the following content formats:
  - **Static image** — a painting, fresco, or illustration (no text)
  - **Image + text** — a picture with accompanying written content (a letter, dialogue, journal entry, or scene description)
  - **Short silent video** — a brief animated clip with no audio, depicting an event or scene from the TCG Beyond universe
