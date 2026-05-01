<script lang="ts">
  import { getContext, type Snippet } from 'svelte';

  /**
   * Tab Component
   *
   * The interactive trigger for a tab panel.
   * Respects Curva & Concreto: interactive curves (`--r-1`) on the top corners.
   *
   * @prop {string} value - Unique value representing this tab.
   * @prop {boolean} [disabled] - Disables the tab.
   * @prop {Snippet} children - Content of the tab.
   */
  type Props = {
    value: string;
    disabled?: boolean;
    children: Snippet;
  };

  let { value, disabled = false, children }: Props = $props();

  const getTabsName = getContext<() => string>('tabs-name');
  const getActiveTab = getContext<() => string>('tabs-active');
  const setActiveTab = getContext<(val: string) => void>('tabs-set-active');

  let isActive = $derived((getActiveTab ? getActiveTab() : '') === value);
  let id = $derived(`${getTabsName ? getTabsName() : 'tabs'}-tab-${value}`);
  let panelId = $derived(`${getTabsName ? getTabsName() : 'tabs'}-panel-${value}`);

  function handleClick() {
    if (!disabled) {
      setActiveTab(value);
    }
  }

  // Keyboard activation (Space/Enter) is handled by native button behavior
</script>

<button
  {id}
  class="tab"
  class:active={isActive}
  {disabled}
  role="tab"
  aria-selected={isActive}
  aria-controls={panelId}
  tabindex={isActive ? 0 : -1}
  onclick={handleClick}
  type="button"
>
  {@render children()}
</button>

<style>
  .tab {
    /* Curva: Top curves for interactivity */
    border-radius: var(--r-1) var(--r-1) 0 0;
    padding: 0.75rem 1.5rem;
    font-family: var(--font-sans);
    font-size: var(--t-body);
    font-weight: 700;
    cursor: pointer;
    background: transparent;
    color: var(--concreto-60);
    border: 2px solid transparent;
    border-bottom: none;
    transition: all var(--dur-2) var(--ease-out);
    position: relative;
    top: 2px; /* Pull down to overlap the container border */
  }

  .tab:hover:not(:disabled):not(.active) {
    background: var(--papel-10);
    color: var(--concreto-80);
  }

  .tab:focus-visible {
    outline: 2px solid var(--azul);
    outline-offset: -2px;
  }

  .tab.active {
    background: var(--papel-00);
    color: var(--azul);
    border-color: var(--concreto-40);
    /* Block the bottom border of the tablist to merge visually with the panel */
    border-bottom: 2px solid var(--papel-00);
  }

  .tab:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  :global(.dark-mode) .tab {
    color: var(--concreto-60);
  }

  :global(.dark-mode) .tab:hover:not(:disabled):not(.active) {
    background: var(--papel-20);
    color: var(--papel-10);
  }

  :global(.dark-mode) .tab.active {
    background: var(--concreto-90);
    color: var(--azul-soft);
    border-color: var(--concreto-80);
    border-bottom: 2px solid var(--concreto-90);
  }
</style>
