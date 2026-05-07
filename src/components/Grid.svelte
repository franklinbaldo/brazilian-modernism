<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<any> & {
    columns?: number;
    gap?: string;
    as?: 'div' | 'section' | 'article' | 'main' | 'form' | 'fieldset';
    style?: string;
    children: Snippet;
  };

  let {
    columns = 12,
    gap = '2rem',
    as = 'div',
    style: customStyle = '',
    children,
    ...rest
  }: Props = $props();

  let gridStyle = $derived(
    [`display:grid`, `grid-template-columns:repeat(${columns},1fr)`, `gap:${gap}`, customStyle]
      .filter(Boolean)
      .join(';')
  );
</script>

<svelte:element this={as} data-grid style={gridStyle} {...rest}>
  {@render children()}
</svelte:element>
