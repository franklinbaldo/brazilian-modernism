<script lang="ts">
  import FormField from './FormField.svelte';

  let { component: Component, invalid } = $props<{ component: any, invalid?: boolean }>();
</script>

<FormField label="Test Label" htmlFor="test-input" error={invalid ? 'Error text' : undefined}>
  {#snippet children({ id, 'aria-describedby': describedBy })}
    <Component />
  {/snippet}
</FormField>
