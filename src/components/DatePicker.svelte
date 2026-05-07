<script lang="ts">
  import { getContext } from 'svelte';

  let {
    value = $bindable(),
    min,
    max,
    disabled = false,
    invalid = false,
    valid = false,
    size,
    ...rest
  }: {
    value?: string;
    min?: string;
    max?: string;
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
  type="date"
  bind:value
  id={finalId}
  aria-describedby={finalAriaDescribedby}
  {min}
  {max}
  {disabled}
  aria-invalid={ariaInvalid}
  required={finalRequired}
  data-size={size}
  {...rest}
/>
