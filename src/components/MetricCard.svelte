<script lang="ts">
  type Props = {
    value: string | number;
    label: string;
    delta?: string;
    deltaTrend?: 'up' | 'down' | 'neutral';
    accent?: 'azul' | 'vermelho' | 'ocre' | 'verde';
  };

  let { value, label, delta, deltaTrend = 'neutral', accent = 'azul' }: Props = $props();
</script>

<article data-metric data-accent={accent}>
  <header>
    <strong>{value}</strong>
    <small>{label}</small>
  </header>

  {#if delta}
    <footer data-trend={deltaTrend}>
      {#if deltaTrend === 'up'}
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      {:else if deltaTrend === 'down'}
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      {/if}
      <span>{delta}</span>
    </footer>
  {/if}
</article>
