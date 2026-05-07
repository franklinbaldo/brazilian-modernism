<script>
  export let headers = [];
  export let data = [];
  export let caption = '';
  export let variant = 'default';
</script>

<figure data-table data-variant={variant} tabindex="0" aria-label={caption || 'Tabela de dados'}>
  <table>
    {#if caption}<caption>{caption}</caption>{/if}
    <thead>
      <tr>
        {#each headers as header}
          <th style:text-align={header.align || 'left'}>{header.label}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data as row}
        <tr>
          {#each headers as header}
            <td style:text-align={header.align || 'left'}>
              {#if header.key === 'status'}
                <small data-status={row[header.key]?.toLowerCase()}>{row[header.key]}</small>
              {:else}
                {row[header.key]}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</figure>
