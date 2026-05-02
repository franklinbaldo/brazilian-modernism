<script lang="ts">
  import { type Snippet } from 'svelte';
  import { fade } from 'svelte/transition';

  type Props = {
    /** The content of the tooltip. Can be a string or a Snippet. */
    content: string | Snippet;
    /** Position of the tooltip relative to its child element. Defaults to 'top'. */
    position?: 'top' | 'bottom' | 'left' | 'right';
    /**
     * The target element to trigger the tooltip on hover/focus.
     * To ensure accessibility, the Snippet receives `props` containing
     * `aria-describedby` which MUST be spread onto the interactive child element.
     */
    children: Snippet<[{ 'aria-describedby': string | undefined }]>;
  };

  let { content, position = 'top', children }: Props = $props();

  let visible = $state(false);

  // Use a stable counter for SSR-safe IDs since Svelte 5 useId is internal/unstable in this version
  const tooltipId = `tooltip-${Math.random().toString(36).slice(2, 11)}`;

  function show() {
    visible = true;
  }

  function hide() {
    visible = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && visible) {
      event.preventDefault();
      // It's important to stop propagation so we don't accidentally close dialogs or drawers this is inside
      event.stopPropagation();
      hide();
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  class="cobogo-tooltip-wrapper"
  onmouseenter={show}
  onmouseleave={hide}
  onfocusin={show}
  onfocusout={hide}
  onkeydown={handleKeydown}
>
  {@render children({ 'aria-describedby': visible ? tooltipId : undefined })}

  {#if visible}
    <div
      id={tooltipId}
      role="tooltip"
      class="cobogo-tooltip-popup cobogo-tooltip-popup--{position}"
      in:fade={{ duration: 150 }}
      out:fade={{ duration: 100 }}
    >
      {#if typeof content === 'string'}
        {content}
      {:else}
        {@render content()}
      {/if}
      <div class="cobogo-tooltip-arrow"></div>
    </div>
  {/if}
</div>

<style>
  .cobogo-tooltip-wrapper {
    display: inline-flex;
    position: relative;
  }

  .cobogo-tooltip-popup {
    position: absolute;
    z-index: 1000;
    /* Curva & Concreto: tooltip is static data, therefore 0px border-radius */
    border-radius: 0;
    background-color: var(--concreto-90);
    color: var(--papel-00);
    padding: 0.5rem 0.75rem;
    font-family: var(--font-sans);
    font-size: var(--t-small);
    line-height: 1.4;
    white-space: nowrap;
    box-shadow: var(--shadow-1);
    pointer-events: none;
  }

  /* Positioning logic */
  .cobogo-tooltip-popup--top {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-8px);
  }

  .cobogo-tooltip-popup--bottom {
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(8px);
  }

  .cobogo-tooltip-popup--left {
    right: 100%;
    top: 50%;
    transform: translateY(-50%) translateX(-8px);
  }

  .cobogo-tooltip-popup--right {
    left: 100%;
    top: 50%;
    transform: translateY(-50%) translateX(8px);
  }

  /* Arrow logic */
  .cobogo-tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
  }

  .cobogo-tooltip-popup--top .cobogo-tooltip-arrow {
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px 6px 0 6px;
    border-color: var(--concreto-90) transparent transparent transparent;
  }

  .cobogo-tooltip-popup--bottom .cobogo-tooltip-arrow {
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 6px 6px 6px;
    border-color: transparent transparent var(--concreto-90) transparent;
  }

  .cobogo-tooltip-popup--left .cobogo-tooltip-arrow {
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 6px 0 6px 6px;
    border-color: transparent transparent transparent var(--concreto-90);
  }

  .cobogo-tooltip-popup--right .cobogo-tooltip-arrow {
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 6px 6px 6px 0;
    border-color: transparent var(--concreto-90) transparent transparent;
  }
</style>
