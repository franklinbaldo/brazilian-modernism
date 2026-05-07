<script lang="ts">
  type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showFirstLast?: boolean;
  };

  let { currentPage, totalPages, onPageChange, showFirstLast = true }: Props = $props();

  let pages = $derived.by(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const firstPage = 1;
    const lastPage = totalPages;
    let middlePages: (number | string)[] = [];
    if (currentPage <= 4) middlePages = [2, 3, 4, 5, '...'];
    else if (currentPage >= totalPages - 3) middlePages = ['...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1];
    else middlePages = ['...', currentPage - 1, currentPage, currentPage + 1, '...'];
    return [firstPage, ...middlePages, lastPage];
  });
</script>

<nav aria-label="pagination">
  <ul>
    {#if showFirstLast}
      <li>
        <button type="button" onclick={() => onPageChange(1)} disabled={currentPage === 1} aria-label="First page">«</button>
      </li>
    {/if}
    <li>
      <button type="button" onclick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page">‹</button>
    </li>

    {#each pages as page}
      {#if page === '...'}
        <li><span aria-hidden="true">…</span></li>
      {:else}
        <li>
          <button
            type="button"
            onclick={() => onPageChange(page as number)}
            aria-current={currentPage === page ? 'page' : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        </li>
      {/if}
    {/each}

    <li>
      <button type="button" onclick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page">›</button>
    </li>
    {#if showFirstLast}
      <li>
        <button type="button" onclick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} aria-label="Last page">»</button>
      </li>
    {/if}
  </ul>
</nav>
