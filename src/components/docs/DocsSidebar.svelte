<script lang="ts">
  type Entry = { slug: string; title: string; section: string; order: number };
  type Props = { entries: Entry[]; currentSlug: string };

  let { entries, currentSlug }: Props = $props();

  let sections = $derived(Array.from(new Set(entries.map((e) => e.section))));
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
        const init: Record<string, boolean> = {};
        sections.forEach((s) => (init[s] = true));
        openSections = init;
      }
    } catch (e) {
      console.warn('Failed to read sidebar state from localStorage', e);
    }
  });

  $effect(() => {
    if (Object.keys(openSections).length > 0) {
      try {
        localStorage.setItem('cobogo-docs-sidebar', JSON.stringify(openSections));
      } catch (e) {
        console.warn('Failed to save sidebar state to localStorage', e);
      }
    }
  });
</script>

<aside data-docs-sidebar>
  <nav>
    {#each sections as section}
      {@const isOpen = openSections[section] ?? true}
      <details bind:open={openSections[section]}>
        <summary>{section}</summary>
        <ul>
          {#each groupedEntries[section] as entry}
            {@const isActive = currentSlug === `/cobogo/docs/${entry.slug}/` || currentSlug === `/cobogo/docs/${entry.slug}`}
            <li>
              <a
                href={`/cobogo/docs/${entry.slug}/`}
                aria-current={isActive ? 'page' : undefined}
              >
                {entry.title}
              </a>
            </li>
          {/each}
        </ul>
      </details>
    {/each}
  </nav>
</aside>
