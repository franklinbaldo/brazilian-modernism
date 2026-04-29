<script lang="ts">
  let {
    tag,
    count
  } = $props<{
    tag: string;
    count?: number;
  }>();
</script>

<a href={`/cobogo/blog/tags/${tag}`} class="tag-chip">
  <span class="tag-chip__name">{tag}</span>
  {#if count !== undefined}
    <span class="tag-chip__count">{count}</span>
  {/if}
</a>

<style>
  .tag-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.875rem;
    background: var(--papel-20);
    border: 1px solid var(--border);
    border-radius: var(--r-pill);
    text-decoration: none;
    transition: all var(--duration-bossa) var(--ease-curva);
  }

  .tag-chip:hover {
    background: var(--papel-00);
    border-color: var(--accent);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }

  .tag-chip__name {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--fg);
  }

  .tag-chip:hover .tag-chip__name {
    color: var(--accent);
  }

  .tag-chip__count {
    font-size: 0.75rem;
    color: var(--fg-muted);
    background: var(--papel-30);
    padding: 0.125rem 0.375rem;
    border-radius: var(--r-pill);
  }
</style>
