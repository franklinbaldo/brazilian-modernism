<script lang="ts">
  /**
   * PageHeader displays a main title, optional kicker, optional lede, and optional actions.
   * @param {string} title - The main heading for the page.
   * @param {string} [lede] - An optional subheading or description below the title.
   * @param {string} [kicker] - An optional small uppercase label above the title.
   * @param {'left' | 'center'} [align='left'] - Alignment of the text content.
   * @param {import('svelte').Snippet} [children] - Actions slot for buttons or links on the right.
   */
  let {
    title,
    lede,
    kicker,
    align = 'left',
    children
  }: {
    title: string;
    lede?: string;
    kicker?: string;
    align?: 'left' | 'center';
    children?: import('svelte').Snippet;
  } = $props();
</script>

<header class="page-header" class:align-center={align === 'center'}>
  <div class="content">
    {#if kicker}
      <span class="kicker">{kicker}</span>
    {/if}
    <h1 class="title">{title}</h1>
    {#if lede}
      <p class="lede">{lede}</p>
    {/if}
  </div>
  {#if children}
    <div class="actions">
      {@render children()}
    </div>
  {/if}
</header>

<style>
  .page-header {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  @media (min-width: 768px) {
    .page-header {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    }
    .page-header.align-center {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
  }

  .page-header.align-center .content {
    align-items: center;
  }

  .kicker {
    font-family: var(--font-sans);
    font-size: var(--t-sm);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent);
  }

  .title {
    font-family: var(--font-display);
    color: var(--fg-heading);
    margin: 0;
    font-size: clamp(2rem, 8vw, var(--t-h1));
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .lede {
    font-family: var(--font-sans);
    font-size: var(--t-lg);
    color: var(--fg-muted);
    margin: 0;
    max-width: 65ch;
    line-height: 1.5;
  }

  .actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
  }

  @media (max-width: 768px) {
    .page-header.align-center,
    .page-header.align-center .content {
      align-items: flex-start;
      text-align: left;
    }
  }
</style>
