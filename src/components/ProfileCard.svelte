<script>
  export let name = 'Nome da Entidade';
  export let role = 'Cargo ou Função';
  export let image = '';
  export let tags = [];
  export let variant = 'default';
</script>

<article data-profile-card data-variant={variant} data-interactive>
  <figure data-pattern="bulcao">
    {#if image}
      <img src={image} alt={name} />
    {:else}
      <span aria-hidden="true">{name.charAt(0)}</span>
    {/if}
  </figure>

  <header>
    {#if tags.length}
      <p>
        {#each tags as tag}<small data-chip>{tag}</small>{/each}
      </p>
    {/if}
    <h3>{name}</h3>
    <p>{role}</p>
  </header>

  <slot name="footer" />
</article>
