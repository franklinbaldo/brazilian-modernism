<script lang="ts">
  import { getContext } from 'svelte';

  /**
   * Switch Component
   *
   * A toggle switch component adhering to the Curva & Concreto aesthetic.
   * Internally uses a checkbox for broad compatibility and form binding,
   * but visually styled as a pill with a sliding thumb.
   *
   * @prop {boolean} checked - The bindable checked state.
   * @prop {string} [id] - The ID for the input, used for label/ARIA association.
   * @prop {boolean} [disabled=false] - Whether the switch is disabled.
   * @prop {boolean} [invalid=false] - Whether the switch is invalid.
   */
  type Props = {
    checked?: boolean;
    id?: string;
    disabled?: boolean;
    invalid?: boolean;
    [key: string]: any;
  };

  let {
    checked = $bindable(false),
    id,
    disabled = false,
    invalid = false,
    ...rest
  }: Props = $props();

  // Consume FormField context if it exists
  const formFieldContext = getContext<() => { id: string; 'aria-describedby'?: string; invalid: boolean; required: boolean }>('cobogo-form-field');
  let ctx = $derived(formFieldContext ? formFieldContext() : null);

  let finalId = $derived(id || ctx?.id);
  let finalAriaDescribedby = $derived(rest['aria-describedby'] || ctx?.['aria-describedby']);
  let finalInvalid = $derived(invalid || ctx?.invalid || false);
  let finalRequired = $derived(rest.required || ctx?.required || false);

</script>

<label class="switch-container" class:disabled class:invalid={finalInvalid}>
  <input
    type="checkbox"
    role="switch"
    id={finalId}
    aria-describedby={finalAriaDescribedby}
    aria-invalid={finalInvalid}
    required={finalRequired}
    {disabled}
    bind:checked
    class="sr-only"
    {...rest}
  />
  <div class="switch-visual" aria-hidden="true">
    <div class="switch-thumb"></div>
  </div>
</label>

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

  .switch-container {
    display: inline-flex;
    align-items: center;
    position: relative;
    vertical-align: middle;
  }

  .switch-visual {
    width: 2.75rem;
    height: 1.5rem;
    background-color: var(--papel-20);
    border: 2px solid var(--concreto-80);
    border-radius: var(--r-pill);
    position: relative;
    transition: all var(--dur-2) var(--ease-out);
    cursor: pointer;
  }

  /* When checkbox is checked, the sibling .switch-visual changes */
  input:checked + .switch-visual {
    background-color: var(--azul);
    border-color: var(--azul);
  }

  input:focus-visible + .switch-visual {
    outline: 2px solid var(--azul);
    outline-offset: 2px;
  }

  .invalid .switch-visual {
    border-color: var(--vermelho);
  }

  .invalid input:not(:checked) + .switch-visual {
    background-color: var(--vermelho-soft);
  }

  .invalid input:focus-visible + .switch-visual {
    outline-color: var(--vermelho);
  }

  .switch-thumb {
    width: 1rem;
    height: 1rem;
    background-color: var(--concreto-80);
    border-radius: var(--r-pill);
    position: absolute;
    top: 50%;
    left: 2px;
    transform: translateY(-50%);
    transition: transform var(--dur-2) var(--ease-out), background-color var(--dur-2) var(--ease-out);
  }

  input:checked + .switch-visual .switch-thumb {
    transform: translate(calc(2.75rem - 1rem - 8px), -50%); /* width - thumbWidth - borders */
    background-color: var(--papel-00);
    box-shadow: var(--shadow-1);
  }

  .disabled .switch-visual {
    opacity: 0.5;
    background-color: var(--papel-20);
    border-color: var(--concreto-40);
    cursor: not-allowed;
  }

  .disabled .switch-thumb {
    background-color: var(--concreto-60);
  }

  input:checked:disabled + .switch-visual {
    background-color: var(--concreto-60);
    border-color: var(--concreto-60);
  }

  input:checked:disabled + .switch-visual .switch-thumb {
    background-color: var(--papel-20);
    box-shadow: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .switch-visual, .switch-thumb {
      transition: none;
    }
  }
</style>
