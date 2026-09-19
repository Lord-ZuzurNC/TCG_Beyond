<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import NavRail from '$components/NavRail.svelte';
	import TopBar from '$components/TopBar.svelte';

	let { children } = $props();

	let collapsed = $state(false);
	let drawerOpen = $state(false);

	const current = $derived(page.url.pathname);

	// Close the phone drawer on navigation.
	$effect(() => {
		current;
		drawerOpen = false;
	});
</script>

<a class="skip-link" href="#main">Skip to content</a>

<div class="app" class:collapsed>
	<NavRail
		{current}
		{collapsed}
		open={drawerOpen}
		ontoggle={() => (collapsed = !collapsed)}
		onclose={() => (drawerOpen = false)}
	/>
	<TopBar onmenu={() => (drawerOpen = true)} />
	<main id="main" tabindex="-1">
		{@render children()}
	</main>
</div>

<style>
	.app {
		display: grid;
		grid-template-columns: var(--rail-w) minmax(0, 1fr);
		grid-template-rows: var(--bar-h) minmax(0, 1fr);
		grid-template-areas:
			'rail bar'
			'rail main';
		min-height: 100dvh;
		transition: grid-template-columns 260ms var(--ease-print);
	}

	.app.collapsed {
		grid-template-columns: var(--rail-w-collapsed) minmax(0, 1fr);
	}

	main {
		grid-area: main;
		min-width: 0;
	}

	main:focus {
		outline: none;
	}

	@media (max-width: 899px) {
		.app,
		.app.collapsed {
			grid-template-columns: minmax(0, 1fr);
			grid-template-areas:
				'bar'
				'main';
		}
	}
</style>
