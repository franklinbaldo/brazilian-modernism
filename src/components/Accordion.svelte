<script lang="ts">
  import { setContext, type Snippet } from 'svelte';

  /**
   * Accordion Component
   *
   * An organism that groups multiple Disclosure molecules. It enforces mutually
   * exclusive states natively by providing a shared `name` context to its children.
   *
   * @prop {string} name - Required. A unique name to group the child Disclosures.
   * @prop {Snippet} children - Svelte snippet containing Disclosure molecules.
   */
  type Props = {
    name: string;
    children: Snippet;
  };

  let { name, children }: Props = $props();

  // Provide the group name to all nested Disclosure components implicitly
  // We use a getter function to ensure reactivity if `name` changes dynamically
  setContext('accordion-name', () => name);
</script>

<div class="accordion">
  {@render children()}
</div>

<style>
  .accordion {
    display: flex;
    flex-direction: column;
    gap: 0.5rem; /* Space between the disclosures */
  }
</style>
