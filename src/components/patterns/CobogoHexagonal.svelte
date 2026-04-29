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

  let svgContent = $derived(`%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='none'/%3E%3Cpolygon points='50,15 90,35 90,65 50,85 10,65 10,35' stroke='${encodeURIComponent(color)}' stroke-width='8' fill='none'/%3E%3C/svg%3E`);
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
      <polygon points="50,15 90,35 90,65 50,85 10,65 10,35" stroke="currentColor" stroke-width="8" fill="none" />
    </svg>
  </div>
{/if}

<style>
  .pattern-tile {
    display: block;
  }
</style>
