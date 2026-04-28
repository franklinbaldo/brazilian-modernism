<script>
  let { children, type = "button", onclick = undefined, class: className = "", variant = "primary", ...rest } = $props();
</script>

<button {type} {onclick} class="button {variant} {className}" {...rest}>
  <span class="label">{@render children?.()}</span>
</button>

<style>
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.875rem 1.75rem;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    background-color: var(--color-accent);
    color: white;
    transform: translateY(-2px);
  }

  .small {
    padding: 0.5rem 1.25rem;
    font-size: 0.7rem;
  }

  .bossa-button:active {
    transform: translateY(0);
  }

  .bossa-button:focus-visible {
    outline: 2px solid var(--color-azul);
    outline-offset: 3px;
  }
</style>
