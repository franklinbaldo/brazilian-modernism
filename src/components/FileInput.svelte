<script lang="ts">
	import { getContext } from 'svelte';

	/**
	 * FileInput Component
	 *
	 * A flexible file input component following the Curva & Concreto doctrine.
	 *
	 * @prop {string} [accept] - File types the input should accept.
	 * @prop {boolean} [multiple=false] - Whether multiple files can be selected.
	 * @prop {boolean} [disabled=false] - Whether the input is disabled.
	 * @prop {boolean} [invalid=false] - Whether the input is in an invalid state.
	 * @prop {'sm'|'md'|'lg'} [size='md'] - The size variant of the input.
	 */
	let {
		accept,
		multiple = false,
		disabled = false,
		invalid = false,
		size = 'md',
		...rest
	}: {
		accept?: string;
		multiple?: boolean;
		disabled?: boolean;
		invalid?: boolean;
		size?: 'sm' | 'md' | 'lg';
		[key: string]: any;
	} = $props();

	// Consume FormField context if it exists
	const formFieldContext = getContext<() => { id: string; 'aria-describedby'?: string; invalid: boolean; required: boolean }>('cobogo-form-field');

	// Evaluate context inside a derived block so it reacts to dynamic updates
	let ctx = $derived(formFieldContext ? formFieldContext() : null);

	let finalId = $derived(rest.id || ctx?.id);
	let finalAriaDescribedby = $derived(rest['aria-describedby'] || ctx?.['aria-describedby']);
	let finalInvalid = $derived(invalid || ctx?.invalid || false);
	let finalRequired = $derived(rest.required || ctx?.required || false);

</script>

<input
	type="file"
	id={finalId}
	aria-describedby={finalAriaDescribedby}
	{accept}
	{multiple}
	{disabled}
	aria-invalid={finalInvalid}
	required={finalRequired}
	class="file-input file-input-{size}"
	class:invalid={finalInvalid}
	{...rest}
/>

<style>
	.file-input {
		width: 100%;
		border: 1px solid var(--border);
		border-radius: var(--r-1);
		background-color: var(--bg-raised);
		font-family: var(--font-sans);
		color: var(--fg);
		transition: border-color var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out), background-color var(--dur-2) var(--ease-out);
		box-sizing: border-box;
	}

	.file-input::file-selector-button {
		border: none;
		background: var(--papel-20);
		color: var(--fg);
		font-family: var(--font-sans);
		font-weight: 600;
		cursor: pointer;
		transition: background-color var(--dur-2) var(--ease-out), color var(--dur-2) var(--ease-out);
		margin-right: 1rem;
		border-right: 1px solid var(--border);
	}

	.file-input:hover::file-selector-button {
		background: var(--papel-30);
	}

	.file-input:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.file-input.invalid {
		border-color: var(--vermelho);
		background-color: var(--vermelho-soft);
	}

	.file-input.invalid:focus-visible {
		outline-color: var(--vermelho);
	}

	.file-input.invalid::file-selector-button {
		border-right-color: var(--vermelho);
	}

	.file-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.file-input:disabled::file-selector-button {
		cursor: not-allowed;
	}

	.file-input-sm {
		font-size: var(--t-small);
	}
	.file-input-sm::file-selector-button {
		padding: 0.375rem 0.625rem;
	}

	.file-input-md {
		font-size: 1rem;
	}
	.file-input-md::file-selector-button {
		padding: 0.625rem 0.875rem;
	}

	.file-input-lg {
		font-size: var(--t-p);
	}
	.file-input-lg::file-selector-button {
		padding: 0.875rem 1.125rem;
	}

	@media (prefers-reduced-motion: reduce) {
		.file-input, .file-input::file-selector-button {
			transition: none;
		}
	}
</style>
