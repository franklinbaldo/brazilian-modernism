<script lang="ts">
  type PropDef = {
    name: string;
    type: string;
    default?: string;
    required?: boolean;
    description: string;
  };

  type Props = {
    props: PropDef[];
  };

  let { props = [] }: Props = $props();
</script>

<div class="table-wrapper">
  <table class="props-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {#each props as prop}
        <tr>
          <td class="prop-name">
            <code>{prop.name}</code>
            {#if prop.required}
              <span class="required" title="Required">*</span>
            {/if}
          </td>
          <td class="prop-type"><code>{prop.type}</code></td>
          <td class="prop-default">
            {#if prop.default}
              <code>{prop.default}</code>
            {:else}
              <span class="empty">-</span>
            {/if}
          </td>
          <td class="prop-desc">{prop.description}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-wrapper {
    overflow-x: auto;
    margin: 2rem 0;
    border-radius: var(--r-2, 8px);
    border: 1px solid var(--concreto-30, #e0e0e0);
  }

  .props-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-sans);
    font-size: var(--t-sm, 0.875rem);
    text-align: left;
  }

  th, td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--concreto-30, #e0e0e0);
  }

  th {
    background: var(--bg-soft, #f8f9fa);
    font-weight: 600;
    color: var(--fg, #212529);
  }

  tr:last-child td {
    border-bottom: none;
  }

  .prop-name code {
    color: var(--accent, var(--azul));
    font-weight: 600;
  }

  .required {
    color: var(--vermelho, #dc3545);
    margin-left: 0.125rem;
    font-weight: bold;
  }

  .prop-type code {
    color: var(--vermelho, #dc3545); /* Type is often red/orange in syntax highlighting */
  }

  .prop-default code {
    color: var(--concreto-60, #6c757d);
  }

  code {
    font-family: var(--font-mono);
    font-size: 0.85em;
    background: var(--bg-soft, #f8f9fa);
    padding: 0.125rem 0.25rem;
    border-radius: 4px;
    border: 1px solid var(--concreto-30, #e0e0e0);
  }

  .empty {
    color: var(--concreto-40, #ced4da);
  }

  .prop-desc {
    color: var(--fg-muted, #495057);
    line-height: 1.5;
  }
</style>
