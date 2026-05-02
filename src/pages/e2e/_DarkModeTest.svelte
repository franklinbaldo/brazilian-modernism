<script lang="ts">
  import Dialog from '../../components/Dialog/Dialog.svelte';
  import Drawer from '../../components/Drawer/Drawer.svelte';
  import Notification from '../../components/Notification.svelte';
  import Button from '../../components/Button.svelte';

  let dialogOpen = $state(true);
  let drawerOpen = $state(true);

  // Expose these explicitly to the window so playwright can control them if needed, though they start open
</script>

<div style="padding: 2rem;">
  <h1>Dark Mode Organisms Test</h1>

  <div style="margin-bottom: 2rem;" id="notification-container">
    <Notification
      intent="info"
      title="System Update"
      message="Dark mode is being tested."
      dismissible={false}
    />
  </div>

  <Button onclick={() => dialogOpen = true}>Open Dialog</Button>
  <Button onclick={() => drawerOpen = true}>Open Drawer</Button>

  <Dialog bind:open={dialogOpen} aria-label="Test Dialog">
    <div style="padding: 2rem;">
      <h2 id="dialog-heading">Dialog Content</h2>
      <p id="dialog-text">This is text inside the dialog to test contrast.</p>
      <Button onclick={() => dialogOpen = false}>Close</Button>
    </div>
  </Dialog>

  <!-- Using left to not obscure the dialog as much if they overlap, though playwright will inspect DOM elements -->
  <Drawer bind:open={drawerOpen} aria-label="Test Drawer" position="left">
    <div style="padding: 2rem;">
      <h2 id="drawer-heading">Drawer Content</h2>
      <p id="drawer-text">This is text inside the drawer to test contrast.</p>
      <Button onclick={() => drawerOpen = false}>Close</Button>
    </div>
  </Drawer>
</div>
