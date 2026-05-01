<script lang="ts">
  import { getContext, type Snippet } from 'svelte';

  /**
   * TabPanel Component
   *
   * The static content container associated with a Tab.
   * Respects Curva & Concreto: sharp geometry (concrete) with 0px border-radius
   * because it houses static data.
   *
   * @prop {string} value - The value matching the associated Tab's value.
   * @prop {Snippet} children - Svelte snippet containing the panel content.
   */
  type Props = {
    value: string;
    children: Snippet;
  };

  let { value, children }: Props = $props();

  const getTabsName = getContext<() => string>('tabs-name');
  const getActiveTab = getContext<() => string>('tabs-active');

  let isActive = $derived((getActiveTab ? getActiveTab() : '') === value);
  let id = $derived(`${getTabsName ? getTabsName() : 'tabs'}-panel-${value}`);
  let tabId = $derived(`${getTabsName ? getTabsName() : 'tabs'}-tab-${value}`);
</script>

{#if isActive}
  <div
    {id}
    class="tab-panel"
    role="tabpanel"
    aria-labelledby={tabId}
    tabindex="0"
  >
    {@render children()}
  </div>
{/if}

<style>
  .tab-panel {
    /* Concreto: Sharp edges, no curves for static content presentation */
    padding: 2rem;
    background: var(--papel-00);
    border: 2px solid var(--concreto-40);
    border-top: none;
    border-radius: 0;
    color: var(--concreto-80);
    font-size: var(--t-body);
    line-height: var(--lh-base);
  }

  .tab-panel:focus-visible {
    outline: 2px solid var(--azul);
    outline-offset: -2px;
  }

  :global(.dark-mode) .tab-panel {
    background: var(--concreto-90);
    border-color: var(--concreto-80);
    color: var(--papel-20);
  }
</style>
