<script>
  let { children, class: className = "", pattern = "", ...rest } = $props();

  let patternClass = $derived(pattern ? `pattern-${pattern}` : "");
</script>

<div class="modern-card pattern-container {patternClass} {className}" {...rest}>
  <div class="card-content">
    {@render children?.()}
  </div>
</div>

<style>
  .modern-card {
    background-color: var(--color-surface);
    border-radius: var(--radius-concrete); /* Sharp corners */
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .card-content {
    position: relative;
    z-index: 2; /* Keep above pattern */
  }
</style>
