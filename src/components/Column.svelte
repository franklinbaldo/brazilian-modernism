<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<any> & {
    span?: number;
    sm?: number;
    md?: number;
    lg?: number;
    start?: number;
    as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'nav';
    style?: string;
    children: Snippet;
  };

  let {
    span = 12,
    sm,
    md,
    lg,
    start,
    as = 'div',
    style: customStyle = '',
    children,
    ...rest
  }: Props = $props();

  let colStyle = $derived(
    [
      `--col-span:${span}`,
      sm ? `--col-sm:${sm}` : '',
      md ? `--col-md:${md}` : '',
      lg ? `--col-lg:${lg}` : '',
      start ? `grid-column-start:${start}` : '',
      customStyle,
    ]
      .filter(Boolean)
      .join(';')
  );
</script>

<svelte:element this={as} data-column style={colStyle} {...rest}>
  {@render children()}
</svelte:element>
