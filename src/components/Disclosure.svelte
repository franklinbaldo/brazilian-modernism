<script lang="ts">
  import type { Snippet } from 'svelte';

  /**
   * Disclosure Component
   *
   * A structural molecule using native `<details>` and `<summary>` elements to hide
   * and show content. It respects the 'Curva & Concreto' doctrine: the interactive
   * summary uses curves (`--r-1`), while the expanded content uses sharp geometry (concrete).
   *
   * @prop {string} title - The title of the disclosure, displayed in the summary.
   * @prop {boolean} [open=false] - Whether the disclosure is currently expanded. Supports binding.
   * @prop {boolean} [disabled=false] - If true, disables interaction with the disclosure.
   * @prop {Snippet} children - Svelte snippet containing the content to disclose.
   */
  type Props = {
    title: string;
    open?: boolean;
    disabled?: boolean;
    children: Snippet;
  };

  let {
    title,
    open = $bindable(false),
    disabled = false,
    children
  }: Props = $props();

  // Prevent default toggle if disabled, otherwise sync open state
  function handleToggle(event: Event) {
    const details = event.target as HTMLDetailsElement;
    if (disabled) {
      details.open = false; // Force back to false if jsdom/browser triggered it despite preventDefault on click
      open = false;
      return;
    }
    open = details.open;
  }

  function handleClick(event: MouseEvent) {
    if (disabled) {
      event.preventDefault();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (disabled && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
    }
  }
</script>

<details
  class="disclosure"
  {open}
  aria-disabled={disabled}
  ontoggle={handleToggle}
>
  <summary
    class="summary"
    class:disabled
    onclick={handleClick}
    onkeydown={handleKeydown}
    tabindex={disabled ? -1 : 0}
  >
    <span class="title">{title}</span>
    <span class="indicator">
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="square" stroke-linejoin="miter">
        <polyline points="25,40 50,65 75,40" />
      </svg>
    </span>
  </summary>
  <div class="content">
    {@render children()}
  </div>
</details>

<style>
  .disclosure {
    font-family: var(--font-sans);
    border: 1px solid var(--concreto-40);
    border-radius: var(--r-1);
    background: var(--papel-00);
    overflow: hidden; /* For border-radius clipping */
  }

  .disclosure[open] {
    /* When open, the bottom corners of the details wrapper itself stay rounded,
       but the content inside is concrete (0 radius) */
    box-shadow: var(--shadow-1);
  }

  .summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    cursor: pointer;
    background: var(--papel-10);
    color: var(--concreto-80);
    font-weight: 700;
    transition: background-color var(--dur-2) var(--ease-out), color var(--dur-2) var(--ease-out);
    list-style: none; /* Hide default marker */
  }

  /* Hide default marker in Safari */
  .summary::-webkit-details-marker {
    display: none;
  }

  .summary:hover:not(.disabled) {
    background: var(--papel-20);
    color: var(--concreto-90);
  }

  .summary:focus-visible {
    outline: 2px solid var(--azul);
    outline-offset: -2px;
  }

  .summary.disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background: var(--papel-00); /* Flat when disabled */
  }

  .title {
    font-size: var(--t-body);
    line-height: var(--lh-tight);
  }

  .indicator {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--concreto-60);
    transition: transform var(--dur-2) var(--ease-out), color var(--dur-2) var(--ease-out);
  }

  .summary:hover:not(.disabled) .indicator {
    color: var(--azul);
  }

  .disclosure[open] .indicator {
    transform: rotate(180deg);
  }

  .content {
    /* Concreto: Sharp geometry for static data */
    padding: 1.5rem;
    border-top: 1px solid var(--concreto-40);
    background: var(--papel-00);
    border-radius: 0;
    color: var(--concreto-80);
    font-size: var(--t-body);
    line-height: var(--lh-base);
  }

  :global(.dark-mode) .disclosure {
    border-color: var(--concreto-80);
    background: var(--concreto-90);
  }

  :global(.dark-mode) .summary {
    background: var(--concreto-80);
    color: var(--papel-10);
  }

  :global(.dark-mode) .summary:hover:not(.disabled) {
    background: var(--concreto-60);
  }

  :global(.dark-mode) .content {
    background: var(--concreto-90);
    border-top-color: var(--concreto-80);
    color: var(--papel-20);
  }
</style>
