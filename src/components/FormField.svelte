<script lang="ts">
  import { setContext } from 'svelte';
  import type { Snippet } from 'svelte';

  /**
   * Form-field grouping that emits <label> + control + <small> (helper/error)
   * styled by Pico + global.css. Validation state is signalled via
   * aria-invalid forwarded through context.
   */
  let {
    label,
    htmlFor,
    required = false,
    helper,
    error,
    valid,
    children,
  }: {
    label: string;
    htmlFor: string;
    required?: boolean;
    helper?: string;
    error?: string;
    valid?: string | boolean;
    children: Snippet<[{ id: string; 'aria-describedby'?: string }]>;
  } = $props();

  let describedBy = $derived.by(() => {
    if (error) return `${htmlFor}-error`;
    if (valid && typeof valid === 'string') return `${htmlFor}-valid`;
    if (helper) return `${htmlFor}-helper`;
    return undefined;
  });

  setContext('cobogo-form-field', () => ({
    id: htmlFor,
    'aria-describedby': describedBy,
    invalid: !!error,
    valid: !!valid && !error,
    required,
  }));
</script>

<div data-form-field data-state={error ? 'invalid' : valid ? 'valid' : undefined}>
  <label for={htmlFor}>
    {label}
    {#if required}<abbr title="Obrigatório" aria-label="obrigatório">*</abbr>{/if}
  </label>

  {@render children({ id: htmlFor, 'aria-describedby': describedBy })}

  {#if error}
    <small id="{htmlFor}-error" role="alert" data-feedback="error">{error}</small>
  {:else if valid && typeof valid === 'string'}
    <small id="{htmlFor}-valid" data-feedback="valid">{valid}</small>
  {:else if helper}
    <small id="{htmlFor}-helper" data-feedback="helper">{helper}</small>
  {/if}
</div>
