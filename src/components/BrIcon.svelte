<script lang="ts" module>
  // Vite glob import — todos os SVGs como raw strings.
  // Path relativo ao componente (não /src/...) pra que a resolução funcione
  // tanto neste repo quanto em consumidores que importem cobogo como dep
  // (Vite resolve /src/... relative ao project root da app consumidora,
  // resultando em registry vazio downstream).
  const modules = import.meta.glob('../icons/**/*.svg', { eager: true, query: '?raw', import: 'default' });
  const registry: Record<string, string> = {};
  for (const [path, content] of Object.entries(modules)) {
    const match = path.match(/\/icons\/[^/]+\/([^/]+)\.svg$/);
    if (match) registry[match[1]] = content as string;
  }
  export const ICON_NAMES = Object.keys(registry).sort();
</script>

<script lang="ts">
  let {
    name,
    size = 48,
    color,
    title,
    'aria-hidden': ariaHidden,
  }: {
    name: string;
    size?: number;
    color?: string;
    title?: string;
    'aria-hidden'?: boolean | 'true' | 'false';
  } = $props();

  const svg = $derived(registry[name]);
</script>

{#if svg}
  <span
    class="br-icon"
    style:width="{size}px"
    style:height="{size}px"
    style:color={color ?? 'inherit'}
    role={ariaHidden ? undefined : 'img'}
    aria-hidden={ariaHidden}
    aria-label={title}
  >
    {@html svg}
  </span>
{:else}
  <span class="br-icon br-icon--missing" style:width="{size}px" style:height="{size}px">?</span>
{/if}

<style>
  .br-icon { display: inline-flex; align-items: center; justify-content: center; }
  .br-icon :global(svg) { width: 100%; height: 100%; }
  .br-icon--missing {
    border: 1px dashed var(--vermelho);
    color: var(--vermelho);
    font-family: var(--font-display);
  }
</style>
