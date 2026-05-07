<script lang="ts">
  import { type Snippet } from 'svelte';
  import { fade } from 'svelte/transition';

  type Props = {
    content: string | Snippet;
    position?: 'top' | 'bottom' | 'left' | 'right';
    children: Snippet<[{ 'aria-describedby': string | undefined }]>;
  };

  let { content, position = 'top', children }: Props = $props();

  let visible = $state(false);
  const tooltipId = `tooltip-${Math.random().toString(36).slice(2, 11)}`;

  function show() { visible = true; }
  function hide() { visible = false; }
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && visible) {
      event.preventDefault();
      event.stopPropagation();
      hide();
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<span
  data-tooltip-host
  onmouseenter={show}
  onmouseleave={hide}
  onfocusin={show}
  onfocusout={hide}
  onkeydown={handleKeydown}
>
  {@render children({ 'aria-describedby': visible ? tooltipId : undefined })}

  {#if visible}
    <span
      id={tooltipId}
      role="tooltip"
      data-position={position}
      in:fade={{ duration: 150 }}
      out:fade={{ duration: 100 }}
    >
      {#if typeof content === 'string'}{content}{:else}{@render content()}{/if}
    </span>
  {/if}
</span>
