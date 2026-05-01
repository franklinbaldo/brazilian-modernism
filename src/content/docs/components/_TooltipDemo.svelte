<script lang="ts">
  import Tooltip from '../../../components/Tooltip.svelte';
  import Button from '../../../components/Button.svelte';
</script>

<div class="demo-box" style="display: flex; gap: 2rem; justify-content: center; padding: 4rem 2rem;">
  <Tooltip content="Provides extra context" position="top">
    {#snippet children(props)}
      <Button {...props} variant="secondary">Hover me</Button>
    {/snippet}
  </Tooltip>
</div>
