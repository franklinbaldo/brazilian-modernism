<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	/**
	 * FormField Component
	 *
	 * A generic wrapper for form inputs providing consistent label, helper text, and error message styling.
	 *
	 * @prop {string} label - The label text for the field.
	 * @prop {string} htmlFor - The ID of the child input element to associate the label with.
	 * @prop {boolean} [required=false] - Whether the field is required (adds an asterisk).
	 * @prop {string} [helper] - Optional helper text displayed below the field.
	 * @prop {string} [error] - Optional error text displayed below the field. Overrides helper text if present.
	 * @prop {Snippet<[{ id: string; 'aria-describedby'?: string }]>} children - The form control component snippet.
	 */
	let {
		label,
		htmlFor,
		required = false,
		helper,
		error,
		children
	}: {
		label: string;
		htmlFor: string;
		required?: boolean;
		helper?: string;
		error?: string;
		children: Snippet<[{ id: string; 'aria-describedby'?: string }]>;
	} = $props();

	let describedBy = $derived.by(() => {
		if (error) return `${htmlFor}-error`;
		if (helper) return `${htmlFor}-helper`;
		return undefined;
	});

	// Provide context for child inputs to consume state automatically
	setContext('cobogo-form-field', () => ({
		id: htmlFor,
		'aria-describedby': describedBy,
		invalid: !!error,
		required
	}));
</script>

<div class="form-field">
	<label for={htmlFor} class="label">
		{label}
		{#if required}
			<span class="required" aria-hidden="true">*</span>
		{/if}
	</label>

	<div class="control">
		{@render children({ id: htmlFor, 'aria-describedby': describedBy })}
	</div>

	{#if error}
		<p class="error" id="{htmlFor}-error" aria-live="polite">{error}</p>
	{:else if helper}
		<p class="helper" id="{htmlFor}-helper">{helper}</p>
	{/if}
</div>

<style>
	.form-field {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		width: 100%;
		font-family: var(--font-sans);
	}

	.label {
		font-size: var(--t-small);
		font-weight: 700;
		color: var(--fg-heading);
	}

	.required {
		color: var(--vermelho);
		margin-left: 0.125rem;
	}

	.control {
		width: 100%;
	}

	.helper {
		margin: 0;
		font-size: var(--t-micro);
		color: var(--fg-muted);
	}

	.error {
		margin: 0;
		font-size: var(--t-micro);
		color: var(--vermelho);
		font-weight: 700;
	}
</style>
