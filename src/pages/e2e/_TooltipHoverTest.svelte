<script lang="ts">
  import Tooltip from '../../components/Tooltip.svelte';
  import Button from '../../components/Button.svelte';
</script>

<div style="padding: 100px;">
  <Tooltip content="This is the tooltip content">
    {#snippet children(props)}
      <Button {...props} id="tooltip-trigger">Hover Me</Button>
    {/snippet}
  </Tooltip>
</div>
