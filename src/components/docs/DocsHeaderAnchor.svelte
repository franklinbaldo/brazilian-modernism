<script lang="ts">
  type Props = {
    slug: string;
    level?: 2 | 3;
  };

  let { slug, level = 2 }: Props = $props();

  let copied = $state(false);

  async function copyLink(e: MouseEvent) {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.hash = slug;
    try {
      await navigator.clipboard.writeText(url.toString());
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  }
</script>

<a
  href="#{slug}"
  class="header-anchor"
  onclick={copyLink}
  aria-label="Link to this section"
  title={copied ? "Copied!" : "Copy link"}
>
  <span class="hash">#</span>
</a>

<style>
  .header-anchor {
    opacity: 0;
    text-decoration: none;
    color: var(--concreto-60, #6c757d);
    margin-left: 0.5rem;
    transition: opacity 0.2s, color 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    /* Move slightly up to align visually with heading text */
    top: -0.05em;
  }

  /* Assuming this component is placed INSIDE the h2/h3 */
  :global(h2:hover) .header-anchor,
  :global(h3:hover) .header-anchor {
    opacity: 1;
  }

  .header-anchor:hover {
    color: var(--accent, var(--azul));
  }

  .hash {
    font-size: 0.8em;
  }
</style>
