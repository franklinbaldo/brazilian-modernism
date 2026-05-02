<script lang="ts">
	import { setContext } from 'svelte';
	import TimePicker from './TimePicker.svelte';

	let { invalid = false, valid = false, required = false } = $props();

    setContext('cobogo-form-field', () => ({
		id: 'time-input',
		invalid,
		valid,
		required,
		'aria-describedby': 'time-helper'
	}));
</script>

<TimePicker />
