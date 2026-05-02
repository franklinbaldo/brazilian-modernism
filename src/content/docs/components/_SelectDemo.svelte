<script lang="ts">
  import FormField from '../../../components/FormField.svelte';
  import Select from '../../../components/Select.svelte';

  const options = [
    { value: 'sp', label: 'São Paulo' },
    { value: 'rj', label: 'Rio de Janeiro' },
    { value: 'mg', label: 'Minas Gerais' },
    { value: 'ba', label: 'Bahia' },
  ];
</script>

<div class="demo-container">
  <div class="row">
    <FormField label="Standard Select" htmlFor="demo-sel-1" helper="Choose a state">
      {#snippet children(props)}
        <Select {options} placeholder="Select state..." {...props} />
      {/snippet}
    </FormField>
  </div>
  <div class="row">
    <FormField label="Invalid State" htmlFor="demo-sel-2" error="Please select a valid option.">
      {#snippet children(props)}
        <Select {options} value="sp" {...props} />
      {/snippet}
    </FormField>
  </div>
  <div class="row">
    <FormField label="Valid State" htmlFor="demo-sel-3" valid="State selected successfully!">
      {#snippet children(props)}
        <Select {options} value="rj" {...props} />
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
