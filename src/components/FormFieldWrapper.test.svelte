<script lang="ts">
  import FormField from './FormField.svelte';
  import TextInput from './TextInput.svelte';

  let { helper, error } = $props<{ helper?: string, error?: string }>();
</script>

<FormField label="Test Label" htmlFor="test-input" {helper} {error} required>
  {#snippet children({ id, 'aria-describedby': describedBy })}
    <!-- Use TextInput to test that the context injection actually works -->
    <TextInput data-testid="mock-input" />
  {/snippet}
</FormField>
