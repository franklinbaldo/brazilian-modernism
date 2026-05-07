<script lang="ts">
  import { getContext } from 'svelte';

  /**
   * Native <input> styled by Pico + global.css.
   * Validation states are signalled with aria-invalid (true | false).
   */
  let {
    value = $bindable(),
    type = 'text',
    placeholder,
    disabled = false,
    invalid = false,
    valid = false,
    size,
    ...rest
  }: {
    value?: string;
    type?: 'text' | 'email' | 'url' | 'search' | 'tel' | 'password';
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

<input
  {type}
  bind:value
  id={finalId}
  aria-describedby={finalAriaDescribedby}
  {placeholder}
  {disabled}
  aria-invalid={ariaInvalid}
  required={finalRequired}
  data-size={size}
  {...rest}
/>
