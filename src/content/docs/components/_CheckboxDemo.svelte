<script lang="ts">
  import FormField from '../../../components/FormField.svelte';
  import Checkbox from '../../../components/Checkbox.svelte';

  let checkedNormal = $state(false);
  let checkedInvalid = $state(false);
  let checkedValid = $state(true);
</script>

<div class="demo-container">
  <div class="row">
    <FormField label="Standard Checkbox" htmlFor="demo-cb-1" helper="Regular checkbox atom">
      {#snippet children(props)}
        <Checkbox bind:checked={checkedNormal} {...props} />
      {/snippet}
    </FormField>
  </div>
  <div class="row">
    <FormField label="Invalid State" htmlFor="demo-cb-2" error="You must accept the terms.">
      {#snippet children(props)}
        <Checkbox bind:checked={checkedInvalid} {...props} />
      {/snippet}
    </FormField>
  </div>
  <div class="row">
    <FormField label="Valid State" htmlFor="demo-cb-3" valid="Looks good!">
      {#snippet children(props)}
        <Checkbox bind:checked={checkedValid} {...props} />
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
