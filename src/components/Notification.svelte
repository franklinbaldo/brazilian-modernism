<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import BrIcon from './BrIcon.svelte';

  type Intent = 'info' | 'tip' | 'warning' | 'danger';

  type Props = {
    id?: string;
    intent?: Intent;
    title: string;
    message?: string;
    dismissible?: boolean;
    ondismiss?: () => void;
    class?: string;
    style?: string;
  };

  let {
    id = crypto.randomUUID(),
    intent = 'info',
    title,
    message,
    dismissible = true,
    ondismiss,
    class: className = '',
    style = '',
    ...rest
  }: Props = $props();

  let visible = $state(true);

  function handleDismiss() {
    visible = false;
    if (ondismiss) {
      ondismiss();
    }
  }

  const iconMap: Record<Intent, string> = {
    info: 'cobogo-circular',
    tip: 'cobogo-hexagonal',
    warning: 'cobogo-losango',
    danger: 'cobogo-cruz'
  };

  const roleAttr = $derived(intent === 'danger' || intent === 'warning' ? 'alert' : 'status');
  const ariaLiveAttr = $derived(intent === 'danger' || intent === 'warning' ? 'assertive' : 'polite');
</script>

{#if visible}
  <div
    {id}
    class="br-notification br-notification--{intent} {className}"
    {style}
    role={roleAttr}
    aria-live={ariaLiveAttr}
    transition:slide={{ duration: 220, easing: cubicOut }}
    {...rest}
  >
    <div class="br-notification__icon" aria-hidden="true">
      <BrIcon name={iconMap[intent]} size={24} color="currentColor" />
    </div>

    <div class="br-notification__content">
      <h4 class="br-notification__title">{title}</h4>
      {#if message}
        <p class="br-notification__message">{message}</p>
      {/if}
    </div>

    {#if dismissible}
      <button
        type="button"
        class="br-notification__close"
        aria-label="Dismiss notification"
        onclick={handleDismiss}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    {/if}
  </div>
{/if}

<style>
  .br-notification {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    border-radius: var(--r-soft);
    background: var(--bg-raised);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-2);
    position: relative;
    overflow: hidden;
    color: var(--fg);
    max-width: 400px;
    width: 100%;
  }

  .br-notification::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    background: var(--accent);
  }

  .br-notification--info {
    --accent: var(--azul);
    background: var(--azul-soft);
    border-color: var(--azul);
  }
  .br-notification--info .br-notification__icon,
  .br-notification--info .br-notification__title {
    color: var(--azul);
  }

  .br-notification--tip {
    --accent: var(--verde);
    background: var(--verde-soft);
    border-color: var(--verde);
  }
  .br-notification--tip .br-notification__icon,
  .br-notification--tip .br-notification__title {
    color: var(--verde);
  }

  .br-notification--warning {
    --accent: var(--ocre);
    background: var(--ocre-soft);
    border-color: var(--ocre);
  }
  .br-notification--warning .br-notification__icon,
  .br-notification--warning .br-notification__title {
    color: var(--ocre);
  }

  .br-notification--danger {
    --accent: var(--vermelho);
    background: var(--vermelho-soft);
    border-color: var(--vermelho);
  }
  .br-notification--danger .br-notification__icon,
  .br-notification--danger .br-notification__title {
    color: var(--vermelho);
  }

  .br-notification__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin-top: 2px;
  }

  .br-notification__content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .br-notification__title {
    font-family: var(--font-sans);
    font-size: var(--t-body);
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
  }

  .br-notification__message {
    font-family: var(--font-sans);
    font-size: var(--t-small);
    color: var(--fg);
    margin: 0;
    line-height: 1.4;
  }

  .br-notification__close {
    flex-shrink: 0;
    background: transparent;
    border: none;
    color: var(--fg-muted);
    cursor: pointer;
    padding: 0;
    margin: -0.25rem -0.25rem 0 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    line-height: 1;
    border-radius: var(--r-1);
    transition: color var(--dur-2) var(--ease-out), background-color var(--dur-2) var(--ease-out);
  }

  .br-notification__close:hover {
    color: var(--fg);
    background: rgba(0, 0, 0, 0.05);
  }

  .br-notification__close:focus-visible {
    outline: 2px solid var(--fg);
    outline-offset: 2px;
  }

  :global(.dark-mode) .br-notification__close:hover {
    background: rgba(255, 255, 255, 0.1);
  }
</style>
