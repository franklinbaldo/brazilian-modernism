<script>
  let { children, variant = "azul", class: className = "", ...rest } = $props();

  let variantClass = $derived(`variant-${variant}`);
</script>

<span class="modern-badge {variantClass} {className}" {...rest}>
  <span class="tracked-caps">{@render children?.()}</span>
</span>

<style>
  .modern-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-concrete); /* Or curve? Let's use concrete as it holds data/status */
    font-size: 0.75rem;
    font-weight: 600;
  }

  .variant-azul {
    background-color: var(--color-azul);
    color: var(--color-bg);
  }

  .variant-ouro {
    background-color: var(--color-ouro);
    color: var(--color-text); /* Better contrast */
  }

  .variant-verde {
    background-color: var(--color-verde);
    color: var(--color-bg);
  }
</style>
