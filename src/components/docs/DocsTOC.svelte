<script lang="ts">
  import { onMount } from 'svelte';

  type Heading = {
    depth: number;
    slug: string;
    text: string;
  };

  type Props = {
    headings: Heading[];
  };

  let { headings = [] }: Props = $props();

  let activeSlug = $state('');

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting entries
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // If multiple, pick the first one
          activeSlug = visible[0].target.id;
        }
      },
      { rootMargin: '-10% 0px -80% 0px' }
    );

    const headingElements = document.querySelectorAll('h2, h3');
    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  });

  function handleClick(e: MouseEvent, slug: string) {
    e.preventDefault();
    const target = document.getElementById(slug);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#${slug}`);
    }
  }
</script>

<nav class="docs-toc" aria-label="Table of Contents">
  <p class="toc-title">On this page</p>
  <ul>
    {#each headings.filter(h => h.depth === 2 || h.depth === 3) as heading}
      <li class:is-h3={heading.depth === 3}>
        <a
          href="#{heading.slug}"
          class:active={activeSlug === heading.slug}
          onclick={(e) => handleClick(e, heading.slug)}
        >
          {heading.text}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .docs-toc {
    position: sticky;
    top: 6rem;
    max-height: calc(100vh - 6rem);
    overflow-y: auto;
    width: 200px;
    padding-left: 1rem;
    font-family: var(--font-sans);
  }

  .toc-title {
    font-weight: 700;
    font-size: var(--t-sm);
    color: var(--fg);
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  .is-h3 {
    margin-left: 1rem;
  }

  a {
    display: block;
    text-decoration: none;
    color: var(--fg-muted);
    font-size: var(--t-sm);
    padding-left: 0.5rem;
    border-left: 2px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }

  a:hover {
    color: var(--fg);
  }

  a.active {
    color: var(--accent, var(--azul));
    font-weight: 800;
    border-left-color: var(--accent, var(--azul));
  }

  @media (max-width: 1024px) {
    .docs-toc {
      display: none;
    }
  }
</style>
