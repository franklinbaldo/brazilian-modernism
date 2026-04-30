import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import pagefind from 'astro-pagefind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://franklinbaldo.github.io',
  base: '/cobogo',
  integrations: [svelte(), pagefind(), mdx()],
});
