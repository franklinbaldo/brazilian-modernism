<script lang="ts">
  import Alert from '../../../components/Alert.svelte';
</script>

<div class="demo-wrapper">
  <Alert variant="info" title="Information">
    This is an info alert demonstrating the 'Curva & Concreto' aesthetic. Soft background with a sharp border.
  </Alert>

  <Alert variant="success" title="Success" dismissible>
    This is a dismissible success alert.
  </Alert>

  <Alert variant="warning" title="Warning">
    Please review the following warnings before proceeding.
  </Alert>

  <Alert variant="danger" title="Danger">
    A critical error occurred while saving your changes.
  </Alert>
</div>

<style>
  .demo-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
