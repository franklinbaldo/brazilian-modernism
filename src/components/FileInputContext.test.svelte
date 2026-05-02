<script lang="ts">
	import { setContext } from 'svelte';
	import FileInput from './FileInput.svelte';

	let { id = 'ctx-id', describedBy = 'ctx-desc', invalid = true, valid = false, required = true } = $props();

	setContext('cobogo-form-field', () => ({
		id,
		'aria-describedby': describedBy,
		invalid,
		valid,
		required
	}));
</script>

<FileInput />
