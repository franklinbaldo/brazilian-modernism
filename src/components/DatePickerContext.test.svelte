<script lang="ts">
	import { setContext } from 'svelte';
	import DatePicker from './DatePicker.svelte';

	let { invalid = false, valid = false, required = false } = $props();

    setContext('cobogo-form-field', () => ({
		id: 'date-input',
		invalid,
		valid,
		required,
		'aria-describedby': 'date-helper'
	}));
</script>

<DatePicker />
