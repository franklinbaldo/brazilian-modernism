<script lang="ts">
  type NavLink = {
    slug: string;
    title: string;
  };

  type Props = {
    prev?: NavLink;
    next?: NavLink;
  };

  let { prev, next }: Props = $props();
</script>

<nav class="prev-next-nav">
  {#if prev}
    <a href={`/cobogo/docs/${prev.slug}/`} class="nav-link nav-prev">
      <span class="kicker">&larr; Anterior</span>
      <span class="title">{prev.title}</span>
    </a>
  {:else}
    <div></div>
  {/if}

  {#if next}
    <a href={`/cobogo/docs/${next.slug}/`} class="nav-link nav-next">
      <span class="kicker">Próximo &rarr;</span>
      <span class="title">{next.title}</span>
    </a>
  {:else}
    <div></div>
  {/if}
</nav>

<style>
  .prev-next-nav {
    display: flex;
    justify-content: space-between;
    padding: 3rem 0;
    border-top: 1px solid var(--border);
    margin-top: 4rem;
  }

  .nav-link {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid var(--border);
    border-radius: var(--r-soft);
    max-width: 45%;
    text-decoration: none;
    color: var(--fg);
    transition: border-color var(--dur-2) var(--ease-out);
  }

  .nav-link:hover {
    border-color: var(--accent);
  }

  .nav-prev {
    align-items: flex-start;
  }

  .nav-next {
    align-items: flex-end;
    text-align: right;
  }

  .kicker {
    font-size: var(--t-small);
    color: var(--fg-muted);
    margin-bottom: 0.25rem;
  }

  .title {
    font-size: var(--t-body);
    font-weight: bold;
    color: var(--accent);
  }
</style>
