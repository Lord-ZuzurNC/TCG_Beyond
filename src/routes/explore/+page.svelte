<script lang="ts">
	import SlabWell from '$components/SlabWell.svelte';
	import DraftSlab from '$components/DraftSlab.svelte';
	import RankMark from '$components/RankMark.svelte';
	import { RANKS, POPULATION, type RankId } from '$lib/data/ranks';
	import {
		player,
		slots as initialSlots,
		timers,
		rankBooster,
		tcgBooster,
		seasonNotice,
		boosterContents,
		lastPull,
		type CardDefinition
	} from '$lib/data/fixtures';

	type View = 'tray' | 'draft';

	let slots = $state(initialSlots.map((s) => ({ ...s })));
	let view = $state<View>('tray');
	let drafted = $state<CardDefinition[]>([]);
	let revealedCount = $state(0);
	let stored = $state(false);
	let secondsToSeal = $state(timers.nextSeal);
	let overflowSeconds = $state(timers.overflowRemaining);
	let rankPanel = $state(false);
	let tcgPanel = $state(false);

	const leftmostFilled = $derived(slots.find((s) => s.status !== 'empty')?.index ?? null);
	const firstEmpty = $derived(slots.find((s) => s.status === 'empty')?.index ?? null);
	const sealedCount = $derived(slots.filter((s) => s.status !== 'empty').length);
	/** All ten full: every timer pauses until a booster is opened (GS-EXP-05). */
	const paused = $derived(sealedCount === 10);
	const overflowCount = $derived(slots.filter((s) => s.status === 'overflow').length);
	const plainSealed = $derived(slots.filter((s) => s.status === 'sealed').length);
	const emptyCount = $derived(10 - sealedCount);
	const allRevealed = $derived(drafted.length > 0 && revealedCount >= drafted.length);

	function clock(total: number) {
		const s = Math.max(0, total);
		const h = Math.floor(s / 3600);
		const m = Math.floor((s % 3600) / 60);
		const sec = s % 60;
		return h > 0
			? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
			: `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
	}

	// The 15-minute timer (12 for Challengers) fills the next empty slot in
	// order and resets (GS-EXP-01/02). The server owns this; the client shows it.
	$effect(() => {
		if (paused) return;
		const id = setInterval(() => {
			secondsToSeal -= 1;
			if (overflowSeconds > 0) overflowSeconds -= 1;
			if (secondsToSeal <= 0) {
				const next = slots.find((s) => s.status === 'empty');
				if (next) next.status = 'sealed';
				secondsToSeal = timers.sealInterval;
			}
		}, 1000);
		return () => clearInterval(id);
	});

	function openBooster() {
		if (leftmostFilled === null) return;
		drafted = boosterContents;
		revealedCount = 0;
		stored = false;
		view = 'draft';
	}

	function openRankBooster(rank: RankId) {
		// A Rank-Booster yields 3 cards of the sacrificed rank; card 3 has a 10%
		// chance of landing one rank higher (GS-EXP-17). The server rolls it.
		drafted = boosterContents.slice(0, 3).map((c) => ({ ...c, rank }));
		revealedCount = 0;
		stored = false;
		rankPanel = false;
		view = 'draft';
	}

	function storeAll() {
		// Undecided cards go to the Museum (GS-EXP-30); the opened slot clears
		// and the timer resumes (GS-EXP-32).
		const slot = slots.find((s) => s.index === leftmostFilled);
		if (slot && drafted.length === 7) slot.status = 'empty';
		stored = true;
		view = 'tray';
		drafted = [];
		revealedCount = 0;
	}
</script>

<svelte:head>
	<title>Explore · TCG Beyond</title>
	<meta
		name="description"
		content="Open boosters drawn from every trading card game and decide where each card goes."
	/>
</svelte:head>

<div class="page">
	{#if view === 'tray'}
		<!-- GS-DB-19: players are told in advance of rank recalculation. -->
		<aside class="notice on-plate">
			<p class="cert-caps n-season">Season {seasonNotice.season}</p>
			<p class="n-body prose">
				Rank recalculation in <strong class="serial">{seasonNotice.recalculatesInDays} days</strong>.
				{seasonNotice.promotions} of your cards faces promotion, {seasonNotice.demotions} face demotion.
			</p>
			<a class="n-link" href="/archive">Review affected cards</a>
		</aside>

		<h1>Explore</h1>

		<section class="tray-row" aria-labelledby="tray-h">
			<h2 id="tray-h" class="visually-hidden">Booster slots</h2>

			<div class="left">
				<div class="tray-body">
					<ul class="tray">
						{#each slots as slot (slot.index)}
						<li class="tray-cell">
							<SlabWell
								index={slot.index}
								status={slot.status}
								interactive={slot.index === leftmostFilled}
								glowing={slot.index === 1 && timers.overflowFired}
								fillsIn={slot.index === firstEmpty && !paused ? clock(secondsToSeal) : null}
								onopen={openBooster}
							/>
						</li>
						{/each}
				</ul>

					<p class="census">
					<span class="serial">{plainSealed}</span> sealed
					{#if overflowCount}
						<span class="sep" aria-hidden="true">·</span>
						<span class="serial">{overflowCount}</span> Overflow
					{/if}
					<span class="sep" aria-hidden="true">·</span>
					<span class="serial">{emptyCount}</span> empty
				</p>
				</div>

				<!-- AC-UI-10: Cross-Booster timer below the row; the Challenger
				     6-hour Overflow timer below that, in secondary colour. -->
				<div class="readout" class:paused>
					<div class="r-main">
						<p class="cert-caps">{paused ? 'Timers paused' : 'Next seal'}</p>
						<p class="clock serial">{paused ? '--:--' : clock(secondsToSeal)}</p>
					</div>
					<p class="sub">
						{#if paused}
							All ten slots are full — open one to restart the count
						{:else}
							every {timers.sealInterval / 60} min{#if player.challenger}<span class="chl"
									>&nbsp;· Challenger</span
								>{/if}
						{/if}
					</p>
					{#if player.challenger}
						<p class="overflow-line">
							Overflow to slot 1 in <span class="serial">{clock(overflowSeconds)}</span>
						</p>
					{/if}
				</div>
			</div>

			<div class="dedicated">
				<!-- Rank-Booster: sacrifice an owned card of that rank (GS-EXP-16). -->
				<div class="ded">
					<button
						class="ded-head"
						type="button"
						aria-expanded={rankPanel}
						onclick={() => {
							rankPanel = !rankPanel;
							tcgPanel = false;
						}}
					>
						<span class="ded-title">Rank-Booster</span>
						<span class="ded-cost cert-caps">Sacrifice 1 card · 3 cards out</span>
					</button>
					{#if rankPanel}
						<div class="panel">
							<!-- Commission #3: the Mysterious Man presents these tiers
							     (GS-NPC-02.2); until his design exists the tiers are
							     presented plainly. -->
							<p class="cert-caps panel-h">Choose a tier to sacrifice</p>
							<div class="tiers">
								{#each rankBooster.available as r (r)}
									<button
										class="tier"
										type="button"
										style="--rank: var({RANKS[r].varName}); --rank-ink: var({RANKS[r]
											.inkVarName})"
										onclick={() => openRankBooster(r)}
									>
										<span class="tier-band"><RankMark rank={r} size={12} /></span>
										<span>{RANKS[r].name}</span>
									</button>
								{/each}
							</div>
						</div>
					{/if}
				</div>

				<!-- TCG-Booster, with the Challenger daily free status (GS-EXP-14). -->
				<div class="ded">
					<button
						class="ded-head"
						type="button"
						aria-expanded={tcgPanel}
						onclick={() => {
							tcgPanel = !tcgPanel;
							rankPanel = false;
						}}
					>
						<span class="ded-title">TCG-Booster</span>
						<span class="ded-cost cert-caps">
							{#if player.challenger && timers.tcgBoosterReady}
								<span class="free">Daily free ready</span>
							{:else}
								<span class="serial">{tcgBooster.price.toLocaleString('en')}</span> Coiniverse
							{/if}
						</span>
					</button>
					{#if tcgPanel}
						<div class="panel">
							<p class="cert-caps panel-h">Choose a game</p>
							<ul class="games">
								{#each tcgBooster.choices as g (g)}
									<li><button class="game" type="button" onclick={openBooster}>{g}</button></li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
			</div>
		</section>

		<section class="footer-row">
			<!-- Last pull: the most recent slab still on the counter. -->
			<article
				class="last on-plate"
				style="--rank: var({RANKS[lastPull.rank].varName}); --rank-ink: var({RANKS[lastPull.rank]
					.inkVarName})"
			>
				<p class="cert-caps">{stored ? 'Just stored' : 'Last stored'}</p>
				<p class="last-name">{lastPull.name}</p>
				<p class="last-meta">
					<span class="last-rank">
						<span class="last-band"><RankMark rank={lastPull.rank} size={11} /></span>
						{RANKS[lastPull.rank].name}
					</span>
					<span class="serial"
						>#{lastPull.position.toLocaleString('en')} / {POPULATION.toLocaleString('en')}</span
					>
				</p>
				<p class="last-tcg">{lastPull.tcg} · {lastPull.set}</p>
			</article>

			{#if !player.challenger}
				<!-- AC-UI-11: hidden for Challengers. -->
				<aside class="sub-banner">
					<p class="sb-title">Challenger</p>
					<p class="sb-body prose">
						12-minute seals, an Overflow to slot 1 every 6 hours, a free TCG-Booster daily, and a
						daily WCAT pass.
					</p>
					<a class="sb-cta" href="/settings/sub">See what changes</a>
				</aside>
			{/if}
		</section>
	{:else}
		<!-- ---------------- draft ---------------- -->
		<div class="head draft-head">
			<h1>
				{drafted.length === 3 ? 'Rank-Booster' : 'Booster'} — slot {leftmostFilled}
			</h1>
			<p class="progress serial" aria-live="polite">
				{revealedCount} of {drafted.length} graded
			</p>
		</div>

		<ol class="draft" style="--n: {drafted.length}">
			{#each drafted as card, i (card.id)}
				<DraftSlab
					{card}
					ordinal={i + 1}
					revealed={i < revealedCount}
					next={i === revealedCount}
					onreveal={() => (revealedCount = i + 1)}
				/>
			{/each}
		</ol>

		<div class="draft-foot">
			{#if allRevealed}
				<button class="store" type="button" onclick={storeAll}>
					Seal all to Museum
				</button>
				<p class="foot-note prose">Cards sold or listed above are already gone; the rest are stored.</p>
			{:else}
				<p class="foot-note prose">
					Turn the leftmost slab to grade it. Leaving mid-draft stores every remaining card
					automatically — nothing is lost.
				</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.page {
		padding: var(--s-5) var(--s-4) var(--s-6);
		max-width: 62rem;
		margin-inline: auto;
	}

	/* ---- season notice ---- */

	.notice {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: var(--s-2) var(--s-4);
		padding: var(--s-2) var(--s-4);
		margin-bottom: var(--s-5);
		border: 1px solid var(--plate-edge);
		border-radius: var(--slab-radius);
		box-shadow: var(--shadow-slab);
	}

	.n-season {
		margin: 0;
		color: var(--plate-ink-soft);
	}

	.n-body {
		margin: 0;
		font-size: var(--t-label);
		color: var(--ink-soft);
		flex: 1;
		min-width: 18ch;
	}

	.n-body strong {
		color: var(--ink);
		font-weight: 600;
	}

	.n-link {
		font-size: var(--t-small);
		font-weight: 700;
		color: var(--plate-ink);
		text-decoration: none;
		white-space: nowrap;
	}

	.n-link:hover {
		text-decoration: underline;
	}

	/* ---- head ---- */

	h1 {
		margin-bottom: var(--s-3);
		font-size: var(--t-display);
		font-stretch: 76%;
		letter-spacing: -0.02em;
	}

	.left {
		display: grid;
		gap: var(--s-3);
		align-content: start;
	}

	.readout {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--s-2) var(--s-4);
		padding: var(--s-2) var(--s-4);
		border-radius: var(--slab-radius);
		background: var(--well);
		border: 1px solid var(--line-soft);
		box-shadow: var(--well-inner);
	}

	.r-main {
		display: flex;
		align-items: baseline;
		gap: var(--s-3);
	}

	.readout p {
		margin: 0;
	}

	.clock {
		font-size: var(--t-head);
		font-weight: 600;
		line-height: 1.1;
		color: var(--ink);
	}

	.readout.paused .clock {
		color: var(--ink-faint);
	}

	.sub {
		font-size: var(--t-small);
		color: var(--ink-faint);
	}

	.chl {
		color: var(--accent);
	}

	.overflow-line {
		padding-left: var(--s-4);
		border-left: 1px solid var(--line-soft);
		font-size: var(--t-small);
		color: var(--ink-soft);
	}

	/* ---- tray ---- */

	.tray-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 11.5rem;
		gap: var(--s-5);
		align-items: start;
	}

	.tray {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: var(--s-3);
	}

	.tray-cell {
		min-width: 0;
	}

	.dedicated {
		display: grid;
		gap: var(--s-3);
	}

	.ded {
		border-radius: var(--slab-radius);
		background: var(--acrylic);
		border: 1px solid var(--acrylic-edge);
		box-shadow: var(--shadow-slab);
		overflow: hidden;
	}

	.ded-head {
		display: grid;
		gap: 2px;
		width: 100%;
		padding: var(--s-2) var(--s-3);
		text-align: left;
	}

	.ded-head:hover {
		background: color-mix(in oklab, var(--acrylic-bevel) 30%, var(--acrylic));
	}

	.ded-title {
		font-size: var(--t-label);
		font-weight: 700;
		font-stretch: 84%;
	}

	.ded-cost {
		color: var(--ink-faint);
	}

	.free {
		color: var(--positive);
	}

	.panel {
		padding: var(--s-3);
		border-top: 1px solid var(--plate-edge);
	}

	.panel-h {
		margin: 0 0 var(--s-2);
	}

	.tiers {
		display: grid;
		gap: var(--s-1);
	}

	.tier {
		display: flex;
		align-items: center;
		gap: var(--s-2);
		padding: 0 var(--s-2) 0 0;
		font-size: var(--t-small);
		font-weight: 600;
		border: 1px solid var(--line);
		border-radius: var(--r-field);
		overflow: hidden;
	}

	.tier-band {
		display: grid;
		place-items: center;
		align-self: stretch;
		padding: var(--s-2) var(--s-2);
		background: var(--rank);
		color: var(--rank-ink);
	}

	.tier:hover {
		border-color: var(--ink-faint);
	}

	.games {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1px;
	}

	.game {
		display: block;
		width: 100%;
		padding: var(--s-1) var(--s-2);
		text-align: left;
		font-size: var(--t-small);
		border-radius: var(--r-field);
	}

	.game:hover {
		background: var(--acrylic);
	}

	/* ---- footer row ---- */

	.footer-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: var(--s-4);
		margin-top: var(--s-4);
		align-items: start;
	}

	/* The tray itself: a recessed box with a lip, so the wells sit in something. */
	.tray-body {
		padding: var(--s-4) var(--s-3) var(--s-3);
		border-radius: calc(var(--well-radius) + 5px);
		border: 1px solid var(--line);
		border-top-color: var(--acrylic-bevel);
		box-shadow: var(--shadow-slab);
		/* The population report ruled behind everything, as OWN-WORLD names it. */
		background:
			repeating-linear-gradient(
				to bottom,
				transparent 0 21px,
				color-mix(in oklab, var(--ink-faint) 9%, transparent) 21px 22px
			),
			var(--inset);
	}

	.census {
		display: flex;
		flex-wrap: wrap;
		gap: var(--s-1) var(--s-2);
		margin: var(--s-3) 0 0;
		padding-top: var(--s-2);
		border-top: 1px solid var(--line);
		font-size: var(--t-small);
		color: var(--ink-faint);
	}

	.census .serial {
		color: var(--ink-soft);
		font-weight: 600;
	}

	.sep {
		color: var(--line);
	}

	.last {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: center;
		gap: var(--s-2) var(--s-5);
		padding: var(--s-3) var(--s-4);
		border-radius: var(--slab-radius);
		border: 1px solid var(--plate-edge);
		box-shadow: var(--shadow-slab);
	}

	.last p {
		margin: 0;
	}

	.last-name {
		font-size: var(--t-title);
		font-weight: 700;
		font-stretch: 84%;
	}

	.last-meta {
		display: flex;
		align-items: center;
		gap: var(--s-3);
		font-size: var(--t-small);
		color: var(--ink-faint);
	}

	.last-rank {
		display: flex;
		align-items: center;
		gap: var(--s-2);
		color: var(--ink);
		font-weight: 600;
	}

	.last-band {
		display: grid;
		place-items: center;
		padding: 3px 5px;
		border-radius: var(--r-hair);
		background: var(--rank);
		color: var(--rank-ink);
	}

	.last-tcg {
		grid-column: 2;
		font-size: var(--t-small);
		color: var(--ink-faint);
	}

	.sub-banner {
		padding: var(--s-4);
		border-radius: var(--slab-radius);
		background: var(--acrylic);
		border: 1px solid var(--acrylic-edge);
	}

	.sb-title {
		margin: 0;
		font-size: var(--t-base);
		font-weight: 700;
		font-stretch: 84%;
	}

	.sb-body {
		margin: var(--s-1) 0 var(--s-3);
		font-size: var(--t-label);
		color: var(--ink-soft);
	}

	.sb-cta {
		font-size: var(--t-small);
		font-weight: 600;
		color: var(--accent);
		text-decoration: none;
	}

	/* ---- draft ---- */

	.draft-head {
		align-items: baseline;
	}

	.progress {
		margin: 0;
		font-size: var(--t-label);
		color: var(--ink-soft);
	}

	.draft {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(var(--n), minmax(0, 1fr));
		gap: var(--s-3);
		align-items: start;
		perspective: 1400px;
	}

	.draft-foot {
		margin-top: var(--s-6);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--s-4);
	}

	.store {
		padding: var(--s-3) var(--s-6);
		font-size: var(--t-base);
		font-weight: 700;
		font-stretch: 84%;
		letter-spacing: 0.02em;
		border-radius: var(--slab-radius);
		background: var(--accent);
		color: var(--accent-ink);
		box-shadow: var(--shadow-slab);
	}

	.store:hover {
		box-shadow: var(--shadow-lift);
	}

	.foot-note {
		margin: 0;
		font-size: var(--t-small);
		color: var(--ink-faint);
	}

	/* ---- narrower desktop ---- */

	@media (max-width: 1180px) {
		.tray-row {
			grid-template-columns: minmax(0, 1fr);
		}

		.dedicated {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.draft {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	@media (max-width: 899px) {
		.page {
			padding: var(--s-4) var(--s-4) var(--s-7);
		}

		.head {
			gap: var(--s-4);
		}

		.head {
			flex-direction: column;
			align-items: stretch;
		}

		.readout {
			display: block;
			min-width: 0;
		}

		.r-main {
			display: flex;
			align-items: baseline;
			gap: var(--s-3);
		}

		.overflow-line {
			margin-top: var(--s-2) !important;
			padding: var(--s-2) 0 0;
			border-left: none;
			border-top: 1px solid var(--line-soft);
		}

		/* The label rides on the meta line instead of stacking above the name,
		   so it never reads as a kicker over a heading. */
		.last {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--s-2);
		}

		.last > .cert-caps {
			display: none;
		}

		.last-tcg {
			grid-column: 1;
		}

		.notice {
			display: grid;
			grid-template-columns: minmax(0, 1fr) auto;
			align-items: baseline;
		}

		.n-season {
			grid-row: 2;
			grid-column: 1;
		}

		.n-body {
			grid-row: 1;
			grid-column: 1 / -1;
		}

		.n-link {
			grid-row: 2;
			grid-column: 2;
		}

		.footer-row {
			grid-template-columns: minmax(0, 1fr);
		}

		.draft {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 560px) {
		.tray {
			gap: var(--s-2);
		}

		.dedicated {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
