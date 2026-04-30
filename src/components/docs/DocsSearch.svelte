<script lang="ts">
  import { onMount } from 'svelte';

  let dialog: HTMLDialogElement;
  let isMac = $state(false);

  onMount(() => {
    isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        dialog?.showModal();
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  // Load Pagefind UI when dialog opens
  function handleOpen() {
    dialog?.showModal();
    initPagefind();
  }

  function handleClose() {
    dialog?.close();
  }

  let pagefindLoaded = false;
  async function initPagefind() {
    if (pagefindLoaded) return;
    try {
      const PagefindUI = await import('@pagefind/default-ui');
      new PagefindUI.PagefindUI({
        element: '#pagefind-container',
        showSubResults: true,
        baseUrl: '/cobogo/',
      });
      pagefindLoaded = true;
    } catch (e) {
      console.error('Failed to load Pagefind UI', e);
    }
  }

</script>

<button class="search-trigger" onclick={handleOpen} aria-label="Search">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
  <span class="search-text">Search</span>
  <kbd class="shortcut">{isMac ? '⌘K' : 'Ctrl+K'}</kbd>
</button>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog bind:this={dialog} class="search-modal" onclick={(e) => { if (e.target === dialog) handleClose(); }}>
  <div class="search-content">
    <div class="search-header">
      <button class="close-btn" onclick={handleClose} aria-label="Close search">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <div id="pagefind-container"></div>
  </div>
</dialog>

<style>
  .search-trigger {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: 1px solid var(--concreto-30, #e0e0e0);
    border-radius: var(--r-pill, 9999px);
    padding: 0.375rem 0.75rem;
    cursor: pointer;
    color: var(--fg-muted);
    font-family: var(--font-sans);
    transition: all 0.2s;
  }
  .search-trigger:hover {
    border-color: var(--concreto-60, #888);
    color: var(--fg);
  }
  .search-icon {
    flex-shrink: 0;
  }
  .search-text {
    font-size: var(--t-sm);
  }
  .shortcut {
    background: var(--bg-soft, #f4f4f4);
    border: 1px solid var(--concreto-30, #e0e0e0);
    border-radius: var(--r-1, 4px);
    padding: 0.125rem 0.375rem;
    font-size: 0.7rem;
    font-family: var(--font-mono);
    color: var(--fg-muted);
    margin-left: 0.5rem;
  }

  .search-modal {
    padding: 0;
    border: none;
    border-radius: var(--r-2, 8px);
    background: transparent;
    max-width: 600px;
    width: 90vw;
    margin: 10vh auto auto;
    box-shadow: var(--shadow-2, 0 10px 25px rgba(0,0,0,0.1));
  }
  .search-modal::backdrop {
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
  }

  .search-content {
    background: var(--bg, #fff);
    border-radius: var(--r-2, 8px);
    display: flex;
    flex-direction: column;
    max-height: 80vh;
  }

  .search-header {
    display: flex;
    justify-content: flex-end;
    padding: 0.5rem;
    border-bottom: 1px solid var(--concreto-20, #eee);
  }

  .close-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--fg-muted);
    padding: 0.5rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .close-btn:hover {
    color: var(--fg);
    background: var(--bg-soft, #f4f4f4);
  }

  #pagefind-container {
    padding: 1rem;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    .search-text, .shortcut {
      display: none;
    }
    .search-trigger {
      padding: 0.5rem;
      border-radius: 50%;
    }
    .search-modal {
      width: 100vw;
      height: 100vh;
      max-height: 100vh;
      margin: 0;
      border-radius: 0;
    }
    .search-content {
      border-radius: 0;
      height: 100%;
      max-height: 100%;
    }
  }

  /* Global pagefind overrides to fit cobogó style */
  :global(.pagefind-ui__search-input) {
    font-family: var(--font-sans) !important;
    border-radius: var(--r-1) !important;
  }
  :global(.pagefind-ui__result-title) {
    font-family: var(--font-sans) !important;
    font-weight: 700 !important;
  }
</style>
