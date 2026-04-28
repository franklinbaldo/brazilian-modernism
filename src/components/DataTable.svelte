<script>
  export let headers = []; // { key, label, align: 'left' | 'right' | 'center' }
  export let data = [];
  export let caption = "";
  export let variant = "default"; // default, compact, striped
</script>

<div class="table-container {variant}">
  {#if caption}
    <div class="table-caption kicker">{caption}</div>
  {/if}
  
  <table class="data-table">
    <thead>
      <tr>
        {#each headers as header}
          <th style="text-align: {header.align || 'left'}">{header.label}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data as row}
        <tr>
          {#each headers as header}
            <td style="text-align: {header.align || 'left'}">
              {#if header.key === 'status'}
                <span class="status-badge {row[header.key].toLowerCase()}">{row[header.key]}</span>
              {:else}
                {row[header.key]}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-container {
    width: 100%;
    margin: 2rem 0;
    overflow-x: auto;
  }

  .table-caption {
    margin-bottom: 1rem;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-sans);
    font-size: var(--t-small);
  }

  th {
    padding: 1rem 0.75rem;
    background: var(--bg-sunken);
    border-bottom: 2px solid var(--concreto-90);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 800;
    color: var(--fg-heading);
  }

  td {
    padding: 0.875rem 0.75rem;
    border-bottom: 1px solid var(--papel-30);
    color: var(--fg);
  }

  tr:hover td {
    background: var(--papel-00);
  }

  /* Status Badges */
  .status-badge {
    font-size: 10px;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 2px;
    text-transform: uppercase;
  }

  .status-badge.ativo, .status-badge.concluido { background: var(--verde-soft); color: var(--verde); }
  .status-badge.pendente { background: var(--ocre-soft); color: var(--ocre); }
  .status-badge.cancelado { background: var(--vermelho-soft); color: var(--vermelho); }

  /* Compact Variant */
  .compact td {
    padding: 0.5rem 0.75rem;
    font-size: 12px;
  }

  /* Striped Variant */
  .striped tr:nth-child(even) td {
    background: rgba(0,0,0,0.02);
  }
</style>
