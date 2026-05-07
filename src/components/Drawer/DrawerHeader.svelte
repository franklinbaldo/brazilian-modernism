<script lang="ts">
  import { getContext } from 'svelte';
  import type { Snippet } from 'svelte';

  type Props = {
    title: string;
    headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    action?: Snippet;
    showClose?: boolean;
  };

  let { title, headingLevel = 'h2', action, showClose = true }: Props = $props();

  const getDialogClose = getContext<() => () => void>('dialogClose');
  const closeDialog = getDialogClose ? getDialogClose() : () => {};
</script>

<header>
  <svelte:element this={headingLevel}>{title}</svelte:element>
  {#if action}
    {@render action()}
  {:else if showClose}
    <button type="button" data-intent="link" rel="prev" aria-label="Close drawer" onclick={closeDialog}>
      <svg viewBox="0 0 100 100" width="16" height="16" stroke="currentColor" stroke-width="12" stroke-linecap="square" aria-hidden="true">
        <line x1="20" y1="20" x2="80" y2="80" />
        <line x1="80" y1="20" x2="20" y2="80" />
      </svg>
    </button>
  {/if}
</header>
