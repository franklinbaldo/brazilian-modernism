<script lang="ts">
  type TimelineItem = {
    date: string;
    title: string;
    description?: string;
    status?: 'done' | 'active' | 'pending';
  };
  type Props = { items: TimelineItem[] };

  let { items }: Props = $props();
</script>

<ol data-timeline>
  {#each items as item}
    <li data-status={item.status || 'pending'}>
      <time>{item.date}</time>
      <strong>{item.title}</strong>
      {#if item.description}<p>{item.description}</p>{/if}
    </li>
  {/each}
</ol>
