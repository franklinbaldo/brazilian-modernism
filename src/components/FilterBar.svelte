<script lang="ts">
  let {
    filters = [],
    onClear,
    onClearAll,
  }: {
    filters: Array<{ key: string; label: string; value: string }>;
    onClear?: (key: string) => void;
    onClearAll?: () => void;
  } = $props();
</script>

{#if filters.length > 0}
  <div role="group" aria-label="Filtros ativos" data-filter-bar>
    {#each filters as filter (filter.key)}
      <button
        type="button"
        data-chip
        data-removable
        onclick={() => onClear?.(filter.key)}
        aria-label={`Remover filtro de ${filter.label}: ${filter.value}`}
      >
        <strong>{filter.label}:</strong>
        <span>{filter.value}</span>
        <span aria-hidden="true">×</span>
      </button>
    {/each}

    {#if filters.length > 1}
      <button type="button" data-intent="link" onclick={() => onClearAll?.()}>Limpar tudo</button>
    {/if}
  </div>
{/if}
