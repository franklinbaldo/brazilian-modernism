<script lang="ts">
	import { setContext } from 'svelte';
	import DatePicker from './DatePicker.svelte';

	let { invalid = false, required = false } = $props();

    setContext('cobogo-form-field', () => ({
		id: 'date-input',
		invalid,
		required,
		'aria-describedby': 'date-helper'
	}));
</script>

<DatePicker />
