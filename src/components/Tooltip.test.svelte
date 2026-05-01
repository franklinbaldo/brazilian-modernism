<script lang="ts">
  import Tooltip from './Tooltip.svelte';

  let { position = 'top' } = $props();
</script>

<Tooltip content="Tooltip Content" {position}>
  {#snippet children(props)}
    <button {...props}>Hover me</button>
  {/snippet}
</Tooltip>
