<script lang="ts">
	/**
	 * FilterBar Component
	 *
	 * A horizontal bar of active filters applied to lists or tables.
	 *
	 * @prop {Array<{key: string, label: string, value: string}>} filters - The currently active filters.
	 * @prop {(key: string) => void} [onClear] - Callback to clear a specific filter by key.
	 * @prop {() => void} [onClearAll] - Callback to clear all filters.
	 */
	let {
		filters = [],
		onClear,
		onClearAll
	}: {
		filters: Array<{ key: string; label: string; value: string }>;
		onClear?: (key: string) => void;
		onClearAll?: () => void;
	} = $props();
</script>

{#if filters.length > 0}
	<div class="filter-bar" role="group" aria-label="Filtros ativos">
		{#each filters as filter (filter.key)}
			<button
				type="button"
				class="chip"
				onclick={() => onClear?.(filter.key)}
				aria-label="Remover filtro de {filter.label}: {filter.value}"
			>
				<span class="chip-label">{filter.label}:</span>
				<span class="chip-value">{filter.value}</span>
				<span class="chip-close" aria-hidden="true">×</span>
			</button>
		{/each}

		{#if filters.length > 1}
			<button
				type="button"
				class="clear-all"
				onclick={() => onClearAll?.()}
			>
				Limpar tudo
			</button>
		{/if}
	</div>
{/if}

<style>
	.filter-bar {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		align-items: center;
		font-family: var(--font-sans);
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		background-color: var(--papel-20);
		padding: 0.25rem 0.625rem;
		border-radius: var(--r-pill);
		font-size: var(--t-small);
		color: var(--fg);
		border: 1px solid transparent;
		cursor: pointer;
		transition: background-color var(--dur-2) var(--ease-out), border-color var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out);
	}

	.chip:hover {
		background-color: var(--bg-sunken);
		border-color: var(--border);
	}

	.chip:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.chip-label {
		font-weight: 700;
	}

	.chip-close {
		margin-left: 0.125rem;
		font-size: 1.1em;
		line-height: 1;
		font-weight: bold;
		opacity: 0.6;
	}

	.chip:hover .chip-close {
		opacity: 1;
		color: var(--vermelho);
	}

	.clear-all {
		background: none;
		border: none;
		color: var(--accent);
		font-size: var(--t-small);
		font-weight: 700;
		cursor: pointer;
		padding: 0.25rem 0.5rem;
		text-decoration: underline;
		text-underline-offset: 0.2em;
		border-radius: var(--r-soft);
	}

	.clear-all:hover {
		color: var(--fg-heading);
	}

	.clear-all:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		.chip {
			transition: none;
		}
	}
</style>
