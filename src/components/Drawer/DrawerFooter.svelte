<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** Content of the drawer footer. */
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="cobogo-drawer-footer">
	{@render children()}
</div>

<style>
	.cobogo-drawer-footer {
		padding: 1.5rem;
		border-top: 2px solid var(--concreto-40);
		background-color: var(--papel-10); /* Slightly offset background to anchor the footer */
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 1rem;
		flex-shrink: 0;
	}

	/* Responsive adjustment */
	@media (max-width: 480px) {
		.cobogo-drawer-footer {
			padding: 1rem;
			flex-direction: column-reverse;
			align-items: stretch;
		}
	}
</style>
