<script lang="ts">
  import { getContext } from 'svelte';

  /**
   * Native <select> styled by Pico + global.css.
   */
  let {
    value = $bindable(),
    options,
    placeholder,
    disabled = false,
    invalid = false,
    valid = false,
    size,
    ...rest
  }: {
    value?: string;
    options: Array<{ value: string; label: string }>;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
    valid?: boolean;
    size?: 'sm' | 'md' | 'lg';
    [key: string]: any;
  } = $props();

  const formFieldContext = getContext<() => { id: string; 'aria-describedby'?: string; invalid: boolean; valid: boolean; required: boolean }>('cobogo-form-field');
  let ctx = $derived(formFieldContext ? formFieldContext() : null);

  let finalId = $derived(rest.id || ctx?.id);
  let finalAriaDescribedby = $derived(rest['aria-describedby'] || ctx?.['aria-describedby']);
  let finalInvalid = $derived(invalid || ctx?.invalid || false);
  let finalValid = $derived((valid || ctx?.valid || false) && !finalInvalid);
  let finalRequired = $derived(rest.required || ctx?.required || false);
  let ariaInvalid = $derived(finalInvalid ? 'true' : finalValid ? 'false' : undefined);
</script>

<select
  bind:value
  id={finalId}
  aria-describedby={finalAriaDescribedby}
  aria-invalid={ariaInvalid}
  required={finalRequired}
  {disabled}
  data-size={size}
  {...rest}
>
  {#if placeholder}
    <option value="" disabled selected hidden>{placeholder}</option>
  {/if}
  {#each options as option}
    <option value={option.value}>{option.label}</option>
  {/each}
</select>
