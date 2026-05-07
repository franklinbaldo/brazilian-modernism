<script lang="ts">
  let {
    icon = 'inbox',
    title,
    description,
    actionLabel,
    actionHref,
  }: {
    icon?: 'search' | 'inbox' | 'alert' | 'calendar';
    title: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
  } = $props();
</script>

<div data-empty-state>
  <span aria-hidden="true">
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
  </span>

  <h3>{title}</h3>
  {#if description}<p>{description}</p>{/if}
  {#if actionLabel}
    <p><a href={actionHref || '#'} role="button" data-intent="secondary">{actionLabel}</a></p>
  {/if}
</div>
