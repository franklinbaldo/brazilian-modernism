<script lang="ts">
  import { getContext } from 'svelte';

  /**
   * Pico styles <input type="checkbox" role="switch"> as a switch natively.
   */
  type Props = {
    checked?: boolean;
    id?: string;
    disabled?: boolean;
    invalid?: boolean;
    valid?: boolean;
    [key: string]: any;
  };

  let {
    checked = $bindable(false),
    id,
    disabled = false,
    invalid = false,
    valid = false,
    ...rest
  }: Props = $props();

  const formFieldContext = getContext<() => { id: string; 'aria-describedby'?: string; invalid: boolean; valid: boolean; required: boolean }>('cobogo-form-field');
  let ctx = $derived(formFieldContext ? formFieldContext() : null);

  let finalId = $derived(id || ctx?.id);
  let finalAriaDescribedby = $derived(rest['aria-describedby'] || ctx?.['aria-describedby']);
  let finalInvalid = $derived(invalid || ctx?.invalid || false);
  let finalValid = $derived((valid || ctx?.valid || false) && !finalInvalid);
  let finalRequired = $derived(rest.required || ctx?.required || false);
  let ariaInvalid = $derived(finalInvalid ? 'true' : finalValid ? 'false' : undefined);
</script>

<input
  type="checkbox"
  role="switch"
  id={finalId}
  aria-describedby={finalAriaDescribedby}
  aria-invalid={ariaInvalid}
  required={finalRequired}
  {disabled}
  bind:checked
  {...rest}
/>
