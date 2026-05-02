<script lang="ts">
	import { setContext } from 'svelte';
	import Combobox from './Combobox.svelte';

	let formFieldContext = () => ({
		id: 'ctx-id',
		'aria-describedby': 'ctx-desc',
		invalid: true,
		valid: false,
		required: true
	});

	setContext('cobogo-form-field', formFieldContext);

	const options = [
		{ value: '1', label: 'Option 1' }
	];
</script>

<Combobox {options} />
