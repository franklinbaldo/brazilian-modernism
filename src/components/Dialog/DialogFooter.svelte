<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** Content of the dialog footer. */
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="cobogo-dialog-footer">
	{@render children()}
</div>

<style>
	.cobogo-dialog-footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 1rem;
		padding: 1.5rem;
		background-color: var(--papel-10); /* Slight offset from body to delineate footer */
		border-top: 2px solid var(--concreto-80);
		/* Concreto: Sharp corners internally where sections meet */
		border-radius: 0 0 var(--r-1) var(--r-1);
		flex-shrink: 0;
	}

	@media (max-width: 480px) {
		.cobogo-dialog-footer {
			padding: 1rem;
			flex-direction: column-reverse; /* Primary actions on top on mobile */
			align-items: stretch;
		}
	}
</style>
