<script lang="ts">
  import type { Snippet } from 'svelte';

  /**
   * OptionGroup Component
   *
   * A structural molecule that groups Radio or Checkbox atoms within an accessible
   * `<fieldset>` and `<legend>`. It enforces consistent grid/flex spacing between
   * options in either horizontal or vertical orientations.
   *
   * @prop {string} legend - The descriptive text for the group, required for accessibility.
   * @prop {'vertical' | 'horizontal'} [orientation='vertical'] - The layout direction of the options.
   * @prop {string} [name] - Optional name attribute for grouping native inputs.
   * @prop {boolean} [disabled=false] - If true, disables the entire fieldset.
   * @prop {string} [error] - Optional error message for the group.
   * @prop {Snippet} children - Svelte snippet containing the options (Radio/Checkbox + labels).
   */
  type Props = {
    legend: string;
    orientation?: 'vertical' | 'horizontal';
    name?: string;
    disabled?: boolean;
    error?: string;
    children: Snippet;
  };

  let {
    legend,
    orientation = 'vertical',
    name,
    disabled = false,
    error,
    children
  }: Props = $props();

  let describedBy = $derived(error ? `${name}-error` : undefined);
</script>

<fieldset class="option-group" {disabled} {name} aria-describedby={describedBy}>
  <legend class="legend" class:has-error={!!error}>{legend}</legend>

  <div class="options-container" class:horizontal={orientation === 'horizontal'}>
    {@render children()}
  </div>

  {#if error}
    <p class="error" id="{name}-error" aria-live="polite">{error}</p>
  {/if}
</fieldset>

<style>
  .option-group {
    border: none;
    padding: 0;
    margin: 0;
    min-width: 0; /* Reset for flex/grid parents */
    font-family: var(--font-sans);
  }

  .legend {
    font-size: var(--t-small);
    font-weight: 700;
    color: var(--fg-heading);
    margin-bottom: 0.5rem; /* Consistent spacing below legend */
    padding: 0;
  }

  .legend.has-error {
    color: var(--vermelho);
  }

  .options-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem; /* Vertical spacing between options */
  }

  .options-container.horizontal {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem; /* Generous horizontal spacing */
  }

  .error {
    margin: 0.5rem 0 0 0;
    font-size: var(--t-micro);
    color: var(--vermelho);
    font-weight: 700;
  }

  /* When fieldset is disabled, visually dim the contents */
  fieldset:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
</style>
