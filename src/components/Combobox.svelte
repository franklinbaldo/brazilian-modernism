<script lang="ts">
	import { getContext, onMount, onDestroy, tick } from 'svelte';
	import TextInput from './TextInput.svelte';

	type Option = { value: string; label: string };

	/**
	 * Combobox Component
	 *
	 * A highly interactive organism that marries a TextInput with an OptionGroup-like dropdown.
	 * Ideal for selecting from long lists with filtering capabilities.
	 *
	 * @prop {string} [value] - The currently selected value (bindable).
	 * @prop {Option[]} options - Array of available options.
	 * @prop {string} [placeholder] - Placeholder text for the input.
	 * @prop {boolean} [disabled=false] - Disables the entire combobox.
	 * @prop {boolean} [invalid=false] - Visual error state (also inherits from FormField).
	 * @prop {'sm'|'md'|'lg'} [size='md'] - Component size.
	 */
	type Props = {
		value?: string;
		options: Option[];
		placeholder?: string;
		disabled?: boolean;
		invalid?: boolean;
		size?: 'sm' | 'md' | 'lg';
		id?: string;
		name?: string;
		required?: boolean;
		'aria-describedby'?: string;
		[key: string]: any;
	};

	let {
		value = $bindable(''),
		options = [],
		placeholder = '',
		disabled = false,
		invalid = false,
		size = 'md',
		id,
		name,
		required = false,
		'aria-describedby': ariaDescribedby,
		...rest
	}: Props = $props();

	// FormField context integration
	const formFieldContext = getContext<() => { id: string; 'aria-describedby'?: string; invalid: boolean; required: boolean }>('cobogo-form-field');
	let ctx = $derived(formFieldContext ? formFieldContext() : null);

	let finalId = $derived(id || ctx?.id || `combobox-${Math.random().toString(36).slice(2, 9)}`);
	let finalAriaDescribedby = $derived(ariaDescribedby || ctx?.['aria-describedby']);
	let finalInvalid = $derived(invalid || ctx?.invalid || false);
	let finalRequired = $derived(required || ctx?.required || false);

	// Internal state
	let open = $state(false);
	let searchQuery = $state('');
	let focusedIndex = $state(-1);
	let comboboxRef: HTMLElement;
	let inputRef = $state<HTMLInputElement | null>(null);
	let listboxRef = $state<HTMLUListElement | null>(null);

	// Derived state
	let selectedOption = $derived(options.find((opt) => opt.value === value));

	// Remove effect, sync manually on interaction

	let filteredOptions = $derived(
		options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	function openCombobox() {
		if (disabled) return;
		open = true;
		if (selectedOption) {
			searchQuery = selectedOption.label;
			focusedIndex = filteredOptions.findIndex(o => o.value === value);
		} else {
			searchQuery = '';
			focusedIndex = -1;
		}
	}

	function closeCombobox() {
		open = false;
		focusedIndex = -1;
		if (selectedOption) {
			searchQuery = selectedOption.label;
		} else {
			searchQuery = '';
		}
	}

	function selectOption(opt: Option) {
		value = opt.value;
		searchQuery = opt.label;
		open = false;
		focusedIndex = -1;
		// Return focus to input for accessibility
		inputRef?.focus();
	}

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		searchQuery = target.value;
		if (!open) open = true;
		focusedIndex = 0; // Reset focus to first item on search

		// If user clears the input, clear the value
		if (searchQuery === '') {
			value = '';
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (disabled) return;

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				if (!open) {
					openCombobox();
				} else {
					focusedIndex = (focusedIndex + 1) % filteredOptions.length;
					scrollToFocused();
				}
				break;
			case 'ArrowUp':
				e.preventDefault();
				if (!open) {
					openCombobox();
				} else {
					focusedIndex = (focusedIndex - 1 + filteredOptions.length) % filteredOptions.length;
					scrollToFocused();
				}
				break;
			case 'Enter':
				if (open && focusedIndex >= 0 && filteredOptions.length > 0) {
					e.preventDefault();
					selectOption(filteredOptions[focusedIndex]);
				}
				break;
			case 'Escape':
				if (open) {
					e.preventDefault();
					closeCombobox();
				}
				break;
		}
	}

	function scrollToFocused() {
		if (!listboxRef || focusedIndex < 0) return;
		const optionEl = listboxRef.children[focusedIndex] as HTMLElement;
		if (optionEl) {
			// optionEl.scrollIntoView({ block: 'nearest' });
		}
	}

	function handleClickOutside(e: MouseEvent) {
		if (open && comboboxRef && !comboboxRef.contains(e.target as Node)) {
			closeCombobox();
		}
	}

	onMount(() => {
		if (typeof document !== 'undefined') document.addEventListener('mousedown', handleClickOutside);
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') document.removeEventListener('mousedown', handleClickOutside);
	});

	// To bind to TextInput's internal input element, we need a small wrapper hack since TextInput doesn't expose it directly yet
	function setupInputRef(node: HTMLElement) {
		const input = node.querySelector('input');
		if (input) inputRef = input as HTMLInputElement;
	}
