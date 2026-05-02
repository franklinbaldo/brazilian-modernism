<script lang="ts">
  import Breadcrumbs from '../../../components/Breadcrumbs.svelte';

  const items = [
    { label: 'Home', href: '#' },
    { label: 'Components', href: '#' },
    { label: 'Breadcrumbs' }
  ];
</script>

<div class="demo-wrapper">
  <Breadcrumbs {items} />
</div>

<style>
  .demo-wrapper {
    padding: 1.5rem;
    background: var(--papel-10);
    border-radius: var(--r-soft);
  }
</style>
