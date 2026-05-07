<script lang="ts">
  type Props = { slug: string; level?: 2 | 3 };

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
  href={`#${slug}`}
  data-header-anchor
  onclick={copyLink}
  aria-label="Link to this section"
  title={copied ? 'Copied!' : 'Copy link'}
>
  <small>#</small>
</a>
