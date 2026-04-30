<script lang="ts">
  import FormField from './FormField.svelte';

  let { helper, error } = $props<{ helper?: string, error?: string }>();
</script>

<FormField label="Test Label" htmlFor="test-input" {helper} {error} required>
  {#snippet children({ id, 'aria-describedby': describedBy })}
    <input type="text" {id} aria-describedby={describedBy} data-testid="mock-input" />
  {/snippet}
</FormField>
