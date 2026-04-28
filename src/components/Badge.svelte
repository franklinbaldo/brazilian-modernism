<script>
  let { children, variant = "azul", class: className = "", ...rest } = $props();

  let variantClass = $derived(`variant-${variant}`);
</script>

<span class="concrete-badge {variantClass} {className}" {...rest}>
  <span class="label">{@render children?.()}</span>
</span>

<style>
  .concrete-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-pill);
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.6875rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .variant-azul {
    background-color: var(--color-azul);
    color: #ffffff;
  }

  .variant-ouro {
    background-color: var(--color-ouro);
    color: var(--color-text);
  }

  .variant-verde {
    background-color: var(--color-verde);
    color: #ffffff;
  }
</style>
