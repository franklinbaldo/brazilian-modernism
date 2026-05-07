<script lang="ts">
  import { setContext, type Snippet } from 'svelte';

  type Props = {
    name: string;
    children: Snippet;
  };

  let { name, children }: Props = $props();

  setContext('accordion-name', () => name);
</script>

<div data-accordion>
  {@render children()}
</div>
