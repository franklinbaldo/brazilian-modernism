<script lang="ts">
  let {
    title,
    description,
    pubDate,
    tags = [],
    slug,
    heroImage,
    variant = 'compact'
  } = $props<{
    title: string;
    description: string;
    pubDate: string;
    tags?: string[];
    slug: string;
    heroImage?: string;
    variant?: 'compact' | 'featured';
  }>();
</script>

<article class="post-card variant-{variant}">
  {#if heroImage}
    <a href={`/cobogo/blog/${slug}`} class="post-card__image-link">
      <img src={heroImage} alt="" class="post-card__image" />
    </a>
  {/if}

  <div class="post-card__content">
    {#if tags.length > 0}
      <div class="post-card__tags">
        {#each tags as tag}
          <span class="post-card__tag">{tag}</span>
        {/each}
      </div>
    {/if}

    <h3 class="post-card__title">
      <a href={`/cobogo/blog/${slug}`}>{title}</a>
    </h3>

    {#if description}
      <p class="post-card__desc">{description}</p>
    {/if}

    <div class="post-card__meta">
      <time>{pubDate}</time>
      <span class="post-card__arrow">→</span>
    </div>
  </div>
</article>

<style>
  .post-card {
    display: flex;
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: var(--r-soft);
    overflow: hidden;
    transition: all var(--duration-bossa) var(--ease-curva);
  }

  .post-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-sm);
    border-color: var(--border-strong);
  }

  /* Compact Variant (List) */
  .variant-compact {
    flex-direction: row;
    align-items: stretch;
  }

  .variant-compact .post-card__image-link {
    width: 200px;
    flex-shrink: 0;
    border-right: 1px solid var(--border);
  }

  @media (max-width: 640px) {
    .variant-compact {
      flex-direction: column;
    }
    .variant-compact .post-card__image-link {
      width: 100%;
      height: 160px;
      border-right: none;
      border-bottom: 1px solid var(--border);
    }
  }

  /* Featured Variant (Highlight) */
  .variant-featured {
    flex-direction: column;
  }

  .variant-featured .post-card__image-link {
    width: 100%;
    aspect-ratio: 16/9;
    border-bottom: 1px solid var(--border);
  }

  .post-card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .post-card__content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .post-card__tags {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .post-card__tag {
    font-size: 0.6875rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
  }

  .post-card__title {
    font-family: var(--font-display);
    font-size: 1.5rem;
    line-height: var(--lh-tight);
    margin-bottom: 0.5rem;
  }

  .variant-featured .post-card__title {
    font-size: 2rem;
  }

  .post-card__title a {
    color: var(--fg-heading);
  }

  .post-card__title a::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
  }
  .post-card { position: relative; }

  .post-card__desc {
    color: var(--fg-muted);
    font-size: 0.875rem;
    line-height: var(--lh-body);
    margin-bottom: 1.5rem;
    flex: 1;
  }

  .post-card__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--fg-muted);
    border-top: 1px solid var(--border);
    padding-top: 1rem;
    margin-top: auto;
  }

  .post-card__arrow {
    font-size: 1.25rem;
    transition: transform var(--duration-bossa);
  }

  .post-card:hover .post-card__arrow {
    transform: translateX(4px);
    color: var(--accent);
  }
</style>
