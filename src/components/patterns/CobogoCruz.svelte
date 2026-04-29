<script lang="ts">
  let {
    size = 60,
    color = 'var(--azul)',
    density = 0.15,
    tile = true
  } = $props<{
    size?: number;
    color?: string;
    density?: number;
    tile?: boolean;
  }>();

  let svgContent = $derived(`%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='none'/%3E%3Cpath d='M35,35 L35,10 L65,10 L65,35 L90,35 L90,65 L65,65 L65,90 L35,90 L35,65 L10,65 L10,35 Z' stroke='${encodeURIComponent(color)}' stroke-width='8' fill='none'/%3E%3C/svg%3E`);
</script>

{#if tile}
  <div
    class="pattern-tile"
    style="background-image: url(&quot;data:image/svg+xml,{svgContent}&quot;); background-size: {size}px {size}px; opacity: {density}; width: 100%; height: 100%;"
  ></div>
{:else}
  <div style="width: {size}px; height: {size}px; opacity: {density}; color: {color};">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="none" />
      <path d="M35,35 L35,10 L65,10 L65,35 L90,35 L90,65 L65,65 L65,90 L35,90 L35,65 L10,65 L10,35 Z" stroke="currentColor" stroke-width="8" fill="none" />
    </svg>
  </div>
{/if}

<style>
  .pattern-tile {
    display: block;
  }
</style>
