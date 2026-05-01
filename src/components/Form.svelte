<script lang="ts">
  /**
   * Form Component
   *
   * A macro-level wrapper for grouping FormFields, handling native form
   * submission, and fieldset legends. Adheres to Curva & Concreto aesthetic.
   */
  import { type Snippet } from 'svelte';

  type Props = {
    /** The HTML form action attribute. */
    action?: string;
    /** The HTML form method attribute (e.g., 'get', 'post'). */
    method?: 'get' | 'post' | 'dialog';
    /** Optional legend for a semantic <fieldset> grouping. */
    legend?: string;
    /** The content of the form. */
    children: Snippet;
    /** Additional CSS classes. */
    class?: string;
    /** Optional form-level error message. */
    error?: string;
    /** Event handler for form submission. */
    onsubmit?: (e: SubmitEvent) => void;
    /** Allow arbitrary rest properties. */
    [key: string]: any;
  };

  let {
    action,
    method = 'get',
    legend,
    children,
    class: className = '',
    error,
    onsubmit,
    ...rest
  }: Props = $props();

  function handleSubmit(e: SubmitEvent) {
    if (onsubmit) {
      onsubmit(e);
    }
  }
</script>

<form
  {action}
  {method}
  class="cobogo-form {className}"
  onsubmit={handleSubmit}
  {...rest}
>
  {#if error}
    <div class="form-error-summary" role="alert" aria-live="assertive">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      {error}
    </div>
  {/if}

  {#if legend}
    <fieldset class="form-fieldset">
      <legend class="form-legend">{legend}</legend>
      <div class="fieldset-content">
        {@render children()}
      </div>
    </fieldset>
  {:else}
    {@render children()}
  {/if}
</form>

<style>
  .cobogo-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    font-family: var(--font-sans);
  }

  .form-fieldset {
    border: 1px solid var(--border, var(--concreto-40));
    border-radius: var(--r-soft);
    padding: 1.5rem;
    margin: 0;
    min-width: 0;
  }

  .form-legend {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: var(--t-h4);
    color: var(--concreto-90);
    padding: 0 0.5rem;
  }

  .fieldset-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-error-summary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--vermelho-soft);
    color: var(--vermelho-deep);
    padding: 0.75rem 1rem;
    border-radius: var(--r-1);
    border: 1px solid var(--vermelho);
    font-size: var(--t-small);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .form-fieldset {
      padding: 1rem;
    }
  }
</style>
