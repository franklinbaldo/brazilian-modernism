<script lang="ts">
	import Drawer from './Drawer.svelte';
	import DrawerHeader from './DrawerHeader.svelte';
	import DrawerBody from './DrawerBody.svelte';
	import DrawerFooter from './DrawerFooter.svelte';

	let { open = $bindable(false), position = 'right' } = $props();
</script>

<Drawer bind:open {position} aria-label="Test Drawer" aria-describedby="drawer-desc">
	<DrawerHeader title="Drawer Title" />
	<DrawerBody>
		<p id="drawer-desc">This is the drawer body.</p>
	</DrawerBody>
	<DrawerFooter>
		<button onclick={() => (open = false)}>Close Custom</button>
	</DrawerFooter>
</Drawer>
