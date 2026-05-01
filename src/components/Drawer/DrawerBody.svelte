<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** Content of the drawer body. */
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="cobogo-drawer-body">
	{@render children()}
</div>

<style>
	.cobogo-drawer-body {
		padding: 1.5rem;
		flex-grow: 1;
		overflow-y: auto;
		background-color: var(--papel-00);
		color: var(--concreto-80);
		font-family: var(--font-sans);
		font-size: var(--t-body);
		line-height: 1.5;
	}

	/* Responsive adjustment */
	@media (max-width: 480px) {
		.cobogo-drawer-body {
			padding: 1rem;
		}
	}

	/* Styling the scrollbar for webkit */
	.cobogo-drawer-body::-webkit-scrollbar {
		width: 8px;
	}

	.cobogo-drawer-body::-webkit-scrollbar-track {
		background: var(--papel-10);
	}

	.cobogo-drawer-body::-webkit-scrollbar-thumb {
		background-color: var(--concreto-40);
		border-radius: var(--r-pill);
		border: 2px solid var(--papel-10);
	}
</style>
