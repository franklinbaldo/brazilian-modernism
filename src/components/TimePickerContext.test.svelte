<script lang="ts">
	import { setContext } from 'svelte';
	import TimePicker from './TimePicker.svelte';

	let { invalid = false, required = false } = $props();

    setContext('cobogo-form-field', () => ({
		id: 'time-input',
		invalid,
		required,
		'aria-describedby': 'time-helper'
	}));
</script>

<TimePicker />
