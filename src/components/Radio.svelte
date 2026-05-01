<script lang="ts">
  /**
   * Radio Component
   *
   * A radio button component adhering to the Curva & Concreto aesthetic.
   * Completely circular (radius pill), but with honest pool-shadows and
   * sharp geometric inner checked states when active.
   *
   * @prop {string} value - The required value for the radio.
   * @prop {string} [id] - The ID for the input, used for label/ARIA association.
   * @prop {any} group - The bindable group value for radio binding.
   * @prop {boolean} [disabled=false] - Whether the radio is disabled.
   */
  type Props = {
    value: string;
    id?: string;
    group: any;
    disabled?: boolean;
    [key: string]: any;
  };

  let {
    value,
    id,
    group = $bindable(),
    disabled = false,
    ...rest
  }: Props = $props();

</script>

<div class="radio-container" class:disabled>
  <input
    type="radio"
    {id}
    {disabled}
    {value}
    bind:group
    class="sr-only"
    {...rest}
  />
  <div class="radio-visual" aria-hidden="true">
    {#if group === value}
      <div class="radio-dot"></div>
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

  .radio-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    vertical-align: middle;
  }

  .radio-visual {
    width: 1.25rem;
    height: 1.25rem;
    background-color: var(--papel-00);
    border: 2px solid var(--concreto-80);
    border-radius: var(--r-pill);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--dur-2) var(--ease-out);
  }

  input:checked + .radio-visual {
    border-color: var(--azul);
    box-shadow: var(--shadow-1);
  }

  input:focus-visible + .radio-visual {
    outline: 2px solid var(--azul);
    outline-offset: 2px;
  }

  .radio-dot {
    width: 0.625rem;
    height: 0.625rem;
    background-color: var(--azul);
    border-radius: var(--r-pill);
    animation: popIn var(--dur-2) var(--ease-out) forwards;
  }

  .disabled .radio-visual {
    opacity: 0.5;
    background-color: var(--papel-20);
    border-color: var(--concreto-40);
  }

  input:checked:disabled + .radio-visual {
    border-color: var(--concreto-60);
    box-shadow: none;
  }

  input:checked:disabled + .radio-visual .radio-dot {
    background-color: var(--concreto-60);
  }

  @keyframes popIn {
    0% { transform: scale(0); }
    80% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }

  @media (prefers-reduced-motion: reduce) {
    .radio-visual {
      transition: none;
    }
    .radio-dot {
      animation: none;
    }
  }
</style>
