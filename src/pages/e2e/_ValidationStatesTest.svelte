<script lang="ts">
  import FormField from '../../components/FormField.svelte';
  import TextInput from '../../components/TextInput.svelte';
  import Select from '../../components/Select.svelte';
  import Checkbox from '../../components/Checkbox.svelte';
  import Radio from '../../components/Radio.svelte';
  import Switch from '../../components/Switch.svelte';
  import OptionGroup from '../../components/OptionGroup.svelte';

  let radioGroupValid = $state('2');
  let radioGroupInvalid = $state('1');

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

  <div class="test-row">
    <h3>Checkbox Invalid</h3>
    <Checkbox invalid={true}>Invalid Checkbox</Checkbox>
  </div>

  <div class="test-row">
    <h3>Checkbox Valid</h3>
    <Checkbox valid={true}>Valid Checkbox</Checkbox>
  </div>

  <div class="test-row">
    <h3>Switch Invalid</h3>
    <Switch invalid={true}>Invalid Switch</Switch>
  </div>

  <div class="test-row">
    <h3>Switch Valid</h3>
    <Switch valid={true}>Valid Switch</Switch>
  </div>

  <div class="test-row" id="optiongroup-invalid-test">
    <h3>OptionGroup Invalid (propagates to Radio)</h3>
    <OptionGroup legend="Invalid Radio Group" name="invalid-radio" error="Please select an option">
      <label style="display: flex; gap: 8px;">
        <Radio value="1" bind:group={radioGroupInvalid} /> Option 1
      </label>
      <label style="display: flex; gap: 8px;">
        <Radio value="2" bind:group={radioGroupInvalid} /> Option 2
      </label>
    </OptionGroup>
  </div>
</div>

<style>
  .test-row {
    margin-bottom: 2rem;
  }
</style>
