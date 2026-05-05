<script lang="ts">
	import { getContext } from 'svelte';
	import DatePicker from './DatePicker.svelte';
	import Grid from './Grid.svelte';
	import Column from './Column.svelte';

	/**
	 * DateRangePicker Component
	 *
	 * An organism composed of two DatePicker molecules for selecting a date range.
	 * Follows the Curva & Concreto doctrine.
	 *
	 * @prop {string} start - The bindable start date value.
	 * @prop {string} end - The bindable end date value.
	 * @prop {string} [min] - The global minimum allowed date.
	 * @prop {string} [max] - The global maximum allowed date.
	 * @prop {boolean} [disabled=false] - Whether the inputs are disabled.
	 * @prop {boolean} [invalid=false] - Whether the inputs are in an invalid state.
	 * @prop {boolean} [valid=false] - Whether the inputs are in a valid state.
	 * @prop {'sm'|'md'|'lg'} [size='md'] - The size variant of the inputs.
	 */
	let {
		start = $bindable(),
		end = $bindable(),
		min,
		max,
		disabled = false,
		invalid = false,
		valid = false,
		size = 'md',
		...rest
	}: {
		start?: string;
		end?: string;
		min?: string;
		max?: string;
		disabled?: boolean;
		invalid?: boolean;
		valid?: boolean;
		size?: 'sm' | 'md' | 'lg';
		[key: string]: any;
	} = $props();

	// Consume FormField context if it exists
	const formFieldContext = getContext<() => { id: string; 'aria-describedby'?: string; invalid: boolean; valid: boolean; required: boolean }>('cobogo-form-field');

	// Evaluate context inside a derived block so it reacts to dynamic updates
	let ctx = $derived(formFieldContext ? formFieldContext() : null);

	let finalInvalid = $derived(invalid || ctx?.invalid || false);
	let finalValid = $derived((valid || ctx?.valid || false) && !finalInvalid);
	let finalRequired = $derived(rest.required || ctx?.required || false);

	// The start date's maximum is either the explicitly set max, or the end date (if selected)
	let startMax = $derived(end ? (max && max < end ? max : end) : max);
	// The end date's minimum is either the explicitly set min, or the start date (if selected)
	let endMin = $derived(start ? (min && min > start ? min : start) : min);
</script>

<div class="date-range-picker" {...rest}>
	<Grid gap="1rem">
		<Column sm={6}>
			<DatePicker
				bind:value={start}
				min={min}
				max={startMax}
				{disabled}
				invalid={finalInvalid}
				valid={finalValid}
				{size}
				required={finalRequired}
				aria-label="Start date"
				id={ctx?.id ? `${ctx.id}-start` : undefined}
				aria-describedby={ctx?.['aria-describedby']}
			/>
		</Column>
		<Column sm={6}>
			<DatePicker
				bind:value={end}
				min={endMin}
				max={max}
				{disabled}
				invalid={finalInvalid}
				valid={finalValid}
				{size}
				required={finalRequired}
				aria-label="End date"
				id={ctx?.id ? `${ctx.id}-end` : undefined}
				aria-describedby={ctx?.['aria-describedby']}
			/>
		</Column>
	</Grid>
</div>

<style>
	.date-range-picker {
		width: 100%;
		/* Ensures structural container respects width, inner molecules handle their own borders/styles */
	}
</style>
