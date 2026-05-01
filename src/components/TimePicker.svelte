<script lang="ts">
	import { getContext, onMount } from 'svelte';

	/**
	 * TimePicker Component
	 *
	 * A form component for selecting a time, adhering to the Curva & Concreto doctrine.
	 *
	 * @prop {string} value - The bindable time value (HH:MM).
	 * @prop {string} [placeholder] - Placeholder text.
	 * @prop {boolean} [disabled=false] - Whether the input is disabled.
	 * @prop {boolean} [invalid=false] - Whether the input is in an invalid state.
	 */
	let {
		value = $bindable(''),
		placeholder = 'Selecione um horário',
		disabled = false,
		invalid = false,
		id,
		...rest
	}: {
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		invalid?: boolean;
		id?: string;
		[key: string]: any;
	} = $props();

	// Context from FormField
	const formFieldContext = getContext<() => { id: string; 'aria-describedby'?: string; invalid: boolean; required: boolean }>('cobogo-form-field');
	let ctx = $derived(formFieldContext ? formFieldContext() : null);

	let finalId = $derived(id || ctx?.id || `timepicker-${Math.random().toString(36).slice(2, 9)}`);
	let finalAriaDescribedby = $derived(rest['aria-describedby'] || ctx?.['aria-describedby']);
	let finalInvalid = $derived(invalid || ctx?.invalid || false);
	let finalRequired = $derived(rest.required || ctx?.required || false);

	let isOpen = $state(false);
	let containerRef: HTMLDivElement;
	let popoverRef: HTMLDivElement;

	let currentHour = $state('12');
	let currentMinute = $state('00');

	let timePopoverExpanded = $derived(isOpen ? 'true' : 'false');

	$effect(() => {
		if (value) {
			const [h, m] = value.split(':');
			if (h && m) {
				currentHour = h;
				currentMinute = m;
			}
		}
	});

	let hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
	let minutes = ['00', '15', '30', '45'];

	function togglePopover() {
		if (!disabled) {
			isOpen = !isOpen;
		}
	}

	function applyTime(close = false) {
		value = `${currentHour}:${currentMinute}`;
		if (close) isOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) {
			isOpen = false;
			const input = containerRef?.querySelector('input');
			if (input) input.focus();
		}
	}

	onMount(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (isOpen && containerRef && !containerRef.contains(e.target as Node)) {
				isOpen = false;
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});
</script>

<div class="timepicker-container" bind:this={containerRef} onkeydown={handleKeydown} role="group" aria-label="Time picker">
	<div class="input-wrapper">
		<input
			type="text"
			id={finalId}
			value={value}
			readonly
			{placeholder}
			{disabled}
			aria-invalid={finalInvalid}
			aria-expanded={timePopoverExpanded}
			aria-haspopup="dialog"
			aria-controls="{finalId}-popover"
			required={finalRequired}
			aria-describedby={finalAriaDescribedby}
			class="timepicker-input"
			class:invalid={finalInvalid}
			onclick={togglePopover}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					togglePopover();
				}
			}}
			{...rest}
		/>
		<svg class="clock-icon" viewBox="0 0 100 100" aria-hidden="true" onclick={togglePopover}>
			<circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="6"/>
			<line x1="50" y1="50" x2="50" y2="25" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
			<line x1="50" y1="50" x2="65" y2="65" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
		</svg>
	</div>

	{#if isOpen}
		<div
			id="{finalId}-popover"
			class="timepicker-popover"
			bind:this={popoverRef}
			role="dialog"
			aria-label="Horário"
		>
			<div class="picker-columns">
				<div class="column" role="group" aria-label="Horas">
					<div class="column-title" aria-hidden="true">Hora</div>
					<div class="scroll-list">
						{#each hours as h}
							<button
								type="button"
								class="time-btn"
								class:selected={currentHour === h}
								onclick={() => { currentHour = h; applyTime(false); }}
							>
								{h}
							</button>
						{/each}
					</div>
				</div>
				<div class="column" role="group" aria-label="Minutos">
					<div class="column-title" aria-hidden="true">Minuto</div>
					<div class="scroll-list">
						{#each minutes as m}
							<button
								type="button"
								class="time-btn"
								class:selected={currentMinute === m}
								onclick={() => { currentMinute = m; applyTime(false); }}
							>
								{m}
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.timepicker-container {
		position: relative;
		width: 100%;
		font-family: var(--font-sans);
	}

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.timepicker-input {
		width: 100%;
		padding: 0.625rem 0.875rem;
		padding-right: 2.5rem;
		border: 1px solid var(--border, var(--concreto-40));
		border-radius: var(--r-1);
		background-color: var(--bg-raised, var(--papel-00));
		font-family: var(--font-sans);
		color: var(--fg, var(--concreto-80));
		cursor: pointer;
		transition: border-color var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out);
		box-sizing: border-box;
		font-size: 1rem;
	}

	.timepicker-input:focus-visible {
		outline: 2px solid var(--accent, var(--azul));
		outline-offset: 2px;
	}

	.timepicker-input.invalid {
		border-color: var(--vermelho);
		background-color: var(--vermelho-soft);
	}

	.timepicker-input.invalid:focus-visible {
		outline-color: var(--vermelho);
	}

	.timepicker-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.clock-icon {
		position: absolute;
		right: 0.75rem;
		width: 1.25rem;
		height: 1.25rem;
		color: var(--concreto-60);
		pointer-events: none;
	}

	/* Concreto doctrine: sharp geometry, rigid structure, pool shadow */
	.timepicker-popover {
		position: absolute;
		top: calc(100% + 0.25rem);
		left: 0;
		z-index: 50;
		background-color: var(--papel-00);
		border: 1px solid var(--concreto-80);
		border-radius: 0px; /* Sharp geometry */
		padding: 1rem;
		box-shadow: var(--shadow-2);
		width: 220px;
	}

	.picker-columns {
		display: flex;
		gap: 1rem;
	}

	.column {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.column-title {
		font-size: var(--t-small);
		color: var(--concreto-60);
		font-weight: bold;
		margin-bottom: 0.5rem;
		text-align: center;
	}

	.scroll-list {
		display: flex;
		flex-direction: column;
		height: 150px;
		overflow-y: auto;
		gap: 0.125rem;
		scrollbar-width: thin;
	}

	.scroll-list::-webkit-scrollbar {
		width: 4px;
	}

	.scroll-list::-webkit-scrollbar-thumb {
		background-color: var(--concreto-40);
	}

	.time-btn {
		background: none;
		border: 1px solid transparent;
		border-radius: var(--r-1);
		padding: 0.375rem 0;
		cursor: pointer;
		font-family: var(--font-sans);
		font-size: var(--t-body);
		color: var(--concreto-80);
	}

	.time-btn:hover:not(.selected) {
		background-color: var(--papel-10);
		border-color: var(--concreto-40);
	}

	.time-btn:focus-visible {
		outline: 2px solid var(--azul);
		outline-offset: 2px;
	}

	.time-btn.selected {
		background-color: var(--azul);
		color: var(--papel-00);
		font-weight: bold;
	}
</style>
