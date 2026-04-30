<script lang="ts">
  import { onMount } from 'svelte';

  // TODO: Dark mode tokens implementation in a future PR
  // Currently this component adds `.dark-mode` to html but does not style it.

  let isDark = $state(false);

  onMount(() => {
    const saved = localStorage.getItem('cobogo-theme');
    if (saved === 'dark') {
      isDark = true;
      document.documentElement.classList.add('dark-mode');
    } else if (saved === 'light') {
      isDark = false;
      document.documentElement.classList.remove('dark-mode');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      isDark = prefersDark;
      if (prefersDark) {
        document.documentElement.classList.add('dark-mode');
      }
    }
  });

  function toggleTheme() {
    isDark = !isDark;
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('cobogo-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('cobogo-theme', 'light');
    }
  }
</script>

<button
  class="theme-toggle"
  onclick={toggleTheme}
  aria-label="Toggle theme"
  title={isDark ? "Switch to light mode" : "Switch to dark mode"}
>
  <div class="icon-wrapper" class:is-dark={isDark}>
    <!-- Sun icon -->
    <svg class="sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
    <!-- Moon icon -->
    <svg class="moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
  </div>
</button>

<style>
  .theme-toggle {
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--fg-muted, #495057);
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s, background 0.2s;
    overflow: hidden;
  }

  .theme-toggle:hover {
    color: var(--fg, #212529);
    background: var(--bg-soft, #f8f9fa);
  }

  .icon-wrapper {
    position: relative;
    width: 20px;
    height: 20px;
  }

  .sun, .moon {
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.5s ease, opacity 0.5s ease;
  }

  /* Default (Light) state */
  .sun {
    transform: rotate(0) scale(1);
    opacity: 1;
  }
  .moon {
    transform: rotate(-90deg) scale(0);
    opacity: 0;
  }

  /* Dark state */
  .is-dark .sun {
    transform: rotate(90deg) scale(0);
    opacity: 0;
  }
  .is-dark .moon {
    transform: rotate(0) scale(1);
    opacity: 1;
  }
</style>
