<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<any> & {
		/** Number of columns to span on mobile/default. Defaults to 12. */
		span?: number;
		/** Number of columns to span on tablet (>= 480px). */
		sm?: number;
		/** Number of columns to span on tablet (>= 768px). */
		md?: number;
		/** Number of columns to span on desktop (>= 1024px). */
		lg?: number;
		/** Column to start at. Can be useful for offsets. */
		start?: number;
		/** Render the container as a specific HTML element. Defaults to 'div'. */
		as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'nav';
		/** Optional CSS classes. */
		class?: string;
		/** Optional inline styles. */
		style?: string;
		/** The content of the column. */
		children: Snippet;
	};

	let {
		span = 12,
		sm,
		md,
		lg,
		start,
		as = 'div',
		class: className = '',
		style: customStyle = '',
		children,
		...rest
	}: Props = $props();

	// We'll use CSS variables to pass the spanning values to the media queries
	let colStyle = $derived([
		`--col-span: ${span}`,
		sm ? `--col-sm: ${sm}` : '',
		md ? `--col-md: ${md}` : '',
		lg ? `--col-lg: ${lg}` : '',
		start ? `grid-column-start: ${start}` : '',
		customStyle
	].filter(Boolean).join('; '));
</script>

<svelte:element
	this={as}
	class="cobogo-column {className}"
	style={colStyle}
	{...rest}
>
	{@render children()}
</svelte:element>

<style>
	.cobogo-column {
		grid-column-end: span var(--col-span);
	}

	@media (min-width: 480px) {
		.cobogo-column {
			grid-column-end: span var(--col-sm, var(--col-span));
		}
	}

	@media (min-width: 768px) {
		.cobogo-column {
			grid-column-end: span var(--col-md, var(--col-sm, var(--col-span)));
		}
	}

	@media (min-width: 1024px) {
		.cobogo-column {
			grid-column-end: span var(--col-lg, var(--col-md, var(--col-sm, var(--col-span))));
		}
	}
</style>