</script>

<div class="combobox-container" bind:this={comboboxRef} use:setupInputRef>
	<!-- Hidden input for form submission if name is provided -->
	{#if name}
		<input type="hidden" {name} {value} required={finalRequired} />
	{/if}

	<!-- Ensure we pass string value to TextInput value prop -->
	<div
		role="combobox"
		aria-expanded={open}
		aria-haspopup="listbox"
		aria-controls="{finalId}-listbox"
		aria-owns="{finalId}-listbox"
	>
		<TextInput
			id={finalId}
			value={searchQuery}
			oninput={handleInput}
			onkeydown={handleKeyDown}
			onfocus={openCombobox}
			{placeholder}
			{disabled}
			invalid={finalInvalid}
			aria-describedby={finalAriaDescribedby}
			aria-autocomplete="list"
			aria-activedescendant={open && focusedIndex >= 0 ? `${finalId}-option-${focusedIndex}` : undefined}
			{size}
			{...rest}
		/>

		<!-- Chevron icon -->
		<div class="chevron" class:open>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M6 9l6 6 6-6"/>
			</svg>
		</div>
	</div>

	{#if open}
		<ul
			id="{finalId}-listbox"
			class="listbox"
			role="listbox"
			bind:this={listboxRef}
		>
			{#if filteredOptions.length === 0}
				<li class="no-results" role="option" aria-selected="false">
					No options found
				</li>
			{:else}
				{#each filteredOptions as opt, i}
					<li
						id="{finalId}-option-{i}"
						class="option"
						class:focused={focusedIndex === i}
						class:selected={value === opt.value}
						role="option"
						aria-selected={value === opt.value}
						onmousedown={(e) => {
							// Prevent input blur before click registers
							e.preventDefault();
							selectOption(opt);
						}}
					>
						{opt.label}
						{#if value === opt.value}
							<span class="check">
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
							</span>
						{/if}
					</li>
				{/each}
			{/if}
		</ul>
	{/if}
</div>

<style>
	.combobox-container {
		position: relative;
		width: 100%;
		font-family: var(--font-sans);
	}

	.chevron {
		position: absolute;
		right: 0.875rem;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		color: var(--fg-muted);
		transition: transform var(--dur-2) var(--ease-out);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.chevron.open {
		transform: translateY(-50%) rotate(180deg);
	}

	.listbox {
		position: absolute;
		top: calc(100% + 0.25rem);
		left: 0;
		right: 0;
		max-height: 250px;
		overflow-y: auto;
		background: var(--bg-raised);
		border: 1px solid var(--border);
		border-radius: var(--r-1);
		box-shadow: var(--shadow-2);
		z-index: 50;
		margin: 0;
		padding: 0.25rem;
		list-style: none;
	}

	.option, .no-results {
		padding: 0.5rem 0.75rem;
		border-radius: var(--r-1);
		cursor: pointer;
		color: var(--fg);
		font-size: var(--t-body);
		display: flex;
		align-items: center;
		justify-content: space-between;
		transition: background-color var(--dur-1) var(--ease-out);
	}

	.no-results {
		color: var(--fg-muted);
		cursor: default;
		justify-content: center;
		font-style: italic;
	}

	.option:hover, .option.focused {
		background-color: var(--papel-20);
	}

	.option.selected {
		background-color: var(--azul-soft);
		color: var(--azul-deep);
		font-weight: 600;
	}

	.check {
		display: flex;
		color: var(--azul);
	}

	@media (prefers-reduced-motion: reduce) {
		.chevron {
			transition: none;
		}
	}
</style>
