<script lang="ts">
  let {
    size = 60,
    color = 'var(--azul)',
    density = 0.15,
    tile = true,
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
    data-pattern-tile
    style:background-image={`url("data:image/svg+xml,${svgContent}")`}
    style:background-size={`${size}px ${size}px`}
    style:opacity={density}
  ></div>
{:else}
  <div style:width={`${size}px`} style:height={`${size}px`} style:opacity={density} style:color={color}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-hidden="true">
      <rect width="100" height="100" fill="none" />
      <polygon points="50,15 90,35 90,65 50,85 10,65 10,35" stroke="currentColor" stroke-width="8" fill="none" />
    </svg>
  </div>
{/if}
