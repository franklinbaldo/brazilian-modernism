<script lang="ts">
  type NavLink = { slug: string; title: string };
  type Props = { prev?: NavLink; next?: NavLink };

  let { prev, next }: Props = $props();
</script>

<nav data-prev-next aria-label="Anterior e próximo">
  {#if prev}
    <a href={`/cobogo/docs/${prev.slug}/`} rel="prev">
      <small data-kicker>← Anterior</small>
      <strong>{prev.title}</strong>
    </a>
  {:else}
    <span></span>
  {/if}

  {#if next}
    <a href={`/cobogo/docs/${next.slug}/`} rel="next">
      <small data-kicker>Próximo →</small>
      <strong>{next.title}</strong>
    </a>
  {:else}
    <span></span>
  {/if}
</nav>
