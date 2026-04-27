<script>
  let { children, type = "button", onclick = undefined, class: className = "", ...rest } = $props();
</script>

<button {type} {onclick} class="modern-button {className}" {...rest}>
  <span class="tracked-caps">{@render children?.()}</span>
</button>

<style>
  .modern-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    background-color: var(--color-accent);
    color: var(--color-bg);
    border: none;
    border-radius: var(--radius-curve);
    font-family: var(--font-modernist);
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
  }

  .modern-button:hover {
    background-color: #A3211A; /* Darker red */
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .modern-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .modern-button:focus-visible {
    outline: 2px solid var(--color-azul);
    outline-offset: 2px;
  }
</style>
