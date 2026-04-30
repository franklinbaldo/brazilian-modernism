<script lang="ts">
  type Props = {
    kicker?: string;
    title: string;
    subtitle?: string;
    color?: 'amarelo' | 'vermelho' | 'azul';
  };

  let {
    kicker,
    title,
    subtitle,
    color = 'amarelo'
  }: Props = $props();

  const colorMap = {
    'amarelo': 'var(--amarelo)',
    'vermelho': 'var(--vermelho)',
    'azul': 'var(--azul)'
  };

  const bgColor = $derived(colorMap[color]);
</script>

<div class="lambe-wrapper">
  <div class="lambe-poster" style="--lambe-bg: {bgColor};">
    {#if kicker}
      <span class="lambe-kicker">{kicker}</span>
    {/if}
    <h3 class="lambe-title">{title}</h3>
    {#if subtitle}
      <p class="lambe-subtitle">{subtitle}</p>
    {/if}
  </div>
</div>

<style>
  .lambe-wrapper {
    display: inline-block;
    padding: 1rem;
    /* Rotation and slight perspective to look pasted on a wall */
    transform: rotate(-1.5deg);
    filter: drop-shadow(4px 4px 0px rgba(0,0,0,0.15));
  }

  .lambe-poster {
    background-color: var(--lambe-bg);
    padding: 2rem 1.5rem;
    max-width: 280px;
    text-align: center;
    position: relative;
    /* Irregular border to mimic wheatpaste poster edges */
    border: 2px solid var(--fg);
    border-radius: 2px 8px 4px 2px / 4px 2px 8px 4px;

    /* Paper texture/noise simulation via pseudo-element */
    z-index: 1;
  }

  /* Double border effect simulating peeling layers */
  .lambe-poster::before {
    content: '';
    position: absolute;
    inset: -6px -4px -3px -5px;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 3px 6px 2px 4px;
    z-index: -1;
    background: var(--papel-00);
  }

  .lambe-poster::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.05;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    pointer-events: none;
    mix-blend-mode: multiply;
  }

  .lambe-kicker {
    display: block;
    font-family: var(--font-cordel), Impact, sans-serif;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
    color: var(--fg);
  }

  .lambe-title {
    font-family: var(--font-cordel), Impact, sans-serif;
    font-size: 2.5rem;
    font-weight: 900;
    line-height: 0.95;
    text-transform: uppercase;
    color: var(--fg);
    margin: 0;
    letter-spacing: -0.02em;
    /* Force line breaks on small container */
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .lambe-subtitle {
    margin-top: 1rem;
    font-family: var(--font-sans);
    font-size: 1rem;
    font-weight: 700;
    color: var(--fg);
    line-height: 1.2;
  }
</style>
