<script lang="ts">
  import FormField from '../../../components/FormField.svelte';
  import Switch from '../../../components/Switch.svelte';

  let checkedNormal = $state(false);
  let checkedInvalid = $state(false);
  let checkedValid = $state(true);
</script>

<div class="demo-container">
  <div class="row">
    <FormField label="Standard Switch" htmlFor="demo-switch-1" helper="Regular switch atom">
      {#snippet children(props)}
        <Switch bind:checked={checkedNormal} {...props} />
      {/snippet}
    </FormField>
  </div>
  <div class="row">
    <FormField label="Invalid State" htmlFor="demo-switch-2" error="You must enable this feature.">
      {#snippet children(props)}
        <Switch bind:checked={checkedInvalid} {...props} />
      {/snippet}
    </FormField>
  </div>
  <div class="row">
    <FormField label="Valid State" htmlFor="demo-switch-3" valid="Looks good!">
      {#snippet children(props)}
        <Switch bind:checked={checkedValid} {...props} />
      {/snippet}
    </FormField>
  </div>
</div>

<style>
  .demo-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
    border: 1px solid var(--concreto-30);
    border-radius: var(--r-2);
    background: var(--bg);
  }
  .row {
    width: 100%;
    max-width: 400px;
  }
</style>
