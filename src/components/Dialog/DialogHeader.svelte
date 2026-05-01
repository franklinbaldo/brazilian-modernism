<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		/** The title of the dialog. */
		title: string;
		/** Accessible heading level for the title (h2-h6). Defaults to h2. */
		headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		/** Optional right-aligned action (e.g., custom button). Replaces default close button. */
		action?: Snippet;
		/** Whether to show the default close button. Defaults to true. */
		showClose?: boolean;
	};

	let { title, headingLevel = 'h2', action, showClose = true }: Props = $props();

	// Retrieve the context getter and call it to get the close function.
	// Providing a fallback noop to prevent SSR crashes if context is unexpectedly missing.
	const getDialogClose = getContext<() => () => void>('dialogClose');
	const closeDialog = getDialogClose ? getDialogClose() : () => {};
</script>

<div class="cobogo-dialog-header">
	<svelte:element this={headingLevel} class="cobogo-dialog-title">
		{title}
	</svelte:element>

	<div class="cobogo-dialog-actions">
		{#if action}
			{@render action()}
		{:else if showClose}
			<button class="cobogo-dialog-close" onclick={closeDialog} aria-label="Close dialog">
				<svg viewBox="0 0 100 100" class="icon">
					<line x1="20" y1="20" x2="80" y2="80" />
					<line x1="80" y1="20" x2="20" y2="80" />
				</svg>
			</button>
		{/if}
	</div>
</div>

<style>
	.cobogo-dialog-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem;
		border-bottom: 2px solid var(--concreto-80);
		background-color: var(--papel-00);
		/* Concreto: Sharp corners internally where sections meet or start */
		border-radius: var(--r-1) var(--r-1) 0 0;
	}

	/* Responsive overrides */
	@media (max-width: 480px) {
		.cobogo-dialog-header {
			padding: 1rem;
		}
	}

	.cobogo-dialog-title {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--t-h3);
		color: var(--concreto-90);
		line-height: 1.1;
	}

	@media (max-width: 480px) {
		.cobogo-dialog-title {
			font-size: var(--t-h4);
		}
	}

	.cobogo-dialog-close {
		background: transparent;
		border: none;
		padding: 0.5rem;
		cursor: pointer;
		color: var(--concreto-80);
		border-radius: var(--r-1);
		transition:
			background-color var(--dur-2) var(--ease-out),
			color var(--dur-2) var(--ease-out);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cobogo-dialog-close:hover {
		background-color: var(--papel-10);
		color: var(--vermelho);
	}

	.cobogo-dialog-close:focus-visible {
		outline: 2px solid var(--azul);
		outline-offset: 2px;
	}

	.icon {
		width: 16px;
		height: 16px;
		stroke: currentColor;
		stroke-width: 12;
		stroke-linecap: square;
	}
</style>
