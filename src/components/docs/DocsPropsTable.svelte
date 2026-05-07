<script lang="ts">
  type PropDef = {
    name: string;
    type: string;
    default?: string;
    required?: boolean;
    description: string;
  };
  type Props = { props: PropDef[] };

  let { props = [] }: Props = $props();
</script>

<figure data-table data-props-table>
  <table>
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
          <td>
            <code>{prop.name}</code>
            {#if prop.required}<abbr title="Required" aria-label="required">*</abbr>{/if}
          </td>
          <td><code data-type-token>{prop.type}</code></td>
          <td>{#if prop.default}<code>{prop.default}</code>{:else}<small>—</small>{/if}</td>
          <td>{prop.description}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</figure>
