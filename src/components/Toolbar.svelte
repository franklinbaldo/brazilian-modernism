<script lang="ts">
  let {
    align = 'between',
    sticky = false,
    children,
  }: {
    align?: 'start' | 'between' | 'end';
    sticky?: boolean;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div role="toolbar" aria-label="Ações" data-align={align} data-sticky={sticky ? '' : undefined}>
  {#if children}{@render children()}{/if}
</div>
