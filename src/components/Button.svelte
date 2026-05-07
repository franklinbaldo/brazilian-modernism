<script lang="ts">
  import type { Snippet } from 'svelte';

  /**
   * Native <button> styled by Pico + COBOGÓ tokens.
   * Variants are forwarded as data-intent / data-size — never as classes.
   * @param intent  Visual treatment. "primary" | "secondary" | "outline" | "link"
   * @param size    Compact size. "small" | undefined
   */
  type Props = {
    children?: Snippet;
    type?: 'button' | 'submit' | 'reset';
    onclick?: (event: MouseEvent) => void;
    intent?: 'primary' | 'secondary' | 'outline' | 'link';
    size?: 'small';
    /** @deprecated use `intent` */
    variant?: string;
    [key: string]: any;
  };

  let {
    children,
    type = 'button',
    onclick,
    intent,
    size,
    variant,
    ...rest
  }: Props = $props();

  let dataIntent = $derived(
    intent ?? (variant === 'outline' ? 'outline' : variant === 'small' ? 'primary' : variant ?? 'primary')
  );
  let dataSize = $derived(size ?? (variant === 'small' ? 'small' : undefined));
</script>

<button {type} {onclick} data-intent={dataIntent} data-size={dataSize} {...rest}>
  {@render children?.()}
</button>
