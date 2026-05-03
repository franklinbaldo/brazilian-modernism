<script lang="ts">
  import Dialog from '../../components/Dialog/Dialog.svelte';
  import DialogHeader from '../../components/Dialog/DialogHeader.svelte';
  import DialogBody from '../../components/Dialog/DialogBody.svelte';
  import DialogFooter from '../../components/Dialog/DialogFooter.svelte';

  import Drawer from '../../components/Drawer/Drawer.svelte';
  import DrawerHeader from '../../components/Drawer/DrawerHeader.svelte';
  import DrawerBody from '../../components/Drawer/DrawerBody.svelte';
  import DrawerFooter from '../../components/Drawer/DrawerFooter.svelte';

  import Button from '../../components/Button.svelte';
  import TextInput from '../../components/TextInput.svelte';

  let dialogOpen = $state(false);
  let drawerOpen = $state(false);
</script>

<div style="padding: 2rem;">
  <h1>Focus Trap E2E Environment</h1>

  <button id="background-button-1">Background Button 1</button>
  <a href="#" id="background-link">Background Link</a>

  <div style="margin-top: 1rem; display: flex; gap: 1rem;">
    <button id="open-dialog" onclick={() => dialogOpen = true}>Open Dialog</button>
    <button id="open-drawer" onclick={() => drawerOpen = true}>Open Drawer</button>
  </div>

  <div style="margin-top: 2rem;">
      <button id="background-button-2">Background Button 2</button>
  </div>

  <Dialog bind:open={dialogOpen} aria-label="Test Dialog" aria-describedby="test-dialog-desc">
    <DialogHeader title="Test Dialog" />
    <DialogBody>
      <p id="test-dialog-desc">This is a test dialog for focus trapping.</p>
      <TextInput id="dialog-input-1" placeholder="First input" />
      <TextInput id="dialog-input-2" placeholder="Second input" />
    </DialogBody>
    <DialogFooter>
      <button id="dialog-cancel" onclick={() => dialogOpen = false}>Cancel</button>
      <button id="dialog-confirm" onclick={() => dialogOpen = false}>Confirm</button>
    </DialogFooter>
  </Dialog>

  <Drawer bind:open={drawerOpen} position="right" aria-label="Test Drawer" aria-describedby="test-drawer-desc">
    <DrawerHeader title="Test Drawer" />
    <DrawerBody>
      <p id="test-drawer-desc">This is a test drawer for focus trapping.</p>
      <TextInput id="drawer-input-1" placeholder="First drawer input" />
      <TextInput id="drawer-input-2" placeholder="Second drawer input" />
    </DrawerBody>
    <DrawerFooter>
      <button id="drawer-cancel" onclick={() => drawerOpen = false}>Cancel</button>
      <button id="drawer-confirm" onclick={() => drawerOpen = false}>Confirm</button>
    </DrawerFooter>
  </Drawer>
</div>
