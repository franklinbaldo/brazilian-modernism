<script lang="ts">
  import { getContext } from 'svelte';

  /**
   * Native <input type="radio"> styled by Pico + global.css.
   */
  type Props = {
    value: string;
    id?: string;
    group: any;
    disabled?: boolean;
    invalid?: boolean;
    valid?: boolean;
    [key: string]: any;
  };

  let {
    value,
    id,
    group = $bindable(),
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
  type="radio"
  id={finalId}
  aria-describedby={finalAriaDescribedby}
  aria-invalid={ariaInvalid}
  required={finalRequired}
  {disabled}
  {value}
  bind:group
  {...rest}
/>
