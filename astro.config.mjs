import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import pagefind from 'astro-pagefind';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://franklinbaldo.github.io',
  base: '/cobogo',
  integrations: [
    svelte(),
    pagefind(),
    astroExpressiveCode({
      themes: ['github-light', 'github-dark'],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => theme.name === 'github-dark' ? '.dark-mode' : '[data-theme="light"], :root:not(.dark-mode)',
      defaultProps: { wrap: true },
      styleOverrides: {
        borderRadius: '8px',
        codeFontFamily: "'JetBrains Mono', monospace",
        frames: { editorActiveTabBackground: 'var(--papel-00)' }
      }
    }),
    mdx()
  ],
});
