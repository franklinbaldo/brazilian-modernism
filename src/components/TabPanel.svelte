<script lang="ts">
  import { getContext, type Snippet } from 'svelte';

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
  <section {id} role="tabpanel" aria-labelledby={tabId} tabindex="0">
    {@render children()}
  </section>
{/if}
