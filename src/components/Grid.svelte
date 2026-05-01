<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<any> & {
		/** Number of columns in the grid. Defaults to 12. */
		columns?: number;
		/** Gap between columns. Uses standard CSS units. Defaults to 'var(--r-soft)' which is typically 8px, though we may override it for 12 col grids. */
		gap?: string;
		/** Render the container as a specific HTML element. Defaults to 'div'. */
		as?: 'div' | 'section' | 'article' | 'main' | 'form' | 'fieldset';
		/** Optional CSS classes to apply to the container. */
		class?: string;
		/** Optional inline styles. */
		style?: string;
		/** The content to place inside the grid. */
		children: Snippet;
	};

	let {
		columns = 12,
		gap = '2rem',
		as = 'div',
		class: className = '',
		style: customStyle = '',
		children,
		...rest
	}: Props = $props();

	// Calculate inline styles dynamically
	let gridStyle = $derived([
		`display: grid`,
		`grid-template-columns: repeat(${columns}, 1fr)`,
		`gap: ${gap}`,
		customStyle
	].filter(Boolean).join('; '));
</script>

<svelte:element
	this={as}
	class="cobogo-grid {className}"
	style={gridStyle}
	{...rest}
>
	{@render children()}
</svelte:element>

<style>
	.cobogo-grid {
		width: 100%;
		/* Mobile responsive stacking behavior can be handled here or inside Column.svelte.
		   We'll let Column.svelte handle responsiveness by spanning all columns on mobile by default. */
	}
</style>
