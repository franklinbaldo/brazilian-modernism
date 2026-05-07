<script lang="ts">
  import { setContext, type Snippet } from 'svelte';

  type Props = {
    legend: string;
    orientation?: 'vertical' | 'horizontal';
    name?: string;
    disabled?: boolean;
    error?: string;
    valid?: string | boolean;
    children: Snippet;
  };

  let {
    legend,
    orientation = 'vertical',
    name,
    disabled = false,
    error,
    valid,
    children,
  }: Props = $props();

  let describedBy = $derived.by(() => {
    if (error) return `${name}-error`;
    if (valid && typeof valid === 'string') return `${name}-valid`;
    return undefined;
  });

  setContext('cobogo-form-field', () => ({
    id: name || '',
    'aria-describedby': describedBy,
    invalid: !!error,
    valid: !!valid && !error,
    required: false,
  }));
</script>

<fieldset
  {disabled}
  {name}
  aria-describedby={describedBy}
  data-option-group
  data-orientation={orientation}
  data-state={error ? 'invalid' : valid ? 'valid' : undefined}
>
  <legend>{legend}</legend>
  {@render children()}

  {#if error}
    <small id="{name}-error" role="alert" data-feedback="error">{error}</small>
  {:else if valid && typeof valid === 'string'}
    <small id="{name}-valid" data-feedback="valid">{valid}</small>
  {/if}
</fieldset>
