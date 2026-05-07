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
	 * @prop {boolean} [valid=false] - Visual success state (also inherits from FormField).
	 * @prop {'sm'|'md'|'lg'} [size='md'] - Component size.
	 */
	type Props = {
		value?: string;
		options: Option[];
		placeholder?: string;
		disabled?: boolean;
		invalid?: boolean;
		valid?: boolean;
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
		valid = false,
		size = 'md',
		id,
		name,
		required = false,
		'aria-describedby': ariaDescribedby,
		...rest
	}: Props = $props();

	// FormField context integration
	const formFieldContext = getContext<() => { id: string; 'aria-describedby'?: string; invalid: boolean; valid: boolean; required: boolean }>('cobogo-form-field');
	let ctx = $derived(formFieldContext ? formFieldContext() : null);

	let finalId = $derived(id || ctx?.id || `combobox-${Math.random().toString(36).slice(2, 9)}`);
	let finalAriaDescribedby = $derived(ariaDescribedby || ctx?.['aria-describedby']);
	let finalInvalid = $derived(invalid || ctx?.invalid || false);
	let finalValid = $derived((valid || ctx?.valid || false) && !finalInvalid);
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

<div data-combobox bind:this={comboboxRef} use:setupInputRef>
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
			valid={finalValid}
			aria-describedby={finalAriaDescribedby}
			aria-autocomplete="list"
			aria-activedescendant={open && focusedIndex >= 0 ? `${finalId}-option-${focusedIndex}` : undefined}
			{size}
			{...rest}
		/>

		<!-- Chevron icon -->
		<div data-combobox-chevron data-open={open ? '' : undefined}>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M6 9l6 6 6-6"/>
			</svg>
		</div>
	</div>

	{#if open}
		<ul
			id="{finalId}-listbox"
			data-listbox
			role="listbox"
			bind:this={listboxRef}
		>
			{#if filteredOptions.length === 0}
				<li data-empty role="option" aria-selected="false">
					No options found
				</li>
			{:else}
				{#each filteredOptions as opt, i}
					<li
						id="{finalId}-option-{i}"
						data-focused={focusedIndex === i ? '' : undefined}
						data-selected={value === opt.value ? '' : undefined}
						role="option"
						aria-selected={value === opt.value}
						onmousedown={(e) => {
							e.preventDefault();
							selectOption(opt);
						}}
					>
						{opt.label}
						{#if value === opt.value}
							<span aria-hidden="true">
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
							</span>
						{/if}
					</li>
				{/each}
			{/if}
		</ul>
	{/if}
</div>

