<script lang="ts">
	import { getContext } from 'svelte';

	/**
	 * Select Component
	 *
	 * A native select dropdown matching the TextInput aesthetics.
	 *
	 * @prop {string} value - The bindable value of the select.
	 * @prop {Array<{value: string, label: string}>} options - The available options.
	 * @prop {string} [placeholder] - The default placeholder option text.
	 * @prop {boolean} [disabled=false] - Whether the select is disabled.
	 * @prop {boolean} [invalid=false] - Whether the select is invalid.
	 * @prop {boolean} [valid=false] - Whether the select is valid.
	 * @prop {'sm'|'md'|'lg'} [size='md'] - The size variant of the select.
	 */
	let {
		value = $bindable(),
		options,
		placeholder,
		disabled = false,
		invalid = false,
		valid = false,
		size = 'md',
		...rest
	}: {
		value?: string;
		options: Array<{ value: string; label: string }>;
		placeholder?: string;
		disabled?: boolean;
		invalid?: boolean;
		valid?: boolean;
		size?: 'sm' | 'md' | 'lg';
		[key: string]: any;
	} = $props();

	// Consume FormField context if it exists
	const formFieldContext = getContext<() => { id: string; 'aria-describedby'?: string; invalid: boolean; valid: boolean; required: boolean }>('cobogo-form-field');
	let ctx = $derived(formFieldContext ? formFieldContext() : null);

	let finalId = $derived(rest.id || ctx?.id);
	let finalAriaDescribedby = $derived(rest['aria-describedby'] || ctx?.['aria-describedby']);
	let finalInvalid = $derived(invalid || ctx?.invalid || false);
	let finalValid = $derived((valid || ctx?.valid || false) && !finalInvalid);
	let finalRequired = $derived(rest.required || ctx?.required || false);
</script>

<select
	bind:value
	id={finalId}
	aria-describedby={finalAriaDescribedby}
	aria-invalid={finalInvalid}
	required={finalRequired}
	{disabled}
	class="select-input select-input-{size}"
	class:has-placeholder={!value && placeholder}
	class:invalid={finalInvalid}
	class:valid={finalValid}
	{...rest}
>
	{#if placeholder}
		<option value="" disabled selected hidden>{placeholder}</option>
	{/if}
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>

<style>
	.select-input {
		width: 100%;
		border: 1px solid var(--border);
		border-radius: var(--r-1);
		background-color: var(--bg-raised);
		font-family: var(--font-sans);
		color: var(--fg);
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>');
		background-repeat: no-repeat;
		background-position: right 0.875rem center;
		background-size: 1rem;
		transition: border-color var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out), background-color var(--dur-2) var(--ease-out), color var(--dur-2) var(--ease-out);
		box-sizing: border-box;
	}

	.select-input:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.select-input.invalid {
		border-color: var(--vermelho);
		background-color: var(--vermelho-soft);
		color: var(--vermelho);
		background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23C8472E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>');
	}

	.select-input.invalid:focus-visible {
		outline-color: var(--vermelho);
	}

	.select-input.valid {
		border-color: var(--verde);
		background-color: var(--verde-soft);
		color: var(--verde);
		background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%232E6B4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>');
	}

	.select-input.valid:focus-visible {
		outline-color: var(--verde);
	}

	.select-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.select-input-sm {
		padding: 0.375rem 2rem 0.375rem 0.625rem;
		font-size: var(--t-small);
		background-position: right 0.5rem center;
	}

	.select-input-md {
		padding: 0.625rem 2.5rem 0.625rem 0.875rem;
		font-size: 1rem;
	}

	.select-input-lg {
		padding: 0.875rem 3rem 0.875rem 1.125rem;
		font-size: var(--t-p);
	}

	.select-input.has-placeholder {
		color: var(--fg-muted);
	}

	/* Ensure options always display with normal color even if the select shows placeholder text */
	.select-input option {
		color: var(--fg);
	}

	@media (prefers-reduced-motion: reduce) {
		.select-input {
			transition: none;
		}
	}
</style>
