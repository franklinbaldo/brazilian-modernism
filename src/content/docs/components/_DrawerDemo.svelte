<script lang="ts">
  import Drawer from '../../../components/Drawer/Drawer.svelte';
  import DrawerHeader from '../../../components/Drawer/DrawerHeader.svelte';
  import DrawerBody from '../../../components/Drawer/DrawerBody.svelte';
  import DrawerFooter from '../../../components/Drawer/DrawerFooter.svelte';
  import Button from '../../../components/Button.svelte';

  let openRight = $state(false);
  let openLeft = $state(false);
</script>

<div class="demo-wrapper">
  <div class="button-group">
    <Button onclick={() => openRight = true}>Open Right Drawer</Button>
    <Button variant="secondary" onclick={() => openLeft = true}>Open Left Drawer</Button>
  </div>

  <Drawer bind:open={openRight} position="right" aria-label="Demo Right Drawer">
    <DrawerHeader title="Right Drawer" />
    <DrawerBody>
      <p>
        Drawers are excellent for off-canvas navigation or complex settings panels that
        require more vertical space than a standard dialog, without pulling the user
        completely away from the underlying context.
      </p>
    </DrawerBody>
    <DrawerFooter>
      <Button variant="secondary" onclick={() => openRight = false}>Close</Button>
    </DrawerFooter>
  </Drawer>

  <Drawer bind:open={openLeft} position="left" aria-label="Demo Left Drawer">
    <DrawerHeader title="Left Drawer" />
    <DrawerBody>
      <p>
        The left drawer slides in from the start of the writing axis. Notice how the
        curve geometry adapts: the curve only applies to the interior corners (`--r-1`),
        leaving the exterior edge perfectly flush (concrete) with the viewport boundary.
      </p>
    </DrawerBody>
    <DrawerFooter>
      <Button variant="secondary" onclick={() => openLeft = false}>Close</Button>
    </DrawerFooter>
  </Drawer>
</div>

<style>
  .demo-wrapper {
    padding: 2rem;
    border: 1px solid var(--concreto-40);
    border-radius: var(--r-soft);
    background-color: var(--papel-10);
    margin-bottom: 2rem;
  }
  .button-group {
    display: flex;
    gap: 1rem;
  }
  p {
    margin: 0;
  }
</style>
