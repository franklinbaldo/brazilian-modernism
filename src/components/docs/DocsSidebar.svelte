<script lang="ts">
  type Entry = {
    slug: string;
    title: string;
    section: string;
    order: number;
  };

  type Props = {
    entries: Entry[];
    currentSlug: string;
  };

  let { entries, currentSlug }: Props = $props();

  let sections = $derived(
    Array.from(new Set(entries.map((e) => e.section)))
  );

  let groupedEntries = $derived(
    sections.reduce((acc, section) => {
      acc[section] = entries.filter((e) => e.section === section);
      return acc;
    }, {} as Record<string, Entry[]>)
  );
</script>

<aside class="docs-sidebar">
  <nav>
    {#each sections as section}
      <div class="sidebar-section">
        <h3 class="section-title">{section}</h3>
        <ul class="section-links">
          {#each groupedEntries[section] as entry}
            {@const isActive = currentSlug === `/cobogo/docs/${entry.slug}/` || currentSlug === `/cobogo/docs/${entry.slug}`}
            <li>
              <a
                href={`/cobogo/docs/${entry.slug}/`}
                class="sidebar-link"
                class:active={isActive}
              >
                {entry.title}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </nav>
</aside>

<style>
  .docs-sidebar {
    position: sticky;
    top: 6rem;
    max-height: calc(100vh - 6rem);
    overflow-y: auto;
    width: 220px;
  }

  .sidebar-section {
    margin-bottom: 2rem;
  }

  .section-title {
    text-transform: uppercase;
    font-size: var(--t-small);
    font-weight: 800;
    color: var(--fg-muted);
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }

  .section-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sidebar-link {
    display: block;
    padding: 0.375rem 0;
    font-size: var(--t-body);
    color: var(--fg);
    text-decoration: none;
  }

  .sidebar-link:hover {
    color: var(--accent);
  }

  .sidebar-link.active {
    font-weight: 800;
    color: var(--accent);
    border-left: 2px solid var(--accent);
    padding-left: 0.75rem;
  }

  @media (max-width: 1024px) {
    .docs-sidebar {
      display: none;
    }
  }
</style>
