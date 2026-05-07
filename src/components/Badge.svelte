<script lang="ts">
  import type { Snippet } from 'svelte';

  /**
   * Inline status pill. Renders <mark> so Pico's element selector applies.
   * Variants are forwarded as data-intent — never as classes.
   */
  type Props = {
    children?: Snippet;
    intent?: 'azul' | 'ouro' | 'ocre' | 'verde' | 'vermelho' | 'neutral' | 'default';
    /** @deprecated use `intent` */
    variant?: string;
    [key: string]: any;
  };

  let { children, intent, variant, ...rest }: Props = $props();
  let dataIntent = $derived(intent ?? variant ?? 'default');
</script>

<mark data-intent={dataIntent} {...rest}>{@render children?.()}</mark>
