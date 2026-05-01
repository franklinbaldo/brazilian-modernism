<script lang="ts">
  import { setContext, type Snippet } from 'svelte';

  /**
   * Tabs Component
   *
   * An organism that manages the state for a set of mutually exclusive tabs and their panels.
   * Provides context for the active tab state and a unique identifier for the tab group
   * to ensure correct accessibility bindings.
   *
   * @prop {string} [name] - Unique identifier for the tabs group to associate tabs and panels. Defaults to a random id.
   * @prop {string} [active] - The initial active tab value. Supports two-way binding.
   * @prop {Snippet} children - Svelte snippet containing TabList and TabPanel components.
   */
  type Props = {
    name?: string;
    active?: string;
    children: Snippet;
  };

  let {
    name = 'tabs-group', // Note: Providing a unique name is recommended to avoid SSR hydration mismatches
    active = $bindable(''),
    children
  }: Props = $props();

  setContext('tabs-name', () => name);
  setContext('tabs-active', () => active);
  setContext('tabs-set-active', (value: string) => {
    active = value;
  });
</script>

<div class="tabs">
  {@render children()}
</div>

<style>
  .tabs {
    display: flex;
    flex-direction: column;
    width: 100%;
    /* Spacing between list and panels is handled by the elements themselves */
  }
</style>
