<script lang="ts">
  /**
   * EmptyState provides a placeholder when there's no data to display.
   * @param {'search' | 'inbox' | 'alert' | 'calendar'} [icon='inbox'] - The geometric icon to display.
   * @param {string} title - The main title of the empty state.
   * @param {string} [description] - An optional descriptive text.
   * @param {string} [actionLabel] - Label for the optional action button.
   * @param {string} [actionHref] - Href for the optional action button.
   */
  let {
    icon = 'inbox',
    title,
    description,
    actionLabel,
    actionHref
  }: {
    icon?: 'search' | 'inbox' | 'alert' | 'calendar';
    title: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
  } = $props();
</script>

<div class="empty-state">
  <div class="icon-wrapper" aria-hidden="true">
    {#if icon === 'search'}
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="21" cy="21" r="12" />
        <line x1="29.5" y1="29.5" x2="40" y2="40" />
      </svg>
    {:else if icon === 'inbox'}
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="4 16 16 16 20 24 28 24 32 16 44 16" />
        <path d="M4 16 L4 36 A4 4 0 0 0 8 40 L40 40 A4 4 0 0 0 44 36 L44 16 M4 16 L12 4 L36 4 L44 16" />
      </svg>
    {:else if icon === 'alert'}
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M24 4 L44 40 L4 40 Z" />
        <line x1="24" y1="16" x2="24" y2="28" />
        <circle cx="24" cy="34" r="2" fill="currentColor" stroke="none" />
      </svg>
    {:else if icon === 'calendar'}
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <rect x="6" y="8" width="36" height="32" rx="4" />
        <line x1="16" y1="4" x2="16" y2="12" />
        <line x1="32" y1="4" x2="32" y2="12" />
        <line x1="6" y1="20" x2="42" y2="20" />
      </svg>
    {/if}
  </div>

  <h3 class="title">{title}</h3>

  {#if description}
    <p class="description">{description}</p>
  {/if}

  {#if actionLabel}
    <div class="action">
      <!--
        We use an anchor tag styled to look like a secondary button
        to keep it self-contained without importing Button.svelte yet.
      -->
      <a href={actionHref || '#'} class="action-btn">
        {actionLabel}
      </a>
    </div>
  {/if}
</div>

<style>
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 3rem 1.5rem;
    border-radius: var(--r-soft);
    background-color: var(--bg-sunken, transparent);
  }

  .icon-wrapper {
    color: var(--fg-muted);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-family: var(--font-display);
    font-size: var(--t-h3);
    color: var(--fg-heading);
    margin: 0 0 0.5rem 0;
    line-height: 1.2;
  }

  .description {
    font-family: var(--font-sans);
    font-size: var(--t-base);
    color: var(--fg-muted);
    margin: 0;
    max-width: 45ch;
    line-height: 1.5;
  }

  .action {
    margin-top: 2rem;
  }

  /* Self-contained secondary button styles */
  .action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-sans);
    font-weight: 500;
    font-size: var(--t-base);
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: var(--r-pill, 9999px);
    border: 1px solid var(--border-strong, var(--border));
    background-color: transparent;
    color: var(--fg);
    transition: all var(--dur-2, 0.2s) var(--ease-out, ease-out);
    cursor: pointer;
  }

  .action-btn:hover {
    background-color: var(--bg-raised, rgba(0,0,0,0.05));
    border-color: var(--fg);
  }

  .action-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
</style>
