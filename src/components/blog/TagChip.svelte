<script lang="ts">
  let { tag, count } = $props<{ tag: string; count?: number }>();
</script>

<a href={`/cobogo/blog/tags/${tag}`} data-chip>
  <span>{tag}</span>
  {#if count !== undefined}<small>{count}</small>{/if}
</a>
