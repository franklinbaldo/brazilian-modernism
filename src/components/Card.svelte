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
    background-color: var(--papel-00);
    border-radius: var(--r-1);
    padding: 2.5rem;
    position: relative;
    border: 2px solid var(--concreto-90);
    box-shadow: var(--shadow-1);
    transition: all 0.2s var(--ease-out);
  }

  .concrete-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-2);
  }

  .card-inner {
    position: relative;
    z-index: 10;
  }
</style>
