<script lang="ts">
  import FormField from '../../../components/FormField.svelte';
  import TextInput from '../../../components/TextInput.svelte';
</script>

<div class="demo-container">
  <div class="row">
    <FormField label="Standard Input" htmlFor="demo-ti-1" helper="Regular text input">
      {#snippet children(props)}
        <TextInput placeholder="Placeholder..." {...props} />
      {/snippet}
    </FormField>
  </div>
  <div class="row">
    <FormField label="Invalid State" htmlFor="demo-ti-2" error="This field is required.">
      {#snippet children(props)}
        <TextInput value="Invalid content" {...props} />
      {/snippet}
    </FormField>
  </div>
  <div class="row">
    <FormField label="Valid State" htmlFor="demo-ti-3" valid="Looks good!">
      {#snippet children(props)}
        <TextInput value="Valid content" {...props} />
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
