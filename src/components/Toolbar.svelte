<script lang="ts">
  /**
   * Toolbar provides a horizontal action bar, optionally sticky.
   * @param {'start' | 'between' | 'end'} [align='between'] - Horizontal alignment of items.
   * @param {boolean} [sticky=false] - If true, the toolbar sticks to the top.
   * @param {import('svelte').Snippet} [children] - Components to render inside the toolbar (Buttons, SearchBar, etc).
   */
  let {
    align = 'between',
    sticky = false,
    children
  }: {
    align?: 'start' | 'between' | 'end';
    sticky?: boolean;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div class="toolbar" class:sticky class:align-start={align === 'start'} class:align-between={align === 'between'} class:align-end={align === 'end'} role="toolbar" aria-label="Ações">
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border);
    flex-wrap: wrap;
    z-index: 10;
  }

  .align-start {
    justify-content: flex-start;
  }

  .align-between {
    justify-content: space-between;
  }

  .align-end {
    justify-content: flex-end;
  }

  .sticky {
    position: sticky;
    top: 0;
    background-color: color-mix(in srgb, var(--bg) 90%, transparent);
    backdrop-filter: blur(8px);
    /* For browser compatibility */
    -webkit-backdrop-filter: blur(8px);
  }
</style>
