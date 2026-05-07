<script lang="ts">
  import type { Snippet } from 'svelte';

  /**
   * Pico styles <article> as a card natively. COBOGÓ adds the pool-shadow
   * grammar from global.css. Decorative azulejo overlays are exposed as
   * data-pattern, never classes.
   */
  type Props = {
    children?: Snippet;
    pattern?: string;
    interactive?: boolean;
    [key: string]: any;
  };

  let { children, pattern, interactive, ...rest }: Props = $props();
</script>

<article
  data-pattern={pattern || undefined}
  data-interactive={interactive ? '' : undefined}
  {...rest}
>
  {@render children?.()}
</article>
