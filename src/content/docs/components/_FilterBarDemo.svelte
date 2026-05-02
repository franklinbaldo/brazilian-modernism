<script lang="ts">
  import FilterBar from '../../../components/FilterBar.svelte';

  let filters = $state([
    { key: 'status', label: 'Status', value: 'Ativo' },
    { key: 'role', label: 'Função', value: 'Arquiteto' },
    { key: 'city', label: 'Cidade', value: 'São Paulo' }
  ]);

  function handleClear(key: string) {
    filters = filters.filter(f => f.key !== key);
  }

  function handleClearAll() {
    filters = [];
  }

  function resetFilters() {
    filters = [
      { key: 'status', label: 'Status', value: 'Ativo' },
      { key: 'role', label: 'Função', value: 'Arquiteto' },
      { key: 'city', label: 'Cidade', value: 'São Paulo' }
    ];
  }
</script>

<div class="demo-container br-component-class">
  <FilterBar {filters} onClear={handleClear} onClearAll={handleClearAll} />

  {#if filters.length === 0}
    <div class="empty-state">
      <p>Nenhum filtro ativo.</p>
      <button class="reset-btn" onclick={resetFilters}>Restaurar filtros</button>
    </div>
  {/if}
</div>

<style>
  .demo-container {
    padding: 2rem;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--r-soft);
    margin: 2rem 0;
    min-height: 120px;
  }

  .empty-state {
    padding: 1rem 0;
    color: var(--fg-muted);
    font-size: var(--t-small);
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .reset-btn {
    background: none;
    border: 1px solid var(--border);
    padding: 0.25rem 0.5rem;
    border-radius: var(--r-soft);
    font-size: var(--t-small);
    cursor: pointer;
    color: var(--fg);
  }

  .reset-btn:hover {
    background: var(--papel-00);
  }
</style>
