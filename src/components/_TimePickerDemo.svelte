<script lang="ts">
  import TimePicker from './TimePicker.svelte';
  import FormField from './FormField.svelte';
</script>

<h3>Basic Usage</h3>
<div class="not-content" style="margin-top: 1rem; margin-bottom: 2rem; padding: 2rem; border: 1px solid var(--border); border-radius: var(--r-2); display: flex; flex-direction: column; gap: 1rem; background-color: var(--bg);">
  <TimePicker />
</div>

<h3>FormField Composition</h3>
<div class="not-content" style="margin-top: 1rem; margin-bottom: 2rem; padding: 2rem; border: 1px solid var(--border); border-radius: var(--r-2); display: flex; flex-direction: column; gap: 1rem; background-color: var(--bg);">
  <FormField label="Start Time" htmlFor="start-time" helper="When does the session begin?">
    {#snippet children(props)}
      <TimePicker {...props} />
    {/snippet}
  </FormField>
</div>

<h3>Validation Error</h3>
<div class="not-content" style="margin-top: 1rem; margin-bottom: 2rem; padding: 2rem; border: 1px solid var(--border); border-radius: var(--r-2); display: flex; flex-direction: column; gap: 1rem; background-color: var(--bg);">
  <FormField label="End Time" htmlFor="end-time" error="The end time must be after the start time." required>
    {#snippet children(props)}
      <TimePicker {...props} />
    {/snippet}
  </FormField>
</div>
