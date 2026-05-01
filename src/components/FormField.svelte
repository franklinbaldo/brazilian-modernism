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
	<label for={htmlFor} class="label" class:invalid={!!error}>
		{label}
		{#if required}
			<span class="required" aria-hidden="true">*</span>
		{/if}
	</label>

	<div class="control">
		{@render children({ id: htmlFor, 'aria-describedby': describedBy })}
	</div>

	{#if error}
		<p class="error" id="{htmlFor}-error" aria-live="polite">
			<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feedback-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
			<span>{error}</span>
		</p>
	{:else if helper}
		<p class="helper" id="{htmlFor}-helper">
			<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feedback-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
			<span>{helper}</span>
		</p>
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

	.label.invalid {
		color: var(--vermelho);
	}

	.required {
		color: var(--vermelho);
		margin-left: 0.125rem;
	}

	.control {
		width: 100%;
	}

		.helper, .error {
		display: flex;
		align-items: flex-start;
		gap: 0.375rem;
		margin: 0;
		font-size: var(--t-micro);
	}

	.helper {
		color: var(--fg-muted);
	}

	.error {
		color: var(--vermelho);
		font-weight: 700;
	}

	.feedback-icon {
		flex-shrink: 0;
		margin-top: 0.125rem;
	}
</style>
