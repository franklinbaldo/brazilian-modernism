<script lang="ts">
  import { getContext } from 'svelte';

  /**
   * Native <input type="checkbox"> styled by Pico + global.css.
   * No custom visual — Pico already paints checkboxes; COBOGÓ overrides
   * --pico-* in global.css.
   */
  type Props = {
    checked?: boolean;
    id?: string;
    disabled?: boolean;
    invalid?: boolean;
    valid?: boolean;
    value?: string;
    group?: any[];
    [key: string]: any;
  };

  let {
    checked = $bindable(false),
    id,
    disabled = false,
    invalid = false,
    valid = false,
    value,
    group = $bindable([]),
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

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (value !== undefined) {
      if (target.checked) {
        if (!group.includes(value)) group = [...group, value];
      } else {
        group = group.filter((v) => v !== value);
      }
    }
  }

  $effect(() => {
    if (value !== undefined) checked = group.includes(value);
  });
</script>

<input
  type="checkbox"
  id={finalId}
  aria-describedby={finalAriaDescribedby}
  aria-invalid={ariaInvalid}
  required={finalRequired}
  {disabled}
  {value}
  bind:checked
  onchange={handleChange}
  {...rest}
/>
