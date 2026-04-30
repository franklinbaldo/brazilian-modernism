<script lang="ts">
  type Props = {
    count?: number;
    colors?: string[];
  };

  let {
    count = 8,
    colors = ['var(--vermelho)', 'var(--azul)', 'var(--ocre)', 'var(--verde)']
  }: Props = $props();

  // Generate sequence of colors
  const flags = $derived(Array.from({ length: count }, (_, i) => colors[i % colors.length]));
</script>

<div class="bandeirinhas-wire">
  {#each flags as color, i}
    <div
      class="bandeirinha"
      style="--b-color: {color}; animation-delay: {i * 0.15}s;"
    ></div>
  {/each}
</div>

<style>
  .bandeirinhas-wire {
    display: flex;
    width: 100%;
    justify-content: space-around;
    border-top: 2px dashed var(--fg-muted);
    padding-top: 0;
    position: relative;
    overflow: hidden;
  }

  .bandeirinha {
    width: 40px;
    height: 50px;
    background-color: var(--b-color);
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    transform-origin: top center;
    animation: sway 3s ease-in-out infinite alternate;
    margin-top: -1px; /* overlap with wire */
  }

  @keyframes sway {
    0% { transform: rotate(-5deg); }
    100% { transform: rotate(5deg); }
  }
</style>
