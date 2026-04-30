<script>
  export let placeholder = "Buscar em todo o acervo...";
  export let value = "";
  export let filters = []; // { id, label, active }
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function handleInput(e) {
    dispatch('search', e.target.value);
  }

  function toggleFilter(id) {
    dispatch('filter', id);
  }
</script>

<div class="search-container">
  <div class="search-field">
    <div class="search-icon" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    </div>
    <input 
      type="search"
      {placeholder} 
      bind:value 
      on:input={handleInput}
      class="search-input"
      aria-label={placeholder}
    />
    <button class="search-btn">Buscar</button>
  </div>

  {#if filters.length > 0}
    <div class="filter-bar">
      <span class="filter-label" id="filter-label">Filtrar por:</span>
      <div class="filter-list" role="group" aria-labelledby="filter-label">
        {#each filters as filter}
          <button 
            class="filter-tag" 
            class:active={filter.active}
            on:click={() => toggleFilter(filter.id)}
            aria-pressed={filter.active}
          >
            {filter.label}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .search-container {
    width: 100%;
    margin-bottom: 2rem;
  }

  .search-field {
    display: flex;
    align-items: center;
    background: var(--papel-00);
    border: 2px solid var(--concreto-90);
    padding: 0.5rem;
    position: relative;
    transition: all 0.3s var(--ease-out);
  }

  .search-field:focus-within {
    transform: translateY(-2px);
    box-shadow: var(--shadow-1);
    border-color: var(--azul);
  }

  .search-icon {
    padding: 0 1rem;
    color: var(--concreto-60);
  }

  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    padding: 0.75rem 0;
    font-family: var(--font-sans);
    font-size: 1.125rem;
    color: var(--fg-heading);
    font-weight: 500;
  }

  .search-input:focus {
    outline: none;
  }

  .search-input:focus-visible {
    outline: 2px solid var(--azul);
    outline-offset: 2px;
    border-radius: var(--r-1);
  }

  .search-btn {
    background: var(--azul);
    color: var(--papel-00);
    border: none;
    padding: 0.75rem 1.5rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: background 0.2s;
  }

  .search-btn:hover {
    background: var(--azul-bright);
  }

  /* Filters */
  .filter-bar {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-top: 1.25rem;
  }

  .filter-label {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--fg-muted);
    letter-spacing: 0.1em;
  }

  .filter-list {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .filter-tag {
    background: var(--papel-20);
    border: 1px solid var(--papel-30);
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }

  .filter-tag:hover {
    background: var(--papel-30);
    border-color: var(--concreto-40);
  }

  .filter-tag.active {
    background: var(--azul);
    color: var(--papel-00);
    border-color: var(--azul);
  }

  @media (max-width: 768px) {
    .search-container {
      width: 100%;
    }
  }
</style>
