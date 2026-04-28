<script>
  export let name = "Nome da Entidade";
  export let role = "Cargo ou Função";
  export let image = "";
  export let tags = [];
  export let variant = "default"; // default, outline
</script>

<div class="profile-card {variant}">
  <div class="profile-card__frame">
    {#if image}
      <img src={image} alt={name} class="profile-card__image" />
    {:else}
      <div class="profile-card__placeholder">
        <span class="font-display">{name.charAt(0)}</span>
      </div>
    {/if}
    <div class="profile-card__decoration pattern-bulcao"></div>
  </div>
  
  <div class="profile-card__content">
    <div class="profile-card__tags">
      {#each tags as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>
    <h3 class="profile-card__name">{name}</h3>
    <p class="profile-card__role">{role}</p>
    
    <slot name="footer" />
  </div>
</div>

<style>
  .profile-card {
    background: var(--papel-00);
    border: 1px solid var(--papel-30);
    border-radius: var(--r-1);
    overflow: hidden;
    transition: all 0.3s var(--ease-out);
    display: flex;
    flex-direction: column;
  }

  .profile-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-1);
    border-color: var(--azul);
  }

  .profile-card__frame {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    background: var(--papel-20);
  }

  .profile-card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0.2);
    transition: transform 0.6s var(--ease-out);
  }

  .profile-card:hover .profile-card__image {
    transform: scale(1.05) grayscale(0);
  }

  .profile-card__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    color: var(--concreto-40);
  }

  .profile-card__decoration {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 60px;
    height: 60px;
    opacity: 0.2;
    pointer-events: none;
  }

  .profile-card__content {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .profile-card__tags {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tag {
    font-size: 10px;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 0.1em;
    background: var(--papel-20);
    padding: 2px 8px;
    border-radius: 2px;
    color: var(--concreto-60);
  }

  .profile-card__name {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
    line-height: 1.2;
  }

  .profile-card__role {
    font-size: 0.875rem;
    color: var(--fg-muted);
    margin: 0;
  }

  .outline {
    background: transparent;
    border-style: dashed;
  }
</style>
