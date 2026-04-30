<script lang="ts">
	/**
	 * Breadcrumbs
	 * Caminho hierárquico de navegação.
	 */
	type BreadcrumbItem = {
		label: string;
		href?: string;
	};

	type Props = {
		items: BreadcrumbItem[];
	};

	let { items }: Props = $props();
</script>

<nav class="breadcrumbs" aria-label="Breadcrumb">
	<ol>
		{#each items as item, i}
			{@const isLast = i === items.length - 1}
			<li aria-current={isLast ? 'page' : undefined}>
				{#if item.href && !isLast}
					<a href={item.href} class="breadcrumb-link">{item.label}</a>
				{:else}
					<span class="breadcrumb-current">{item.label}</span>
				{/if}

				{#if !isLast}
					<span class="separator" aria-hidden="true">›</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	.breadcrumbs ol {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin: 0;
		font-size: var(--t-small);
	}

	.breadcrumbs li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.breadcrumb-link {
		color: var(--accent);
		text-decoration: none;
		transition: color 0.2s;
	}

	.breadcrumb-link:hover {
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}

	.breadcrumb-link:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
		border-radius: 2px;
	}

	.breadcrumb-current {
		color: var(--fg);
		font-weight: 700;
	}

	.separator {
		color: var(--fg-muted);
		user-select: none;
	}
</style>
