<script lang="ts">
  import { type Snippet } from 'svelte';

  type Props = {
    ariaLabel?: string;
    children: Snippet;
  };

  let { ariaLabel = 'Tabs', children }: Props = $props();

  function handleKeydown(event: KeyboardEvent) {
    const list = event.currentTarget as HTMLElement;
    const tabs = Array.from(list.querySelectorAll('[role="tab"]:not([disabled])')) as HTMLElement[];
    if (tabs.length === 0) return;
    const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length;
      event.preventDefault();
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      event.preventDefault();
    } else if (event.key === 'Home') {
      nextIndex = 0;
      event.preventDefault();
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1;
      event.preventDefault();
    }
    if (nextIndex !== currentIndex && nextIndex >= 0 && nextIndex < tabs.length) {
      tabs[nextIndex].focus();
    }
  }
</script>

<div
  role="tablist"
  tabindex="-1"
  aria-label={ariaLabel}
  onkeydown={handleKeydown}
>
  {@render children()}
</div>
