<script lang="ts">
  import Button from '../../../components/Button.svelte';
</script>

<div class="demo-wrapper">
  <div class="row">
    <Button variant="primary">Primary Action</Button>
    <Button variant="secondary">Secondary Action</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
  </div>

  <div class="row">
    <Button variant="danger">Danger</Button>
    <Button variant="primary" disabled>Disabled</Button>
  </div>
</div>

<style>
  .demo-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem;
    background: var(--papel-10);
    border-radius: var(--r-soft);
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }
</style>
