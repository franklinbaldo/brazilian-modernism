<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    type?: 'button' | 'submit' | 'reset';
    onclick?: (event: MouseEvent) => void;
    class?: string;
    variant?: 'primary' | 'outline' | 'small' | string;
    [key: string]: any;
  };

  let { children, type = "button", onclick = undefined, class: className = "", variant = "primary", ...rest }: Props = $props();
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
    transition: all var(--dur-2) var(--ease-out);
    border: none;
  }

  .button.primary {
    background-color: var(--azul);
    color: white;
  }

  .button.outline {
    background-color: transparent;
    border: 1px solid var(--border-strong);
    color: var(--fg);
  }

  .button:hover {
    transform: translateY(-2px);
  }

  .button.primary:hover {
    background-color: var(--azul-bright);
  }

  .button.outline:hover {
    background-color: var(--papel-00);
  }

  .button:active {
    transform: translateY(0);
  }

  .button:focus-visible {
    outline: 2px solid var(--azul);
    outline-offset: 3px;
  }

  .small {
    padding: 0.5rem 1.25rem;
    font-size: 0.7rem;
  }
</style>
