<script lang="ts">
  import { getContext, type Snippet } from 'svelte';

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
    if (!disabled) setActiveTab(value);
  }
</script>

<button
  {id}
  type="button"
  role="tab"
  data-intent="link"
  aria-selected={isActive}
  aria-controls={panelId}
  tabindex={isActive ? 0 : -1}
  {disabled}
  onclick={handleClick}
>
  {@render children()}
</button>
