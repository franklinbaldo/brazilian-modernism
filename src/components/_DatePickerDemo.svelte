<script lang="ts">
  import DatePicker from './DatePicker.svelte';
  import FormField from './FormField.svelte';
</script>

<h3>Basic Usage</h3>
<div class="not-content" style="margin-top: 1rem; margin-bottom: 2rem; padding: 2rem; border: 1px solid var(--border); border-radius: var(--r-2); display: flex; flex-direction: column; gap: 1rem; background-color: var(--bg);">
  <DatePicker />
</div>

<h3>FormField Composition</h3>
<div class="not-content" style="margin-top: 1rem; margin-bottom: 2rem; padding: 2rem; border: 1px solid var(--border); border-radius: var(--r-2); display: flex; flex-direction: column; gap: 1rem; background-color: var(--bg);">
  <FormField label="Start Date" htmlFor="start-date" helper="The day the event starts.">
    {#snippet children(props)}
      <DatePicker {...props} />
    {/snippet}
  </FormField>
</div>

<h3>Validation Error</h3>
<div class="not-content" style="margin-top: 1rem; margin-bottom: 2rem; padding: 2rem; border: 1px solid var(--border); border-radius: var(--r-2); display: flex; flex-direction: column; gap: 1rem; background-color: var(--bg);">
  <FormField label="End Date" htmlFor="end-date" error="The end date cannot be in the past." required>
    {#snippet children(props)}
      <DatePicker {...props} />
    {/snippet}
  </FormField>
</div>

<h3>Min and Max bounds</h3>
<div class="not-content" style="margin-top: 1rem; margin-bottom: 2rem; padding: 2rem; border: 1px solid var(--border); border-radius: var(--r-2); display: flex; flex-direction: column; gap: 1rem; background-color: var(--bg);">
  <FormField label="Launch Date" htmlFor="launch-date">
    {#snippet children(props)}
      <DatePicker {...props} min="2026-01-01" max="2026-12-31" />
    {/snippet}
  </FormField>
</div>
