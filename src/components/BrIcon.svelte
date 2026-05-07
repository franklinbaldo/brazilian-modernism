<script lang="ts" module>
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
  const explicitHidden = $derived(ariaHidden === true || ariaHidden === 'true');
  const explicitShown = $derived(ariaHidden === false || ariaHidden === 'false');
  const isDecorative = $derived(explicitHidden || (!explicitShown && !title));
</script>

{#if svg}
  <span
    data-icon
    style:width="{size}px"
    style:height="{size}px"
    style:color={color ?? 'inherit'}
    role={isDecorative ? undefined : 'img'}
    aria-hidden={isDecorative ? 'true' : undefined}
    aria-label={isDecorative ? undefined : title}
  >
    {@html svg}
  </span>
{:else}
  <span data-icon data-missing style:width="{size}px" style:height="{size}px">?</span>
{/if}
