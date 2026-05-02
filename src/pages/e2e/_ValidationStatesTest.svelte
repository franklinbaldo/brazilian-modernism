<script lang="ts">
  import FormField from '../../components/FormField.svelte';
  import TextInput from '../../components/TextInput.svelte';
  import Select from '../../components/Select.svelte';

  let options = [{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }];
</script>

<div class="test-container" style="padding: 2rem;">
  <h2>Validation States E2E Test</h2>

  <div class="test-row">
    <h3>TextInput Invalid</h3>
    <TextInput invalid={true} placeholder="Invalid Input" />
  </div>

  <div class="test-row">
    <h3>Select Invalid</h3>
    <Select invalid={true} {options} placeholder="Invalid Select" />
  </div>

  <div class="test-row">
    <h3>FormField Invalid wrapper</h3>
    <FormField label="Field with Error" htmlFor="ff-test" error="This field is invalid">
      {#snippet children({ id, 'aria-describedby': ariaDescribedby })}
        <TextInput {id} aria-describedby={ariaDescribedby} placeholder="Context Invalid Input" />
      {/snippet}
    </FormField>
  </div>
</div>

<style>
  .test-row {
    margin-bottom: 2rem;
  }
</style>
