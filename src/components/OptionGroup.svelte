<script lang="ts">
  import { setContext, type Snippet } from 'svelte';

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
   * @prop {string | boolean} [valid] - Optional valid state/message for the group.
   * @prop {Snippet} children - Svelte snippet containing the options (Radio/Checkbox + labels).
   */
  type Props = {
    legend: string;
    orientation?: 'vertical' | 'horizontal';
    name?: string;
    disabled?: boolean;
    error?: string;
    valid?: string | boolean;
    children: Snippet;
  };

  let {
    legend,
    orientation = 'vertical',
    name,
    disabled = false,
    error,
    valid,
    children
  }: Props = $props();


  let describedBy = $derived.by(() => {
    if (error) return `${name}-error`;
    if (valid && typeof valid === 'string') return `${name}-valid`;
    return undefined;
  });

  // Provide context for child inputs (Checkbox/Radio) to consume state automatically
  setContext('cobogo-form-field', () => ({
    id: name || '',
    'aria-describedby': describedBy,
    invalid: !!error,
    valid: !!valid && !error,
    required: false
  }));
</script>


<fieldset class="option-group" {disabled} {name} aria-describedby={describedBy}>
  <legend class="legend" class:has-error={!!error}>{legend}</legend>

  <div class="options-container" class:horizontal={orientation === 'horizontal'}>
    {@render children()}
  </div>

  {#if error}
    <p class="error" id="{name}-error" aria-live="polite">
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feedback-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      <span>{error}</span>
    </p>
  {:else if valid && typeof valid === 'string'}
    <p class="valid-text" id="{name}-valid" aria-live="polite">
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feedback-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>{valid}</span>
    </p>
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

  .error, .valid-text {
    display: flex;
    align-items: flex-start;
    gap: 0.375rem;
    margin: 0.5rem 0 0 0;
    font-size: var(--t-micro);
  }

  .error {
    color: var(--vermelho);
    font-weight: 700;
  }

  .valid-text {
    color: var(--verde);
    font-weight: 700;
  }

  .feedback-icon {
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  /* When fieldset is disabled, visually dim the contents */
  fieldset:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
</style>
