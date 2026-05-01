<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** Content of the dialog body. */
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="cobogo-dialog-body">
	{@render children()}
</div>

<style>
	.cobogo-dialog-body {
		padding: 1.5rem;
		background-color: var(--papel-00);
		color: var(--concreto-80);
		font-family: var(--font-sans);
		font-size: var(--t-body);
		line-height: 1.6;
		overflow-y: auto;
		/* Allow body to shrink so header/footer stay visible */
		flex-shrink: 1;
		flex-grow: 1;
	}

	@media (max-width: 480px) {
		.cobogo-dialog-body {
			padding: 1rem;
		}
	}

	/* Generic scrollbar styling for the concretely defined body */
	.cobogo-dialog-body::-webkit-scrollbar {
		width: 8px;
	}

	.cobogo-dialog-body::-webkit-scrollbar-track {
		background: var(--papel-10);
	}

	.cobogo-dialog-body::-webkit-scrollbar-thumb {
		background-color: var(--concreto-40);
		border-radius: var(--r-pill);
		border: 2px solid var(--papel-10);
	}
</style>
