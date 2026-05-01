<script lang="ts">
	import Dialog from './Dialog.svelte';
	import DialogHeader from './DialogHeader.svelte';
	import DialogBody from './DialogBody.svelte';
	import DialogFooter from './DialogFooter.svelte';

	let open = $state(false);

	export function getOpen() {
		return open;
	}

	export function setOpen(val: boolean) {
		open = val;
	}
</script>

<button onclick={() => (open = true)}>Open Dialog</button>

<Dialog bind:open aria-label="Test Dialog" aria-describedby="dialog-desc">
	<DialogHeader title="My Dialog Title" />
	<DialogBody>
		<p id="dialog-desc">This is the dialog body.</p>
	</DialogBody>
	<DialogFooter>
		<button onclick={() => (open = false)}>Close Custom</button>
	</DialogFooter>
</Dialog>
