<script lang="ts">
  import Card from '../../../components/Card.svelte';
</script>

<div class="demo-wrapper">
  <Card>
    <h3>Concrete Geometry</h3>
    <p>This card demonstrates the sharp concrete aesthetics combined with honest pool shadows. It serves as an un-opinionated container for static information.</p>
  </Card>

  <Card pattern="geometric">
    <h3>Patterned Card</h3>
    <p>Cards can also support subtle background patterns (like "geometric") from the COBOGÓ visual identity, ensuring the pattern opacity remains low to not disturb the content.</p>
  </Card>
</div>

<style>
  .demo-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: var(--t-h4);
  }
  p {
    margin: 0;
    color: var(--concreto-80);
    line-height: 1.5;
  }
</style>
