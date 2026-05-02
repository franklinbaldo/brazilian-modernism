<script lang="ts">
	import { getContext } from 'svelte';

	/**
	 * DatePicker Component
	 *
	 * A flexible date input component following the Curva & Concreto doctrine.
	 *
	 * @prop {string} value - The bindable value of the input.
	 * @prop {string} [min] - The minimum allowed date.
	 * @prop {string} [max] - The maximum allowed date.
	 * @prop {boolean} [disabled=false] - Whether the input is disabled.
	 * @prop {boolean} [invalid=false] - Whether the input is in an invalid state.
	 * @prop {boolean} [valid=false] - Whether the input is in a valid state.
	 * @prop {'sm'|'md'|'lg'} [size='md'] - The size variant of the input.
	 */
	let {
		value = $bindable(),
		min,
		max,
		disabled = false,
		invalid = false,
		valid = false,
		size = 'md',
		...rest
	}: {
		value?: string;
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

	let finalId = $derived(rest.id || ctx?.id);
	let finalAriaDescribedby = $derived(rest['aria-describedby'] || ctx?.['aria-describedby']);
	let finalInvalid = $derived(invalid || ctx?.invalid || false);
	let finalValid = $derived((valid || ctx?.valid || false) && !finalInvalid);
	let finalRequired = $derived(rest.required || ctx?.required || false);
</script>

<input
	type="date"
	bind:value
	id={finalId}
	aria-describedby={finalAriaDescribedby}
	{min}
	{max}
	{disabled}
	aria-invalid={finalInvalid}
	required={finalRequired}
	class="date-picker date-picker-{size}"
	class:invalid={finalInvalid}
	class:valid={finalValid}
	{...rest}
/>

<style>
	.date-picker {
		width: 100%;
		border: 1px solid var(--border-input);
		border-radius: var(--r-1);
		background-color: var(--bg-raised);
		font-family: var(--font-sans);
		color: var(--fg);
		transition: border-color var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out), background-color var(--dur-2) var(--ease-out);
		box-sizing: border-box;
	}

	.date-picker:focus-visible {
		outline: 2px solid var(--focus-ring);
		outline-offset: 2px;
	}

	.date-picker.invalid {
		border-color: var(--vermelho);
		background-color: var(--vermelho-soft);
	}

	.date-picker.invalid:focus-visible {
		outline-color: var(--vermelho);
	}

	.date-picker.valid {
		border-color: var(--verde);
		background-color: var(--verde-soft);
	}

	.date-picker.valid:focus-visible {
		outline-color: var(--verde);
	}

	.date-picker:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.date-picker-sm {
		padding: 0.375rem 0.625rem;
		font-size: var(--t-small);
	}

	.date-picker-md {
		padding: 0.625rem 0.875rem;
		font-size: 1rem;
	}

	.date-picker-lg {
		padding: 0.875rem 1.125rem;
		font-size: var(--t-p);
	}

	@media (prefers-reduced-motion: reduce) {
		.date-picker {
			transition: none;
		}
	}
</style>
