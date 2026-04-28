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
    border: 1px solid var(--border);
    transition: transform var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out);
  }

  .concrete-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  }

  .card-inner {
    position: relative;
    z-index: 10;
  }
</style>
