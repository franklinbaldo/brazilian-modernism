<script lang="ts">
  import Dialog from '../../../components/Dialog/Dialog.svelte';
  import DialogHeader from '../../../components/Dialog/DialogHeader.svelte';
  import DialogBody from '../../../components/Dialog/DialogBody.svelte';
  import DialogFooter from '../../../components/Dialog/DialogFooter.svelte';
  import Button from '../../../components/Button.svelte';

  let open = $state(false);
</script>

<div class="demo-wrapper">
  <Button onclick={() => open = true}>Open Modal Demo</Button>

  <Dialog bind:open aria-label="Demo modal">
    <DialogHeader title="Modernist Modularity" />
    <DialogBody>
      <p>
        The superquadras of Brasília were designed not merely as housing, but as holistic
        neighborhoods. The geometry dictates that nothing blocks the sun and the ground
        is left public, open on pilotis. A modal functions similarly — lifting content off
        the ground layer, demanding attention, but retaining the visual context of what
        lies underneath via the backdrop.
      </p>
    </DialogBody>
    <DialogFooter>
      <Button variant="secondary" onclick={() => open = false}>Close</Button>
    </DialogFooter>
  </Dialog>
</div>

<style>
  .demo-wrapper {
    padding: 2rem;
    border: 1px solid var(--concreto-40);
    border-radius: var(--r-soft);
    background-color: var(--papel-10);
    margin-bottom: 2rem;
  }
  p {
    margin: 0;
  }
</style>
