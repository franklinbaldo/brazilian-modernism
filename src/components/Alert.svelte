<script lang="ts">
  /**
   * Alert provides feedback messages to the user.
   * @param {'info' | 'success' | 'warning' | 'danger'} [variant='info'] - The semantic variant of the alert.
   * @param {string} [title] - Optional bold title for the alert.
   * @param {boolean} [dismissible=false] - Whether the alert can be dismissed.
   * @param {() => void} [onDismiss] - Callback when the dismiss button is clicked.
   * @param {import('svelte').Snippet} [children] - The body content of the alert.
   */
  let {
    variant = 'info',
    title,
    dismissible = false,
    onDismiss,
    children
  }: {
    variant?: 'info' | 'success' | 'warning' | 'danger';
    title?: string;
    dismissible?: boolean;
    onDismiss?: () => void;
    children?: import('svelte').Snippet;
  } = $props();

  let isDismissed = $state(false);

  function handleDismiss() {
    isDismissed = true;
    if (onDismiss) {
      onDismiss();
    }
  }

</script>

{#if !isDismissed}
  <div
    class="alert variant-{variant}"
    role="alert"
    aria-live="polite"
  >
    <div class="icon-wrapper" aria-hidden="true">
      {#if variant === 'info'}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      {:else if variant === 'success'}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      {:else if variant === 'warning'}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      {:else if variant === 'danger'}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      {/if}
    </div>

    <div class="content">
      {#if title}
        <strong class="title">{title}</strong>
      {/if}
      <div class="body">
        {#if children}
          {@render children()}
        {/if}
      </div>
    </div>

    {#if dismissible}
      <button
        type="button"
        class="dismiss-btn"
        aria-label="Fechar alerta"
        onclick={handleDismiss}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    {/if}
  </div>
{/if}

<style>
  .alert {
    display: flex;
    align-items: flex-start;
    padding: 1rem;
    border-radius: var(--r-soft);
    gap: 0.75rem;
    position: relative;
    font-family: var(--font-sans);
  }

  /* Variants */
  .variant-info {
    background-color: var(--azul-soft, rgba(0, 100, 255, 0.1));
    border-left: 4px solid var(--azul);
    color: var(--fg);
  }
  .variant-info .icon-wrapper {
    color: var(--azul);
  }

  .variant-success {
    background-color: var(--verde-soft, rgba(0, 200, 100, 0.1));
    border-left: 4px solid var(--verde);
    color: var(--fg);
  }
  .variant-success .icon-wrapper {
    color: var(--verde);
  }

  .variant-warning {
    background-color: var(--ocre-soft, rgba(255, 165, 0, 0.1));
    border-left: 4px solid var(--ocre);
    color: var(--fg);
  }
  .variant-warning .icon-wrapper {
    color: var(--ocre);
  }

  .variant-danger {
    background-color: var(--vermelho-soft, rgba(255, 50, 50, 0.1));
    border-left: 4px solid var(--vermelho);
    color: var(--fg);
  }
  .variant-danger .icon-wrapper {
    color: var(--vermelho);
  }

  /* Content */
  .icon-wrapper {
    display: flex;
    flex-shrink: 0;
    margin-top: 0.125rem; /* align with first line of text */
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .title {
    font-weight: 600;
    color: var(--fg-heading);
    font-size: var(--t-base);
  }

  .body {
    font-size: var(--t-base);
    line-height: 1.5;
  }

  /* Dismiss Button */
  .dismiss-btn {
    background: transparent;
    border: none;
    padding: 0.25rem;
    margin: -0.25rem; /* to expand click area without expanding layout */
    cursor: pointer;
    color: currentColor;
    opacity: 0.6;
    border-radius: var(--r-soft);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity var(--dur-2, 0.2s) var(--ease-out, ease-out), background-color var(--dur-2, 0.2s) var(--ease-out, ease-out);
    flex-shrink: 0;
  }

  .dismiss-btn:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.05);
  }

  .dismiss-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    opacity: 1;
  }

  /* Accessibility / Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    .dismiss-btn {
      transition: none;
    }
  }
</style>
