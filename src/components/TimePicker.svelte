<script lang="ts">
	import { getContext } from 'svelte';

	/**
	 * TimePicker Component
	 *
	 * A flexible time input component following the Curva & Concreto doctrine.
	 *
	 * @prop {string} value - The bindable value of the input.
	 * @prop {string} [min] - The minimum allowed time.
	 * @prop {string} [max] - The maximum allowed time.
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
	type="time"
	bind:value
	id={finalId}
	aria-describedby={finalAriaDescribedby}
	{min}
	{max}
	{disabled}
	aria-invalid={finalInvalid}
	required={finalRequired}
	class="time-picker time-picker-{size}"
	class:invalid={finalInvalid}
	class:valid={finalValid}
	{...rest}
/>

<style>
	.time-picker {
		width: 100%;
		border: 1px solid var(--border-input);
		border-radius: var(--r-1);
		background-color: var(--bg-raised);
		font-family: var(--font-sans);
		color: var(--fg);
		transition: border-color var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out), background-color var(--dur-2) var(--ease-out);
		box-sizing: border-box;
	}

	.time-picker:focus-visible {
		outline: 2px solid var(--focus-ring);
		outline-offset: 2px;
	}

	.time-picker.invalid {
		border-color: var(--vermelho);
		background-color: var(--vermelho-soft);
	}

	.time-picker.invalid:focus-visible {
		outline-color: var(--vermelho);
	}

	.time-picker.valid {
		border-color: var(--verde);
		background-color: var(--verde-soft);
	}

	.time-picker.valid:focus-visible {
		outline-color: var(--verde);
	}

	.time-picker:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.time-picker-sm {
		padding: 0.375rem 0.625rem;
		font-size: var(--t-small);
	}

	.time-picker-md {
		padding: 0.625rem 0.875rem;
		font-size: 1rem;
	}

	.time-picker-lg {
		padding: 0.875rem 1.125rem;
		font-size: var(--t-p);
	}

	@media (prefers-reduced-motion: reduce) {
		.time-picker {
			transition: none;
		}
	}
</style>
