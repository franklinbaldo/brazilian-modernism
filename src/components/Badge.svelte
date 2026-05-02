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
    border-radius: var(--r-pill);
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 0.6875rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .variant-azul {
    background-color: var(--azul);
    color: white;
  }

  .variant-ouro {
    background-color: var(--ocre);
    color: var(--concreto-90);
  }

  .variant-verde {
    background-color: var(--verde);
    color: white;
  }

  .variant-neutral {
    background-color: var(--papel-20);
    color: var(--concreto-90);
    border: 1px solid var(--concreto-40);
  }

  .variant-default {
    background-color: var(--concreto-40);
    color: var(--papel-00);
  }
</style>
