<script lang="ts">
  let {
    title,
    lede,
    kicker,
    align = 'left',
    children,
  }: {
    title: string;
    lede?: string;
    kicker?: string;
    align?: 'left' | 'center';
    children?: import('svelte').Snippet;
  } = $props();
</script>

<header data-page-header data-align={align}>
  <hgroup>
    {#if kicker}<p><small data-kicker>{kicker}</small></p>{/if}
    <h1>{title}</h1>
    {#if lede}<p>{lede}</p>{/if}
  </hgroup>
  {#if children}
    <div data-actions>
      {@render children()}
    </div>
  {/if}
</header>
