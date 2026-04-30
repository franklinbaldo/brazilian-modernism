<script lang="ts">
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
	 * @prop {'sm'|'md'|'lg'} [size='md'] - The size variant of the input.
	 */
	let {
		value = $bindable(),
		type = 'text',
		placeholder,
		disabled = false,
		invalid = false,
		size = 'md',
		...rest
	}: {
		value?: string;
		type?: 'text' | 'email' | 'url' | 'search' | 'tel' | 'password';
		placeholder?: string;
		disabled?: boolean;
		invalid?: boolean;
		size?: 'sm' | 'md' | 'lg';
		[key: string]: any;
	} = $props();
</script>

<input
	{type}
	bind:value
	{placeholder}
	{disabled}
	aria-invalid={invalid}
	class="text-input text-input-{size}"
	class:invalid
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
		transition: border-color var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out);
		box-sizing: border-box;
	}

	.text-input:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.text-input.invalid {
		border-color: var(--vermelho);
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
