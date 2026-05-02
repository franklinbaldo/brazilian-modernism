<script lang="ts">
  import Pagination from '../../../components/Pagination.svelte';
  let currentPage = $state(1);
</script>

<div class="demo-wrapper">
  <Pagination
    {currentPage}
    totalPages={10}
    onPageChange={(page) => currentPage = page}
  />
</div>

<style>
  .demo-wrapper {
    display: flex;
    justify-content: center;
    padding: 2rem;
    background: var(--papel-10);
    border-radius: var(--r-soft);
  }
</style>
