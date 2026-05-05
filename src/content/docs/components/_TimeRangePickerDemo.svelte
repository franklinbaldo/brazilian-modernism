<script lang="ts">
  import TimeRangePicker from '../../../components/TimeRangePicker.svelte';
  import FormField from '../../../components/FormField.svelte';

  let startBasic = $state('09:00');
  let endBasic = $state('17:00');

  let startBounds = $state('10:00');
  let endBounds = $state('15:00');

  let startInvalid = $state('08:00');
  let endInvalid = $state('12:00');
</script>

<div class="demo-container">
  <h3>Basic Usage</h3>
  <FormField label="Working Hours" id="basic-time-range" description="Select your daily working hours.">
    <TimeRangePicker bind:start={startBasic} bind:end={endBasic} />
  </FormField>

  <h3>With Constraints (min/max)</h3>
  <FormField label="Meeting Slot" id="bounds-time-range" description="Select a slot between 09:00 and 18:00.">
    <TimeRangePicker
      bind:start={startBounds}
      bind:end={endBounds}
      min="09:00"
      max="18:00"
    />
  </FormField>

  <h3>Validation State</h3>
  <FormField label="Restricted Hours" id="invalid-time-range" description="Selected hours are invalid." invalid>
    <div slot="message">These hours are not allowed.</div>
    <TimeRangePicker bind:start={startInvalid} bind:end={endInvalid} />
  </FormField>
</div>

<style>
  .demo-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem;
    border: 1px solid var(--concreto-20, #e0e0e0);
    border-radius: var(--r-soft);
    background-color: var(--papel-00);
  }

  :global(.dark-mode) .demo-container {
    border-color: var(--concreto-80);
    background-color: transparent;
  }

  h3 {
    margin: 0 0 1rem 0;
    font-family: var(--font-sans);
    font-size: var(--t-h4);
    color: var(--concreto-90);
  }

  :global(.dark-mode) h3 {
    color: var(--papel-10);
  }
</style>