<script lang="ts">
	/**
	 * Pagination
	 * Paginação de lista com truncate e navegação.
	 */
	type Props = {
		currentPage: number;
		totalPages: number;
		onPageChange: (page: number) => void;
		showFirstLast?: boolean;
	};

	let {
		currentPage,
		totalPages,
		onPageChange,
		showFirstLast = true
	}: Props = $props();

	// Calculate which pages to show
	let pages = $derived.by(() => {
		if (totalPages <= 7) {
			// Show all pages if 7 or fewer
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		// Truncate logic
		const firstPage = 1;
		const lastPage = totalPages;
		let middlePages: (number | string)[] = [];

		if (currentPage <= 4) {
			middlePages = [2, 3, 4, 5, '...'];
		} else if (currentPage >= totalPages - 3) {
			middlePages = ['...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1];
		} else {
			middlePages = ['...', currentPage - 1, currentPage, currentPage + 1, '...'];
		}

		return [firstPage, ...middlePages, lastPage];
	});

	function handleFirst() {
		onPageChange(1);
	}

	function handlePrev() {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	}

	function handleNext() {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	}

	function handleLast() {
		onPageChange(totalPages);
	}
</script>

<nav class="pagination" aria-label="Pagination Navigation">
	{#if showFirstLast}
		<button
			class="pagination-btn nav-btn"
			onclick={handleFirst}
			disabled={currentPage === 1}
			aria-disabled={currentPage === 1}
			aria-label="First page"
		>
			«
		</button>
	{/if}

	<button
		class="pagination-btn nav-btn"
		onclick={handlePrev}
		disabled={currentPage === 1}
		aria-disabled={currentPage === 1}
		aria-label="Previous page"
	>
		‹
	</button>

	{#each pages as page}
		{#if page === '...'}
			<span class="pagination-ellipsis" aria-hidden="true">...</span>
		{:else}
			<button
				class="pagination-btn {currentPage === page ? 'active' : ''}"
				onclick={() => onPageChange(page as number)}
				aria-current={currentPage === page ? 'page' : undefined}
				aria-label="Page {page}"
			>
				{page}
			</button>
		{/if}
	{/each}

	<button
		class="pagination-btn nav-btn"
		onclick={handleNext}
		disabled={currentPage === totalPages}
		aria-disabled={currentPage === totalPages}
		aria-label="Next page"
	>
		›
	</button>

	{#if showFirstLast}
		<button
			class="pagination-btn nav-btn"
			onclick={handleLast}
			disabled={currentPage === totalPages}
			aria-disabled={currentPage === totalPages}
			aria-label="Last page"
		>
			»
		</button>
	{/if}
</nav>

<style>
	.pagination {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	.pagination-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border: 1px solid var(--border);
		background: var(--bg-raised);
		color: var(--fg);
		font-weight: 700;
		border-radius: var(--r-1); /* Typically a small standard radius for buttons */
		cursor: pointer;
		transition: all 0.2s;
		font-family: inherit;
		font-size: 0.875rem;
		padding: 0;
	}

	.pagination-btn:hover:not(:disabled) {
		background: var(--papel-20);
	}

	.pagination-btn:focus-visible {
		outline: 2px solid var(--azul);
		outline-offset: 2px;
	}

	.pagination-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.pagination-btn.active {
		background: var(--azul);
		color: var(--papel-00);
		border-color: var(--azul);
	}

	.pagination-ellipsis {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		color: var(--fg-muted);
		font-weight: 700;
	}

	@media (prefers-reduced-motion: reduce) {
		.pagination-btn {
			transition: none;
		}
	}
</style>
