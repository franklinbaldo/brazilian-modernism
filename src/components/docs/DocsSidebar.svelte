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

  let openSections: Record<string, boolean> = $state({});

  $effect(() => {
    try {
      const stored = localStorage.getItem('cobogo-docs-sidebar');
      if (stored) {
        openSections = JSON.parse(stored);
      } else {
        // Initialize all to open by default
        const init: Record<string, boolean> = {};
        sections.forEach(s => init[s] = true);
        openSections = init;
      }
    } catch (e) {
      console.warn('Failed to read sidebar state from localStorage', e);
    }
  });

  $effect(() => {
    // Only write if we have keys (prevents writing empty on SSR/hydration initial pass before read)
    if (Object.keys(openSections).length > 0) {
      try {
        localStorage.setItem('cobogo-docs-sidebar', JSON.stringify(openSections));
      } catch (e) {
        console.warn('Failed to save sidebar state to localStorage', e);
      }
    }
  });

  function toggleSection(section: string) {
    // If not in state yet, default it to true and toggle it
    const currentState = openSections[section] ?? true;
    openSections[section] = !currentState;
  }
</script>

<aside class="docs-sidebar">
  <nav>
    {#each sections as section}
      {@const isOpen = openSections[section] ?? true}
      <div class="sidebar-section">
        <button
          class="section-title"
          onclick={() => toggleSection(section)}
          aria-expanded={isOpen}
          aria-controls={`section-${section}`}
        >
          <svg class="chevron" class:open={isOpen} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          {section}
        </button>
        <div class="section-links-wrapper" class:open={isOpen}>
          <ul id={`section-${section}`} class="section-links" role="region">
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
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    background: none;
    border: none;
    padding: 0;
    text-align: left;
    text-transform: uppercase;
    font-size: var(--t-small);
    font-weight: 800;
    color: var(--fg-muted);
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
    cursor: pointer;
  }

  .chevron {
    transition: transform 200ms var(--ease-out, ease-out);
    transform: rotate(0deg);
  }
  .chevron.open {
    transform: rotate(90deg);
  }

  .section-links-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 200ms var(--ease-out, ease-out);
  }

  .section-links-wrapper.open {
    grid-template-rows: 1fr;
  }

  .section-links {
    overflow: hidden;
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
