> TCG Beyond — Architecture
> Prefix: `AC-*`
> Version: v0.15 — 2026-09-20
> v0.15: AC-UI-10 and GS-EXP-22 permit the 10-slot booster stack to wrap into
> two rows of five, so each slot can render at object scale. Order is unchanged.
> Companion documents: [game-system.md](game-system.md) (GS-*) · [game-rules.md](game-rules.md) (GR-*)

## Contents

- [Contents](#contents)
- [1. Real-Time Communication](#1-real-time-communication)
- [2. Notifications](#2-notifications)
- [3. Security](#3-security)
  - [3.1 Game Integrity](#31-game-integrity)
  - [3.2 Multi-Account Policy](#32-multi-account-policy)
  - [3.3 API Rate Limiting](#33-api-rate-limiting)
- [4. Development Principles](#4-development-principles)
- [5. UI/UX Specification](#5-uiux-specification)
  - [5.1 Global Layout](#51-global-layout)
  - [5.2 Explore (/explore)](#52-explore-explore)
  - [5.3 Museum (/museum)](#53-museum-museum)
  - [5.4 Trade (/trade)](#54-trade-trade)
  - [5.5 Market (/market)](#55-market-market)
  - [5.6 Joute (/joute)](#56-joute-joute)
  - [5.7 Guild (/guild)](#57-guild-guild)
  - [5.8 Chat (/messages)](#58-chat-messages)
  - [5.9 Friends (/friends)](#59-friends-friends)
  - [5.10 Profile (/me)](#510-profile-me)
  - [5.11 Success (/success)](#511-success-success)
  - [5.12 Leaderboard (/leaderboard)](#512-leaderboard-leaderboard)
  - [5.13 Settings (/settings)](#513-settings-settings)
  - [5.14 Library (/lore)](#514-library-lore)
- [6. Economy Ledger](#6-economy-ledger)
- [7. Audit Log](#7-audit-log)
- [8. Admin Panel](#8-admin-panel)

---

## 1. Real-Time Communication

- AC-RT-01: **Market listing pages** shall maintain a **WebSocket connection** while a player is viewing a listing. This delivers real-time bid amounts, new bidder usernames, and the auction countdown with no perceptible delay.
- AC-RT-02: **Joute and WCAT** match pages shall use **short-interval polling (≤5 s)** to fetch turn changes, HP deltas, and column elimination events while the match is active.
- AC-RT-03: **Chat** conversations and the **notification bell** shall use **medium-interval polling (≤30 s)**. Sub-second delivery is not required for these channels.

## 2. Notifications

- AC-NOT-01: Every notification event always generates an **in-app notification** visible in the bell icon and the Notifications screen. In-app delivery is not adjustable. Players may additionally enable **Push** (browser/device push, delivered even when the app is closed) and **Email** delivery per notification in Settings > Notifications (AC-UI-44). Account-critical notifications (marked ★) cannot be disabled.
- AC-NOT-02: The Notifications screen shows all unread notifications and the 10 most recent read notifications.
- AC-NOT-03: Read notifications beyond the most recent 10 are purged.
- AC-NOT-04: Unread notifications are retained for **14 days** then automatically purged.
- AC-NOT-05: **Delivery channel reference**:
  - All in-app notifications are delivered via medium-interval polling (AC-RT-03).
  - Market-related events that also update a page live use the WebSocket channel (AC-RT-01).
  - Joute/WCAT in-match events are also delivered via short-poll on the match page (AC-RT-02).

- AC-NOT-06: Full notification list. Default: **Push ✓** = push enabled by default, **Email ✓** = email enabled by default. Adjustable column: P = push can be toggled, E = email can be toggled.

  **Market**

  | #     | Event                                       |      Also live via       | Push default | Email default | Adj.  |
  | ----- | :------------------------------------------ | :----------------------: | :----------: | :-----------: | :---: |
  | MKT-1 | New bid placed on your listing              | WebSocket (listing page) |      ✓       |       —       |  P E  |
  | MKT-2 | You were outbid on a card                   |         Polling          |      ✓       |       —       |  P E  |
  | MKT-3 | Your listing sold (you received Coiniverse) |         Polling          |      ✓       |       —       |  P E  |
  | MKT-4 | Your listing expired with no bids           |         Polling          |      —       |       —       |  P E  |
  | MKT-5 | You won a bid (card added to Museum)        |         Polling          |      ✓       |       —       |  P E  |
  | MKT-6 | You lost a bid (auction ended, outbid)      |         Polling          |      —       |       —       |  P E  |

  **Exchange / Trade**

  | #     | Event                                                | Also live via | Push default | Email default | Adj.  |
  | ----- | :--------------------------------------------------- | :-----------: | :----------: | :-----------: | :---: |
  | TRD-1 | Trade proposition received                           |    Polling    |      ✓       |       —       |  P E  |
  | TRD-2 | Counter-offer received on your trade                 |    Polling    |      ✓       |       —       |  P E  |
  | TRD-3 | Your trade was accepted *(MM appears on first open)* |    Polling    |      ✓       |       —       |  P E  |
  | TRD-4 | Your trade was refused                               |    Polling    |      —       |       —       |  P E  |
  | TRD-5 | Pending trade cancelled by counterpart               |    Polling    |      ✓       |       —       |  P E  |

  **Friends**

  | #     | Event                   | Also live via | Push default | Email default | Adj.  |
  | ----- | :---------------------- | :-----------: | :----------: | :-----------: | :---: |
  | FRD-1 | Friend request received |    Polling    |      ✓       |       —       |  P E  |
  | FRD-2 | Friend request accepted |    Polling    |      —       |       —       |  P E  |

  **Joute**

  | #     | Event                                         |      Also live via      | Push default | Email default | Adj.  |
  | ----- | :-------------------------------------------- | :---------------------: | :----------: | :-----------: | :---: |
  | JOU-1 | Joute invitation received (vs friend / guild) |         Polling         |      ✓       |       —       |  P E  |
  | JOU-2 | Your joute invitation was accepted            |         Polling         |      ✓       |       —       |  P E  |
  | JOU-3 | Your joute invitation was declined            |         Polling         |      —       |       —       |  P E  |
  | JOU-4 | Your turn in an active joute                  | Short-poll (match page) |      ✓       |       —       |   P   |
  | JOU-5 | Joute result (win / loss / idle forfeit)      |         Polling         |      —       |       —       |  P E  |

  **WCAT**

  | #     | Event                                        |       Also live via       | Push default | Email default | Adj.  |
  | ----- | :------------------------------------------- | :-----------------------: | :----------: | :-----------: | :---: |
  | WCT-1 | WCAT bracket full — tournament starting      |          Polling          |      ✓       |       —       |  P E  |
  | WCT-2 | Your WCAT match round is ready               |          Polling          |      ✓       |       —       |  P E  |
  | WCT-3 | WCAT bracket update (live, while spectating) | Short-poll (bracket page) |      —       |       —       |   —   |
  | WCT-4 | WCAT result / final placement and prize      |          Polling          |      ✓       |       —       |  P E  |

  **Guild**

  | #     | Event                                                 | Also live via | Push default | Email default | Adj.  |
  | ----- | :---------------------------------------------------- | :-----------: | :----------: | :-----------: | :---: |
  | GLD-1 | Guild invitation received                             |    Polling    |      ✓       |       —       |  P E  |
  | GLD-2 | Member joined your guild *(Leader / Manager only)*    |    Polling    |      —       |       —       |  P E  |
  | GLD-3 | Member left or was excluded *(Leader / Manager only)* |    Polling    |      —       |       —       |  P E  |

  **Chat**

  | #       | Event                             |      Also live via      | Push default | Email default | Adj.  |
  | ------- | :-------------------------------- | :---------------------: | :----------: | :-----------: | :---: |
  | CHT-1   | Someone replied to your message   | Medium-poll (chat page) |      ✓       |       —       |  P E  |
  | CHT-2 ★ | Chat mute applied to your account |         Polling         |      ✓       |       —       |   —   |

  **Season / Admin**

  | #     | Event                                     | Also live via | Push default | Email default | Adj.  |
  | ----- | :---------------------------------------- | :-----------: | :----------: | :-----------: | :---: |
  | SEA-1 | Season change announcement (admin-posted) |    Polling    |      —       |       ✓       |  P E  |
  | SEA-2 | Season has ended / rewards distributed    |    Polling    |      ✓       |       ✓       |  P E  |
  | SEA-3 | Upcoming rank recalculation preview       |    Polling    |      —       |       ✓       |  P E  |
  | SEA-4 | New TCG / card set added to the database  |    Polling    |      —       |       —       |  P E  |
  | SEA-5 | Event-Booster available (admin event)     |    Polling    |      ✓       |       —       |  P E  |

  **Exploration (Challenger only)**

  | #     | Event                                      | Also live via | Push default | Email default | Adj.  |
  | ----- | :----------------------------------------- | :-----------: | :----------: | :-----------: | :---: |
  | EXP-1 | Slot 1 Overflow ready (6-hour timer fired) |    Polling    |      ✓       |       —       |   P   |
  | EXP-2 | Daily free TCG-Booster available           |    Polling    |      —       |       —       |   P   |

  **Account**

  | #       | Event                                             | Also live via | Push default | Email default | Adj.  |
  | ------- | :------------------------------------------------ | :-----------: | :----------: | :-----------: | :---: |
  | ACC-1 ★ | Account pre-deletion warning (6-month inactivity) |  Email only   |      —       |       ✓       |   —   |
  | ACC-2 ★ | Subscription billing failed                       |  Email only   |      —       |       ✓       |   —   |
  | ACC-3   | Subscription renewed                              |    Polling    |      —       |       ✓       |   E   |
  | ACC-4   | Subscription cancelled / benefits lapsed          |    Polling    |      —       |       ✓       |   E   |

  **Achievements**

  | #     | Event                | Also live via | Push default | Email default | Adj.  |
  | ----- | :------------------- | :-----------: | :----------: | :-----------: | :---: |
  | ACH-1 | Achievement unlocked |    Polling    |      —       |       —       |  P E  |

## 3. Security

- AC-SEC-01: All client-server communication shall be encrypted (TLS).
- AC-SEC-02: Passwords, emails, payment methods, and subscription status shall be stored encrypted at rest.
- AC-SEC-03: All authenticated API endpoints validate a secure token on every request.
- AC-SEC-04: Security measures shall be proportional — sufficient for protection without degrading performance.
- AC-SEC-05: No sensitive data is ever logged or transmitted in plaintext.

### 3.1 Game Integrity

- AC-SEC-06: All random outcomes affecting the Museum, Coiniverse, Rank, Market, Boosters, or any Competition result shall be **generated and validated server-side**. No client-supplied value shall influence a random outcome.
- AC-SEC-07: The client shall **never be trusted** to determine rewards, card ownership, card values, booster results, or battle outcomes. All authoritative state resides on the server; client state is a display cache only.
- AC-SEC-08: All Museum mutations (card additions, removals, transfers) shall be **atomic and server-authoritative**. A mutation either fully succeeds or fully rolls back; partial state is never persisted.

### 3.2 Multi-Account Policy

- GS-SEC-09: **Multi-account ownership is globally permitted.** A player may own and operate more than one TCG Beyond account. However, using multiple accounts to manipulate gameplay, the economy, auctions, rankings, achievements, or any other game system is **prohibited and sanctionable**. Sanctions are applied per-account and may include temporary restriction or permanent ban of all accounts involved. (See also GS-MKT-18 for the Market-specific application of this policy.)

### 3.3 API Rate Limiting

- AC-SEC-10: The API shall enforce **rate limits** per endpoint category to prevent abuse. Default thresholds (admin-configurable per GS-DEV-01):

  **Authentication endpoints**

  | Limit                                 | Value                                  |
  | :------------------------------------ | :------------------------------------- |
  | Login attempts per account            | 5 / 15 min                             |
  | Password reset requests per account   | 2 / 24 h                               |
  | Failed login attempts before lock-out | 5 / 15 min → account locked for 30 min |

  **Gameplay / exploration endpoints** (per authenticated player)

  | Action                               | Limit      |
  | :----------------------------------- | :--------- |
  | Friend invitations sent              | 20 / 1 h   |
  | Trade proposals or counter-proposals | 30 / 1 h   |
  | Joute challenge invitations sent     | 20 / 1 h   |
  | Market listing creations             | 10 / 1 min |
  | Market bids placed                   | 60 / 1 min |

  **Chat endpoints** (per authenticated player)

  | Action        | Limit      |
  | :------------ | :--------- |
  | Messages sent | 5 / 10 sec |
  | Messages sent | 30 / 1 min |

  **Unauthenticated requests** (per IP address)

  | Action          | Limit       |
  | :-------------- | :---------- |
  | Any API request | 100 / 1 min |

## 4. Development Principles

- GS-DEV-01: Any value that may change over time (guild EXP formula, season rewards, WCAT fees, booster probabilities, mute durations, timer durations, etc.) shall be stored in a configuration layer (database or config file) and never hardcoded.
- AC-DEV-02: Each TCG integration is a plugin module (see GS-DB-21); the same plugin interface applies whether the contributor is internal or external.
- AC-DEV-03: **Integer-only currency** — all Coiniverse amounts shall be stored, computed, and transmitted as non-negative integers. Floating-point arithmetic is forbidden for any Coiniverse calculation. Any calculation that would yield a fractional result is truncated (rounded down) to the nearest integer.
- AC-DEV-04: **Algorithm versioning** — whenever any scoring formula (SECCU weights, UPS, CVS, PW/HP/EV) is modified, the previous formula version shall be archived with a version ID and timestamp. Computed values stored in the database retain the formula-version ID that produced them, enabling full reproducibility of historical evaluations.
- AC-DEV-05: **Event-driven idempotent state** — all player-state mutations (booster opened, card acquired, Coiniverse credited, achievement unlocked, etc.) shall be implemented as events, each carrying a unique auto-generated UID. If the server receives an event UID it has already processed, it logs the duplicate as `SKIPPED — already processed` and takes no further action.

## 5. UI/UX Specification

### 5.1 Global Layout

- AC-UI-01: The app uses a full-height **collapsible/expandable left navigation panel** as the primary navigation. The panel displays the app name at the top, all section links in the order defined in AC-UI-04, and a **Release Notes** link at the bottom (redirects to /release).
- AC-UI-02: A persistent **top bar** (always visible, above all content) shows: the player's total Coiniverse balance and a notification icon. Clicking the notification icon deploys a notification dropdown; clicking it again or clicking "See all" redirects to the notifications page.
- AC-UI-03: The active section in the nav panel is highlighted in the primary colour with a secondary colour background. Inactive sections use the primary text colour on the base background.
- AC-UI-04: Navigation sections and sub-sections appear in this fixed order:
  1. Explore (/explore)
  2. Museum → Museum (/museum) · Decks (/deck) · Global Archive (/archive)
  3. Trade → Received (/trade/received) · Sent (/trade/sent) · History (/trade/history)
  4. Market → Global Market (/market) · Current Bids (/market/bids) · My Cards (/market/sell) · History (/market/history)
  5. Joute → VS Friend/Guild (/joute/duel/near) · VS Random (/joute/duel/random) · WCAT (/joute/wcat) · History (/joute/history)
  6. Guild → My Guild: Members (/guild/my/members) · Chat (/guild/my/messages) · Deck (/guild/my/deck) · Create (/guild/create)
  7. Chat → Global (/messages/global) + individual conversation threads
  8. Friends → Friendlist (/friends) · Invitations (/friends/invit)
  9. Profile (/me)
  10. Library (/lore) *(hidden until the player's first Lore Shard is unlocked — see AC-LIB-02)*
  11. Success (/success)
  12. Leaderboard → Player Leaderboard (/leaderboard): Competitive Season (#comp) · Competitive Lifetime (#comp-lifetime) · Collection Season (#coll) · Collection Lifetime (#coll-lifetime); Guild Leaderboard (/leaderboard/guild): Season (#season) · Lifetime (#lifetime)
  13. Settings → General (/settings) · Notifications (/settings/notif) · Subscription: Subscribe (/settings/sub) · Payment (/settings/sub/pay) · History (/settings/sub/history); Danger Zone (/settings/danger); Legals (/settings/legal)
  14. **Admin** (/admin) — visible **only** to accounts with the Admin role; completely hidden from all other players. Full sub-section structure defined in §34.
- AC-UI-05: The default route (/) redirects to /explore.
- AC-UI-06: The UI shall support 4 **Catppuccin** themes: Latte (light), Frappé, Macchiato, Mocha (default). Colour tokens adapt appropriately per theme.
- AC-UI-07: The UI shall be **responsive** across desktop, tablet, and smartphone; mouse and touch interactions are both supported.
- AC-UI-08: The UI shall follow **W3C HTML/CSS** standards and modern accessibility guidelines (WCAG, ARIA).
- AC-UI-09: All text input fields in chat (private, guild, global) allow: A–Z, a–z, 0–9, special characters, and emoticons. Embedded links, images, and GIFs are not permitted.

### 5.2 Explore (/explore)

- AC-UI-10: The top area shows the 10 booster slot icons in reading order, slot 1 first. The row **may wrap into two rows of five** so each slot renders at object scale; order is preserved left-to-right, top-to-bottom, and is never re-sorted. A booster slot is clickable only when it is the leftmost filled slot. Slot states: empty (outlined), filled (solid), Overflow (shiny). Below the row: the 15-minute Cross-Booster timer. Below that, in secondary colour, the Challenger 6-hour Overflow timer (Challenger accounts only). To the right of the booster row, the Rank-Booster and TCG-Booster dedicated slots are stacked vertically.
- AC-UI-11: A subscription banner is displayed at the bottom of the Explore page for non-Challenger players; it is hidden for Challengers.

### 5.3 Museum (/museum)

- AC-UI-12: The Museum section has three sub-tabs displayed as a top tab bar: Museum (default), Decks, Global Archive.
- AC-UI-13: **Museum > Museum**: Cards are displayed in a paginated grid (50 per page). Controls above the grid: search field (activates at 3+ characters), sort/filter options, tag filter (single-select, includes "No Tag" option), and Doublon filter. A "Select" mode toggle allows multi-card selection for bulk tag assignment or bulk Council sell. Clicking a card opens its detail panel in-page (no navigation). Pagination changes pages without navigation.
- AC-UI-14: **Museum > Decks**: All decks shown with name and a 9-card thumbnail. Clicking a deck opens a detail view with options to replace cards, rename, delete, or save.
- AC-UI-15: **Museum > Global Archive**: Defaults to the "Known" filter. Same search and filter controls as Museum. Undiscovered cards show as a **card-shaped silhouette** (no name, no TCG, no set shown) and are not clickable. Discovered cards show picture, name, TCG; clicking opens full card details.

### 5.4 Trade (/trade)

- AC-UI-16: The Trade section has three sub-tabs: Received (default), Sent, History.
- AC-UI-17: Each trade is shown as a two-column box: player's offered cards on the left, counterpart's offered cards on the right. Cards are listed as **"Rank – Card Name"** in the rank's colour (colour tone adapts to the active theme). Clicking the trade box (outside the button zone) opens a detail overlay showing each card's picture with rank aura, name, PW/HP/EV, and TCG name.
  - Received: Accept (green) · Modify (yellow) · Cancel (red) buttons.
  - Sent: Modify (yellow) · Cancel (red) buttons.
- AC-UI-18: **Trade > History**: Trades in reverse chronological order. Same visual layout. For multi-step trades (offer → counter-offer(s) → accept), the full chain is shown in the detail overlay with the most recent step on top.

### 5.5 Market (/market)

- AC-UI-19: The Market section has four sub-tabs: Global Market (default), Current Bids, My Cards, History.
- AC-UI-20: **Market > Global Market**: Real-time updates. Cards shown with rank aura and a small info box (current highest or starting bid + remaining time). Clicking a card opens a bid modal: left = full card detail; top-right = seller username; middle-right = starting bid; bottom-right = bid input field pre-filled with the starting bid or 10% above the current highest bid. Submitting a bid adds the card to Current Bids.
- AC-UI-21: **Market > Current Bids**: Cards the player has bid on. Shows current highest bid, remaining time, and whether the player is the top bidder. Clicking a card navigates to its dedicated bid page (/market/bids/\<UUID\>) with full bid history and bidding controls.
- AC-UI-22: **Market > My Cards**: Same card display as Current Bids, for cards the player listed. Clicking opens the same bid detail page; the player cannot bid on their own card.
- AC-UI-23: **Market > History**: All bids won and cards sold, in reverse chronological order. Won bids show the price paid in red; successful sales show proceeds in green.

### 5.6 Joute (/joute)

- AC-UI-24: The Joute section has four sub-tabs: VS Friend/Guild (default), VS Random, WCAT, History.
- AC-UI-25: **Joute > VS Friend/Guild** (/joute/duel/near): A "Send a Duel to" button opens a modal with two tabs (Friends, Guild). Received duel requests are listed in reverse chronological order with Accept / Deny buttons. Accepted matches open at /joute/duel/near/\<UUID\>.
- AC-UI-26: **Joute > VS Random** (/joute/duel/random): An "Enter the Arena" button broadcasts the player's willingness to duel. A live-updating list shows other broadcasting players (one accept at a time). Matched fights open at /joute/duel/random/\<UUID\>.
- AC-UI-27: **Joute > WCAT** (/joute/wcat): Shows active tournament(s) and a "Create / Join a WCAT" option. Players join by paying the entry fee or using a pass; they are notified when the tournament starts. Multiple WCATs may exist simultaneously. Any player may view any live bracket. Inside a WCAT (/joute/wcat/\<UUID\>): full bracket visible to all, current match has its own UUID, results update the bracket in real-time, eliminated players may still spectate.
- AC-UI-28: **Joute > History** (/joute/history): Two sub-tabs — **Duels** (all VS Friend/Guild/Council results in reverse chronological order) and **WCAT** (WCAT placements, reward if any, and final bracket snapshot).

### 5.7 Guild (/guild)

- AC-UI-29: The Guild section defaults to "My Guild" if the player belongs to one, otherwise to "Create". Guilds are invitation-only.
- AC-UI-30: **Guild > My Guild** (/guild/my): A general overview shows the guild Blason, Name, Description, Level, EXP progress to next level, Leaderboard position, and Guild WCAT win/participation record. Three sub-tabs: Members, Chat, Deck.
- AC-UI-31: **Members** (/guild/my/members): Members listed by role (Leader → Managers → Rookies) with join dates. Each row has quick-action buttons: add friend (if not already), request duel, send message, propose trade.
- AC-UI-32: **Chat** (/guild/my/messages): Guild-wide chat room for all members.
- AC-UI-33: **Deck** (/guild/my/deck): The guild's shared 9-card deck.
- AC-UI-34: **Guild > Create** (/guild/create): Form with fields — Name (A–Z a–z 0–9 `-_!?'` and space; max 16 chars; unique), Description (A–Z a–z 0–9 `-_!?'"#(){}+=%^&*~@/\.,` space and emoticons; max 1024 chars), Blason (composed from icons/symbols, blason shapes, and a colour). On submit, redirect to /guild/my.

### 5.8 Chat (/messages)

- AC-UI-35: The Chat section lists all open conversations. A delete button is available per conversation. Clicking opens the conversation at /messages/chat/\<UUID\>.
- AC-UI-36: **Chat > Global** (/messages/global): Server-wide chat open to all players. Same character restriction as private chats.

### 5.9 Friends (/friends)

- AC-UI-37: **Friends > Friendlist** (/friends): Lists all friends. Per-row quick buttons: chat, propose trade, request duel. Challenger badge shown beside the name if applicable. Clicking a friend opens a detail view: name, profile picture, Challenger badge, number of discovered cards, number of unique cards in museum, Leaderboard rank, and buttons for chat, trade, duel, and remove friend.
- AC-UI-38: **Friends > Invitations** (/friends/invit): Sent invitations (cancel button) and received invitations (accept / deny buttons).

### 5.10 Profile (/me)

- AC-UI-39: The Profile page shows the player's full profile and provides links to their Friends list and Guild page.

### 5.11 Success (/success)

- AC-UI-40: Achievements are displayed in collapsible categories. A progress bar at the top shows total achievements unlocked / total available. Unclaimed completed achievements remain in black-and-white until the player clicks to claim the reward; after claiming they turn coloured and advance the progress bar.

### 5.12 Leaderboard (/leaderboard)

- AC-UI-41: **Leaderboard > Player Leaderboard** (/leaderboard): Two large tabs — **Competitive** and **Collection**. Each tab has two sub-tabs: **Season** (default) and **Lifetime**. Each view shows the top 10 players plus the current player's own rank. Each row: profile picture, name, score (PLS or CS), position. Players who are inactive for the season (GS-LDB-01) are not shown on the Season view.
- AC-UI-42: **Leaderboard > Guild Leaderboard** (/leaderboard/guild): Top 10 guilds plus the current player's guild. Each row: Blason, guild name, EXP score, position. Sub-tabs: **Season** (default) · **Lifetime**.

### 5.13 Settings (/settings)

- AC-UI-43: **Settings > General**: Username (once/month), email, password, profile picture, and log out.
- AC-UI-44: **Settings > Notifications**: For each notification in AC-NOT-06, the player may independently toggle **Push** and **Email** delivery on or off. Account-critical notifications (★) are shown as read-only and cannot be toggled. The page is organised by the same category groups as the notification table (Market, Exchange, Friends, Joute, WCAT, Guild, Chat, Season/Admin, Exploration, Account, Achievements). In-app delivery is always active and is not shown as a toggle.
- AC-UI-45: **Settings > Subscription**: Three sub-tabs — Subscribe (shows Challenger benefits, subscription button triggering secure payment via the chosen platform); Payment (shows the name of the active payment platform; changing platform redirects to the new platform's secure flow); History (full subscription history).
- AC-UI-46: **Settings > Danger Zone**: Account deletion with double confirmation. On confirm: player logged out, all cards and Coiniverse transferred to Council, all personal data permanently erased. Re-registration with the same email creates a blank new account and triggers the tutorial again.
- AC-UI-50: **Settings > Legals** (/settings/legal): Displays the TCG licence table (GS-SET-12) with a link button for each TCG's official terms URL. Each entry also shows the reviewer name and last-verified date in small secondary text.


### 5.14 Library (/lore)

- AC-UI-47: The Library nav entry is hidden until the player's first Lore Shard is unlocked (AC-LIB-02). Once revealed, it appears at position 10 in the nav panel (between Profile and Success).
- AC-UI-48: The Library page displays a horizontal **Season tab bar** at the top. Each tab is labelled with the Lore Season name (e.g., "Embryon"). Only seasons in which the player holds at least one shard appear as tabs.
- AC-UI-49: Within a season tab, unlocked shards are shown as a **card grid** (no placeholder tiles for locked shards). Clicking a shard opens a full-screen overlay with the shard's content. The overlay has a close button and no other navigation.

## 6. Economy Ledger

- AC-ECO-01: The system shall maintain an **Economy Ledger** — an immutable, append-only record of every Coiniverse or card transfer.
- AC-ECO-02: Each ledger entry shall contain:

  | Field                      | Description                                                                                                                                                                                                                                           |
  | :------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Transaction UID            | Unique auto-generated identifier. For bilateral transfers (e.g. a trade) the same base UID is used, suffixed **`-in`** for the initiator side and **`-out`** for the receiver side                                                                    |
  | Timestamp                  | Server UTC timestamp at the moment the transaction was recorded                                                                                                                                                                                       |
  | Source Account             | Originating account: Player UID, `COUNCIL`, `SYSTEM`, or `VOID`                                                                                                                                                                                       |
  | Destination Account        | Receiving account: same types as Source                                                                                                                                                                                                               |
  | Transaction Type           | `coiniverse` or `card`                                                                                                                                                                                                                                |
  | Amount                     | If type is `coiniverse`: a positive integer. If type is `card`: one or more `CardDefinitionID_InstanceUID` values, comma-separated                                                                                                                    |
  | Reason                     | Enumerated type: `market_sale`, `market_commission`, `wcat_fee`, `wcat_prize`, `wcat_commission`, `council_sale`, `rank_booster`, `tcg_booster`, `guild_reveal`, `guild_purchase`, `admin_adjustment`, `achievement_reward`, `season_reward`, `trade` |
  | Related Object/Event UID   | Reference to the originating event (listing UID, WCAT UID, booster event UID, trade UID, etc.)                                                                                                                                                        |
  | Source balance before      | If type is `coiniverse`: Source's Coiniverse balance before the transaction. If type is `card`: Source's total card count before                                                                                                                      |
  | Source balance after       | Same as above, after the transaction                                                                                                                                                                                                                  |
  | Destination balance before | If type is `coiniverse`: Destination's Coiniverse balance before. If type is `card`: Destination's total card count before                                                                                                                            |
  | Destination balance after  | Same as above, after the transaction                                                                                                                                                                                                                  |

  *Example — PlayerA trades 2 cards to PlayerB for 500 Coiniverse:*
  - Entry `UID-in`: type=`card`, source=PlayerA, dest=PlayerB, amount=`DefA1_InstX,DefA2_InstY`, reason=`trade`
  - Entry `UID-out`: type=`coiniverse`, source=PlayerB, dest=PlayerA, amount=500, reason=`trade`

- AC-ECO-03: Ledger records are **absolutely immutable** — no actor, including the server owner, may modify or delete any ledger record or ledger file.
- AC-ECO-04: Ledger access is read-only and restricted to admin roles per the access matrix in AC-AUDIT-07. **Individual players cannot view any ledger data** — neither the full ledger nor their own entries. The ledger is an internal audit tool only.
- AC-ECO-05: A new Ledger file is created automatically on the **1st day of each month at UTC 00:00**. Previous monthly files are retained permanently and remain accessible for auditing.

## 7. Audit Log

- AC-AUDIT-01: The system shall maintain separate **Audit Log** domains. Each log entry includes: timestamp, actor (Player UID, Admin ID, or `SYSTEM`), action type, affected object UID, and outcome. Logs are append-only and are never modified or deleted.
- AC-AUDIT-02: **In-Game Log** — records player actions and game state changes:
  - Booster opens (all types) with resulting card Instance UIDs
  - Card discoveries (global first-discovery events)
  - Cards sold to Council
  - Market listings created, bids placed, listings expired, listings sold
  - Exchange propositions sent, countered, accepted, refused, expired
  - Joute starts and results (all modes)
  - WCAT entries, match results, final placements
  - Guild join / leave / exclusion events
  - Daily Challenge completions
  - Council Reputation changes (reason, delta, new score)
  - Achievement and Title unlocks
  - Lore Shard unlocks
- AC-AUDIT-03: **Admin Action Log** — records all actions performed through the Admin Panel:
  - Card database syncs (TCG, timestamp, record count, success/failure)
  - SLM evaluation runs and human review decisions
  - Season start, end, snapshot, and reward distribution events
  - Event creation (all types)
  - Economy adjustments and manual Coiniverse grants
  - Player bans, unbans, and manual account actions
  - Chat permanent ban reviews and decisions recorded at `/admin/appeals` (reviewer ID, decision, timestamp)
  - Achievement and Title creation / modification
  - Lore content uploads and assignments
  - Game configuration changes (before and after values)
  - Council Bank and Museum admin operations
  - All Admin Action Log entries record the **admin account ID** that performed the action.
- AC-AUDIT-04: **Subscription & Payment Log** — records:
  - Subscription creations and renewals (success / failure with reason)
  - Grace period activations
  - Subscription cancellations (manual or auto after 3 failures)
  - Chargeback events and outcomes
  - Coiniverse purchases (amount, real-money equivalent, payment reference)
- AC-AUDIT-05: **Log retention** — Audit logs are managed by **logrotate**. General log entries are retained for **3 months**. Any log entry that contains personal player data (Player UID linked to identifiable content) is retained for a maximum of **1 month** in compliance with GDPR data minimisation requirements.
- AC-AUDIT-06: **Server Log** — records infrastructure-level events that do not contain personal player data:
  - Server starts, restarts, and shutdowns
  - Service errors and crash events
  - Database connection events and query failures
  - Monthly sync job runs, outcomes, and per-TCG success/failure
  - External TCG API call failures (source, error code, timestamp)
  - Payment webhook receipts and outcomes (reference IDs only, no financial data)
  - Rate-limit triggers and performance anomalies
  - Scheduled task executions (Ledger file rotation, log rotation, etc.)
- AC-AUDIT-07: **Log access matrix** — read-only access per admin role (GS-AUTH-06):

  | Log Domain                 | Owner | Developer | Super Admin | Support | Moderator |
  | :------------------------- | :---: | :-------: | :---------: | :-----: | :-------: |
  | Economy Ledger             |   R   |     R     |      R      |    R    |           |
  | In-Game Log                |   R   |     R     |      R      |    R    |     R     |
  | Admin Action Log           |   R   |     R     |      R      |         |           |
  | Subscription & Payment Log |   R   |           |             |    R    |           |
  | Server Log                 |   R   |     R     |             |         |           |

## 8. Admin Panel

- AC-ADMIN-01: When a player account holds any **Admin role** (GS-AUTH-06), a dedicated **Admin** section (/admin) appears as item 14 in the navigation panel (AC-UI-04). It is completely hidden from all non-admin accounts and is never indexed or linked from any player-facing page.
- AC-ADMIN-02: The Admin section contains the following sub-sections:

  | Route                       | Purpose                                                                          |
  | :-------------------------- | :------------------------------------------------------------------------------- |
  | /admin/events               | View and manage all active, upcoming, and past events                            |
  | /admin/events/create        | Event creation hub                                                               |
  | /admin/events/create/custom | Create a custom Event-Booster or special event                                   |
  | /admin/events/create/wcat   | Create a Council WCAT or Guild WCAT                                              |
  | /admin/council              | Manage Council Bank balance and Council Museum contents                          |
  | /admin/mm                   | Manage Mysterious Man dialogue lines and appearance trigger configuration        |
  | /admin/seasons              | Manage seasons: start, end, configure reward table, trigger rank snapshot        |
  | /admin/db                   | Card database management: resync, TCG plugin status, sync history                |
  | /admin/db/review            | SLM Evaluation human review queue (flagged cards below 75% confidence)           |
  | /admin/players              | Player management: view, search, ban, unban, manual account actions              |
  | /admin/conf                 | Game configuration: all admin-configurable values (GS-DEV-01)                    |
  | /admin/modo                 | Chat moderation: view active mutes, contest outcomes, ban history                |
  | /admin/appeals              | Chat permanent ban human review: view AI-flagged cases, approve or reject ban    |
  | /admin/eco                  | Economy adjustment: manual Coiniverse grant or deduction (creates Ledger entry)  |
  | /admin/success              | Achievement and Title management                                                 |
  | /admin/success/create-a     | Create a new Achievement definition                                              |
  | /admin/success/create-t     | Create a new Title definition                                                    |
  | /admin/lore                 | Lore content management: upload shard content, assign to shards and seasons      |
  | /admin/announce             | Publish in-game announcements, rank change previews, and broadcast notifications |
  | /admin/logs                 | Audit Log viewer — visible domains depend on the admin's role (AC-AUDIT-07)      |

- AC-ADMIN-03: Every action taken via the Admin Panel is automatically recorded in the Admin Action Log (AC-AUDIT-03). No admin action that modifies game or player state may bypass logging.
- AC-ADMIN-04: The sub-sections visible to a given admin depend on their role (GS-AUTH-06). At minimum: Moderator — /admin/modo, /admin/appeals, and /admin/logs (In-Game domain only); Support — /admin/players (read-only) and /admin/logs; Developer — /admin/db, /admin/db/review, /admin/conf (read-only), /admin/logs; Super Admin and Owner — all sub-sections. Full per-sub-section access matrix is defined in the tech-stack specification.
