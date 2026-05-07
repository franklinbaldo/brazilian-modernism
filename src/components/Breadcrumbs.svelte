<script lang="ts">
  type BreadcrumbItem = { label: string; href?: string };
  type Props = { items: BreadcrumbItem[] };

  let { items }: Props = $props();
</script>

<nav aria-label="breadcrumb">
  <ol>
    {#each items as item, i}
      {@const isLast = i === items.length - 1}
      <li>
        {#if item.href && !isLast}
          <a href={item.href}>{item.label}</a>
        {:else}
          <span aria-current="page">{item.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
