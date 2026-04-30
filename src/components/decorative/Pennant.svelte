<script lang="ts">
  type Props = {
    text: string;
    color?: 'azul' | 'vermelho' | 'ocre' | 'verde';
  };

  let {
    text,
    color = 'azul'
  }: Props = $props();

  const colorMap = {
    'azul': 'var(--azul)',
    'vermelho': 'var(--vermelho)',
    'ocre': 'var(--ocre)',
    'verde': 'var(--verde)'
  };

  const bgMain = $derived(colorMap[color]);
</script>

<div class="pennant-wrapper">
  <div class="pennant-flag" style="--p-color: {bgMain};">
    <span class="pennant-text">{text}</span>
  </div>
  <div class="pennant-ribbons" style="--p-color: {bgMain};">
    <div class="ribbon left"></div>
    <div class="ribbon right"></div>
  </div>
</div>

<style>
  .pennant-wrapper {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
  }

  .pennant-flag {
    background: linear-gradient(135deg, var(--p-color) 0%, color-mix(in srgb, var(--p-color) 85%, black) 100%);
    padding: 1.5rem 1rem 3rem 1rem;
    min-width: 120px;
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    text-align: center;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 2;
  }

  .pennant-text {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--papel-00);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
  }

  .pennant-ribbons {
    display: flex;
    gap: 1rem;
    margin-top: -2rem; /* overlap with flag base */
    z-index: 1;
  }

  .ribbon {
    width: 20px;
    height: 60px;
    background: color-mix(in srgb, var(--p-color) 80%, white);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%);
  }

  .ribbon.left {
    transform: rotate(15deg);
    transform-origin: top center;
  }

  .ribbon.right {
    transform: rotate(-15deg);
    transform-origin: top center;
    background: color-mix(in srgb, var(--p-color) 70%, black);
  }
</style>
