<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		/** The title of the drawer. */
		title: string;
		/** Heading level for accessibility. Defaults to 'h2'. */
		headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		/** Optional snippet for additional actions (e.g. secondary buttons) next to the close button. */
		actions?: Snippet;
	};

	let { title, headingLevel = 'h2', actions }: Props = $props();

	// Retrieve close function provided by Drawer.svelte via context.
	// We use a getter function to satisfy Svelte 5 context reactivity expectations.
	const getDrawerClose = getContext<() => () => void>('dialogClose');
	const closeDrawer = $derived(getDrawerClose ? getDrawerClose() : () => {});
</script>

<div class="cobogo-drawer-header">
	<svelte:element this={headingLevel} class="cobogo-drawer-title">
		{title}
	</svelte:element>

	<div class="cobogo-drawer-actions">
		{#if actions}
			{@render actions()}
		{/if}
		<button class="cobogo-drawer-close" onclick={closeDrawer} aria-label="Close drawer">
			<svg viewBox="0 0 100 100" width="24" height="24" aria-hidden="true" focusable="false">
				<!-- Cross icon -->
				<path
					d="M20 20 L80 80 M80 20 L20 80"
					stroke="currentColor"
					stroke-width="12"
					stroke-linecap="square"
				/>
			</svg>
		</button>
	</div>
</div>

<style>
	.cobogo-drawer-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem;
		border-bottom: 2px solid var(--concreto-40);
		background-color: var(--papel-00);
		flex-shrink: 0;
	}

	/* Responsive adjustment */
	@media (max-width: 480px) {
		.cobogo-drawer-header {
			padding: 1rem;
		}
	}

	.cobogo-drawer-title {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--t-h4);
		font-weight: 700;
		color: var(--concreto-90);
	}

	/* Fluid typography fallback */
	@media (min-width: 768px) {
		.cobogo-drawer-title {
			font-size: var(--t-h3);
		}
	}

	.cobogo-drawer-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.cobogo-drawer-close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		padding: 0.5rem;
		margin: -0.5rem; /* Increase touch target without pushing layout */
		color: var(--concreto-60);
		cursor: pointer;
		border-radius: var(--r-1);
		transition:
			color var(--dur-2) var(--ease-out),
			background-color var(--dur-2) var(--ease-out);
	}

	.cobogo-drawer-close:hover {
		color: var(--vermelho);
		background-color: var(--papel-10);
	}

	.cobogo-drawer-close:focus-visible {
		outline: 2px solid var(--azul);
		outline-offset: 2px;
	}
</style>
