<script lang="ts">
  import FormField from './FormField.svelte';
  import Switch from './Switch.svelte';

  let { helper, error } = $props<{ helper?: string, error?: string }>();
</script>

<FormField label="Toggle Label" htmlFor="test-switch" {helper} {error} required>
  {#snippet children(props)}
    <!-- Use Switch to test that the context injection actually works for toggle atoms -->
    <Switch data-testid="mock-switch" {...props} />
  {/snippet}
</FormField>
