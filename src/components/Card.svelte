<script>
  let { children, class: className = "", pattern = "", ...rest } = $props();

  let azulejoClass = $derived(pattern ? `azulejo-${pattern}` : "");
</script>

<div class="concrete-card azulejo-soft {azulejoClass} {className}" {...rest}>
  <div class="card-inner">
    {@render children?.()}
  </div>
</div>

<style>
  .concrete-card {
    background-color: var(--color-surface);
    border-radius: var(--radius-0);
    padding: 2rem;
    position: relative;
    border: 1px solid var(--color-border);
    transition: transform var(--duration-bossa) var(--ease-curva), box-shadow var(--duration-bossa) var(--ease-curva);
  }

  .concrete-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-pool-sm);
  }

  .card-inner {
    position: relative;
    z-index: 10;
  }
</style>
