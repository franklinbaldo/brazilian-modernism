<script lang="ts">
  import { getContext } from 'svelte';

  /**
   * Checkbox Component
   *
   * A checkbox component adhering to the Curva & Concreto aesthetic, ensuring
   * honest pool-shadows and correct ARIA linkages.
   *
   * @prop {boolean} checked - The bindable checked state.
   * @prop {string} [id] - The ID for the input, used for label/ARIA association.
   * @prop {boolean} [disabled=false] - Whether the checkbox is disabled.
   * @prop {boolean} [invalid=false] - Whether the checkbox is invalid.
   * @prop {boolean} [valid=false] - Whether the checkbox is valid.
   * @prop {string} [value] - The value for the checkbox when used in a group.
   * @prop {any} [group] - The bindable group array for multiple checkboxes.
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

  // Consume FormField context if it exists
  const formFieldContext = getContext<() => { id: string; 'aria-describedby'?: string; invalid: boolean; valid: boolean; required: boolean }>('cobogo-form-field');
  let ctx = $derived(formFieldContext ? formFieldContext() : null);

  let finalId = $derived(id || ctx?.id);
  let finalAriaDescribedby = $derived(rest['aria-describedby'] || ctx?.['aria-describedby']);
  let finalInvalid = $derived(invalid || ctx?.invalid || false);
  let finalValid = $derived((valid || ctx?.valid || false) && !finalInvalid);
  let finalRequired = $derived(rest.required || ctx?.required || false);

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (value !== undefined) {
      if (target.checked) {
        if (!group.includes(value)) group = [...group, value];
      } else {
        group = group.filter(v => v !== value);
      }
    }
  }

  // Sync checked state with group membership if value is provided
  $effect(() => {
    if (value !== undefined) {
      checked = group.includes(value);
    }
  });

</script>

<div class="checkbox-container" class:disabled class:invalid={finalInvalid} class:valid={finalValid}>
  <input
    type="checkbox"
    id={finalId}
    aria-describedby={finalAriaDescribedby}
    aria-invalid={finalInvalid}
    required={finalRequired}
    {disabled}
    {value}
    bind:checked
    onchange={handleChange}
    class="sr-only"
    {...rest}
  />
  <div class="checkbox-visual" aria-hidden="true">
    {#if checked}
      <svg viewBox="0 0 100 100" class="checkmark" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="square" stroke-linejoin="miter">
        <polyline points="20,50 40,70 80,30" />
      </svg>
    {/if}
  </div>
</div>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .checkbox-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    vertical-align: middle;
  }

  .checkbox-visual {
    width: 1.25rem;
    height: 1.25rem;
    background-color: var(--bg-raised);
    border: 2px solid var(--border-input);
    border-radius: var(--r-1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--dur-2) var(--ease-out);
    color: var(--papel-00);
  }

  input:checked + .checkbox-visual {
    background-color: var(--azul);
    border-color: var(--azul);
    box-shadow: var(--shadow-1);
  }

  input:focus-visible + .checkbox-visual {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  .invalid .checkbox-visual {
    border-color: var(--vermelho);
  }

  .invalid input:not(:checked) + .checkbox-visual {
    background-color: var(--vermelho-soft);
  }

  .invalid input:checked + .checkbox-visual {
    background-color: var(--vermelho);
    border-color: var(--vermelho);
  }

  .invalid input:focus-visible + .checkbox-visual {
    outline-color: var(--vermelho);
  }

  .valid .checkbox-visual {
    border-color: var(--verde);
  }

  .valid input:not(:checked) + .checkbox-visual {
    background-color: var(--verde-soft);
  }

  .valid input:checked + .checkbox-visual {
    background-color: var(--verde);
    border-color: var(--verde);
  }

  .valid input:focus-visible + .checkbox-visual {
    outline-color: var(--verde);
  }

  .disabled .checkbox-visual {
    opacity: 0.5;
    background-color: var(--papel-20);
    border-color: var(--concreto-40);
  }

  input:checked:disabled + .checkbox-visual {
    background-color: var(--concreto-60);
    border-color: var(--concreto-60);
    box-shadow: none;
  }

  .checkmark {
    width: 80%;
    height: 80%;
    stroke-dasharray: 100;
    stroke-dashoffset: 0;
    animation: draw var(--dur-2) var(--ease-out) forwards;
  }

  @keyframes draw {
    from { stroke-dashoffset: 100; }
    to { stroke-dashoffset: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .checkbox-visual {
      transition: none;
    }
    .checkmark {
      animation: none;
    }
  }
</style>
