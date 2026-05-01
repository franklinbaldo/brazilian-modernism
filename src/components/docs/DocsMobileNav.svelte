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
    open: boolean;
  };

  let { entries, currentSlug, open = $bindable(false) }: Props = $props();

  let sections = $derived(Array.from(new Set(entries.map((e) => e.section))));

  let groupedEntries = $derived(
    sections.reduce((acc, section) => {
      acc[section] = entries.filter((e) => e.section === section);
      return acc;
    }, {} as Record<string, Entry[]>)
  );

  let closeBtnElement: HTMLButtonElement | undefined = $state(undefined);

  $effect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      // Focus management
      if (closeBtnElement) {
        closeBtnElement.focus();
      }
    } else {
      document.body.style.overflow = '';
      // Simple focus return: assuming the trigger button has id="mobile-nav-trigger"
      const trigger = document.getElementById('mobile-nav-trigger');
      if (trigger && document.activeElement === closeBtnElement) {
        trigger.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  });

  $effect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) {
        open = false;
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  $effect(() => {
    function handleToggleEvent() {
      open = !open;
    }
    window.addEventListener('toggleMobileNav', handleToggleEvent);
    return () => window.removeEventListener('toggleMobileNav', handleToggleEvent);
  });
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="backdrop" class:open onclick={() => open = false}></div>
{/if}

<aside id="mobile-nav" class="drawer" class:open>
  <div class="drawer-header">
    <div class="brand">COBOGÓ</div>
    <button bind:this={closeBtnElement} class="close-btn" aria-label="Close navigation" onclick={() => open = false}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
  <nav class="drawer-content">
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
                onclick={() => open = false}
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
  .backdrop {
    position: fixed;
    inset: 0;
    background: var(--concreto-90, rgba(0, 0, 0, 0.5));
    opacity: 0;
    z-index: 50;
    transition: opacity 250ms var(--ease-out, ease-out);
  }

  .backdrop.open {
    opacity: 0.5; /* Semi-transparent overlay */
  }

  .drawer {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 280px;
    background: var(--bg, #fff);
    z-index: 60;
    transform: translateX(-100%);
    transition: transform 250ms var(--ease-out, ease-out);
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-2, 2px 0 8px rgba(0,0,0,0.1));
  }

  .drawer.open {
    transform: translateX(0);
  }

  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--concreto-30, #e0e0e0);
  }

  .brand {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.2rem;
  }

  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--fg);
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .drawer-content {
    padding: 1.5rem;
    overflow-y: auto;
    flex: 1;
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
    padding: 0;
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
</style>
