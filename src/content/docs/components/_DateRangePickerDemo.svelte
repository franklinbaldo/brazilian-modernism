<script lang="ts">
  import DateRangePicker from '../../../components/DateRangePicker.svelte';
  import FormField from '../../../components/FormField.svelte';

  let startBasic = $state('2026-05-01');
  let endBasic = $state('2026-05-10');

  let startBounds = $state('2026-05-15');
  let endBounds = $state('');

  let startInvalid = $state('2026-05-01');
  let endInvalid = $state('2026-05-02');
</script>

<div class="demo-section">
  <h3>Basic Usage</h3>
  <div class="demo-container">
    <DateRangePicker bind:start={startBasic} bind:end={endBasic} />
    <p class="demo-value">Selected range: {startBasic || 'None'} to {endBasic || 'None'}</p>
  </div>
</div>

<div class="demo-section">
  <h3>Min/Max Bounds (May 2026)</h3>
  <div class="demo-container">
    <DateRangePicker
      bind:start={startBounds}
      bind:end={endBounds}
      min="2026-05-01"
      max="2026-05-31"
    />
  </div>
</div>

<div class="demo-section">
  <h3>Validation (Error State)</h3>
  <div class="demo-container">
    <FormField invalid={true} label="Invalid Date Range" description="This range is out of allowed parameters.">
      <DateRangePicker bind:start={startInvalid} bind:end={endInvalid} />
    </FormField>
  </div>
</div>

<style>
  .demo-section {
    margin-bottom: 2rem;
  }

  .demo-section h3 {
    margin-bottom: 1rem;
    font-size: var(--t-h4);
    font-family: var(--font-display-alt);
    color: var(--concreto-90);
  }

  .demo-container {
    padding: 1.5rem;
    border: 1px solid var(--concreto-40);
    border-radius: var(--r-soft);
    background-color: var(--papel-10);
  }

  .demo-value {
    margin-top: 1rem;
    font-family: var(--font-mono, monospace);
    font-size: var(--t-micro);
    color: var(--concreto-60);
  }

  :global(.dark-mode) .demo-section h3 {
    color: var(--papel-00);
  }

  :global(.dark-mode) .demo-container {
    background-color: var(--concreto-90);
    border-color: var(--concreto-60);
  }
</style>
