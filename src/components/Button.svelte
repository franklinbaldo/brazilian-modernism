<script>
  let { children, type = "button", onclick = undefined, class: className = "", variant = "primary", ...rest } = $props();
</script>

<button {type} {onclick} class="bossa-button {variant} {className}" {...rest}>
  <span class="label">{@render children?.()}</span>
</button>

<style>
  .bossa-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem 2rem;
    border-radius: var(--radius-pill);
    font-family: var(--font-body);
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-size: 0.8125rem;
    cursor: pointer;
    transition: 
      background var(--duration-snap) var(--ease-curva),
      transform var(--duration-bossa) var(--ease-curva),
      box-shadow var(--duration-bossa) var(--ease-curva);
    border: none;
  }

  .primary {
    background-color: var(--color-accent);
    color: #ffffff;
  }

  .primary:hover {
    background-color: var(--color-accent-hover);
    transform: translateY(-2px);
    box-shadow: var(--shadow-pool-sm);
  }

  .outline {
    background-color: transparent;
    border: 2px solid var(--color-accent);
    color: var(--color-accent);
    padding: 0.75rem 1.875rem;
  }

  .outline:hover {
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
