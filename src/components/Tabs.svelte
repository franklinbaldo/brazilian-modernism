<script lang="ts">
  import { setContext, type Snippet } from 'svelte';

  type Props = {
    name?: string;
    active?: string;
    children: Snippet;
  };

  let {
    name = 'tabs-group',
    active = $bindable(''),
    children,
  }: Props = $props();

  setContext('tabs-name', () => name);
  setContext('tabs-active', () => active);
  setContext('tabs-set-active', (value: string) => {
    active = value;
  });
</script>

<div data-tabs>
  {@render children()}
</div>
