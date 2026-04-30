<script lang="ts">
  type Props = {
    text: string;
    accent?: 'azul' | 'vermelho' | 'verde' | 'ocre';
  };

  let {
    text,
    accent = 'vermelho'
  }: Props = $props();

  const colorMap = {
    'azul': 'var(--azul)',
    'vermelho': 'var(--vermelho)',
    'verde': 'var(--verde)',
    'ocre': 'var(--ocre)'
  };

  const borderColor = $derived(colorMap[accent]);
</script>

<div class="sign-container" style="--sign-border-color: {borderColor};">
  <div class="sign-frame">
    <div class="sign-inner">
      <span class="sign-ornament tl">✦</span>
      <span class="sign-ornament tr">✦</span>
      <h2 class="sign-text">{text}</h2>
      <span class="sign-ornament bl">✦</span>
      <span class="sign-ornament br">✦</span>
    </div>
  </div>
</div>

<style>
  .sign-container {
    display: inline-block;
    background: var(--papel-00);
    padding: 8px;
    box-shadow: 4px 4px 0px rgba(0,0,0,0.15);
    border-radius: 4px;
    transform: rotate(1deg);
  }

  .sign-frame {
    border: 4px solid var(--sign-border-color);
    padding: 6px;
    border-radius: 2px;
  }

  .sign-inner {
    border: 1px solid var(--sign-border-color);
    padding: 1.5rem 3rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, transparent 45%, rgba(0,0,0,0.02) 50%, transparent 55%);
    background-size: 10px 10px;
  }

  .sign-ornament {
    position: absolute;
    color: var(--sign-border-color);
    font-size: 1rem;
    line-height: 1;
    user-select: none;
  }

  .tl { top: 4px; left: 4px; }
  .tr { top: 4px; right: 4px; }
  .bl { bottom: 4px; left: 4px; }
  .br { bottom: 4px; right: 4px; }

  .sign-text {
    font-family: var(--font-letreiro), Caveat, 'Comic Sans MS', cursive;
    font-size: 3rem;
    color: var(--fg);
    margin: 0;
    line-height: 1.1;
    text-shadow: 2px 2px 0px rgba(0,0,0,0.05);
    text-align: center;
    letter-spacing: 0.02em;
  }
</style>
