<script lang="ts">
  type Props = {
    color?: string;
    opacity?: number;
  };

  let {
    color = 'var(--azul-bright)',
    opacity = 0.15
  }: Props = $props();
</script>

<div class="rivermap-container" style="--r-color: {color}; --r-opacity: {opacity};">
  <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="currentColor" stroke-linecap="round">
      <path stroke-width="12" d="M -50,100 C 150,50 300,250 500,200 C 700,150 850,300 1050,250" />
      <path stroke-width="8" d="M 150,50 C 250,150 350,100 500,200 C 600,250 700,150 850,300" />
      <path stroke-width="6" d="M 300,250 C 400,350 550,250 700,150 C 800,100 900,150 1050,100" />
      <path stroke-width="4" d="M -50,200 C 100,150 200,300 350,250 C 500,200 550,100 700,50" />
      <path stroke-width="3" d="M 400,350 C 500,400 650,300 800,350 C 900,400 950,250 1050,350" />
    </g>
  </svg>
</div>

<style>
  .rivermap-container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    color: var(--r-color);
    opacity: var(--r-opacity);
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }
</style>
