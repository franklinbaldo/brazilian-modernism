<script lang="ts">
	import { getContext } from 'svelte';

	/**
	 * TextInput Component
	 *
	 * A flexible text input supporting multiple types, validation states, and sizes.
	 *
	 * @prop {string} value - The bindable value of the input.
	 * @prop {'text'|'email'|'url'|'search'|'tel'|'password'} [type='text'] - The input type.
	 * @prop {string} [placeholder] - Placeholder text for the input.
	 * @prop {boolean} [disabled=false] - Whether the input is disabled.
	 * @prop {boolean} [invalid=false] - Whether the input is in an invalid state.
	 * @prop {boolean} [valid=false] - Whether the input is in a valid state.
	 * @prop {'sm'|'md'|'lg'} [size='md'] - The size variant of the input.
	 */
	let {
		value = $bindable(),
		type = 'text',
		placeholder,
		disabled = false,
		invalid = false,
		valid = false,
		size = 'md',
		...rest
	}: {
		value?: string;
		type?: 'text' | 'email' | 'url' | 'search' | 'tel' | 'password';
		placeholder?: string;
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
	{type}
	bind:value
	id={finalId}
	aria-describedby={finalAriaDescribedby}
	{placeholder}
	{disabled}
	aria-invalid={finalInvalid}
	required={finalRequired}
	class="text-input text-input-{size}"
	class:invalid={finalInvalid}
	class:valid={finalValid}
	{...rest}
/>

<style>
	.text-input {
		width: 100%;
		border: 1px solid var(--border);
		border-radius: var(--r-1);
		background-color: var(--bg-raised);
		font-family: var(--font-sans);
		color: var(--fg);
		transition: border-color var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out), background-color var(--dur-2) var(--ease-out), color var(--dur-2) var(--ease-out);
		box-sizing: border-box;
	}

	.text-input:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.text-input.invalid {
		border-color: var(--vermelho);
		background-color: var(--vermelho-soft);
		color: var(--vermelho);
	}

	.text-input.invalid:focus-visible {
		outline-color: var(--vermelho);
	}

	.text-input.valid {
		border-color: var(--verde);
		background-color: var(--verde-soft);
		color: var(--verde);
	}

	.text-input.valid:focus-visible {
		outline-color: var(--verde);
	}

	.text-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.text-input-sm {
		padding: 0.375rem 0.625rem;
		font-size: var(--t-small);
	}

	.text-input-md {
		padding: 0.625rem 0.875rem;
		font-size: 1rem;
	}

	.text-input-lg {
		padding: 0.875rem 1.125rem;
		font-size: var(--t-p);
	}

	@media (prefers-reduced-motion: reduce) {
		.text-input {
			transition: none;
		}
	}
</style>
