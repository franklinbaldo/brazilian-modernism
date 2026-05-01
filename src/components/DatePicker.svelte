<script lang="ts">
	import { getContext, onMount } from 'svelte';

	/**
	 * DatePicker Component
	 *
	 * A form component for selecting a date, adhering to the Curva & Concreto doctrine.
	 *
	 * @prop {string} value - The bindable date value (YYYY-MM-DD).
	 * @prop {string} [placeholder] - Placeholder text.
	 * @prop {boolean} [disabled=false] - Whether the input is disabled.
	 * @prop {boolean} [invalid=false] - Whether the input is in an invalid state.
	 */
	let {
		value = $bindable(''),
		placeholder = 'Selecione uma data',
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

	let finalId = $derived(id || ctx?.id || `datepicker-${Math.random().toString(36).slice(2, 9)}`);
	let finalAriaDescribedby = $derived(rest['aria-describedby'] || ctx?.['aria-describedby']);
	let finalInvalid = $derived(invalid || ctx?.invalid || false);
	let finalRequired = $derived(rest.required || ctx?.required || false);

	let isOpen = $state(false);
	let containerRef: HTMLDivElement;
	let popoverRef: HTMLDivElement;

	let currentDate = $state(
		value
			? (() => { const [y, m, d] = value.split('-'); return new Date(Number(y), Number(m) - 1, Number(d)); })()
			: new Date()
	);

	$effect(() => {
		if (value && !isOpen) {
			const [y, m, d] = value.split('-');
			if (y && m && d) {
				const parsed = new Date(Number(y), Number(m) - 1, Number(d));
				if (!isNaN(parsed.getTime())) {
					currentDate = parsed;
				}
			}
		}
	});

	let currentMonth = $derived(currentDate.getMonth());
	let currentYear = $derived(currentDate.getFullYear());

	const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
	const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

	let calendarDays = $derived.by(() => {
		const days = [];
		const totalDays = daysInMonth(currentYear, currentMonth);
		const firstDay = firstDayOfMonth(currentYear, currentMonth);

		for (let i = 0; i < firstDay; i++) {
			days.push(null);
		}
		for (let i = 1; i <= totalDays; i++) {
			days.push(i);
		}
		return days;
	});

	let calendarPopoverExpanded = $derived(isOpen ? 'true' : 'false');

	const monthNames = [
		'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
		'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
	];

	function togglePopover() {
		if (!disabled) {
			isOpen = !isOpen;
		}
	}

	function selectDate(day: number) {
		const newDate = new Date(currentYear, currentMonth, day);
		// Format YYYY-MM-DD
		const year = newDate.getFullYear();
		const month = String(newDate.getMonth() + 1).padStart(2, '0');
		const d = String(newDate.getDate()).padStart(2, '0');
		value = `${year}-${month}-${d}`;
		isOpen = false;
	}

	function prevMonth() {
		currentDate = new Date(currentYear, currentMonth - 1, 1);
	}

	function nextMonth() {
		currentDate = new Date(currentYear, currentMonth + 1, 1);
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

<div class="datepicker-container" bind:this={containerRef} onkeydown={handleKeydown} role="group" aria-label="Date picker">
	<div class="input-wrapper">
		<input
			type="text"
			id={finalId}
			value={value}
			readonly
			{placeholder}
			{disabled}
			aria-invalid={finalInvalid}
			aria-expanded={calendarPopoverExpanded}
			aria-haspopup="dialog"
			aria-controls="{finalId}-popover"
			required={finalRequired}
			aria-describedby={finalAriaDescribedby}
			class="datepicker-input"
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
		<svg class="calendar-icon" viewBox="0 0 100 100" aria-hidden="true" onclick={togglePopover}>
			<rect x="15" y="25" width="70" height="60" rx="5" fill="none" stroke="currentColor" stroke-width="6"/>
			<line x1="30" y1="15" x2="30" y2="35" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
			<line x1="70" y1="15" x2="70" y2="35" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
			<line x1="15" y1="45" x2="85" y2="45" stroke="currentColor" stroke-width="6"/>
		</svg>
	</div>

	{#if isOpen}
		<div
			id="{finalId}-popover"
			class="datepicker-popover"
			bind:this={popoverRef}
			role="dialog"
			aria-label="Calendário"
		>
			<div class="calendar-header">
				<button type="button" class="nav-btn" onclick={prevMonth} aria-label="Mês anterior">
					<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>
				</button>
				<div class="month-year" aria-live="polite" aria-atomic="true">
					<strong>{monthNames[currentMonth]}</strong> {currentYear}
				</div>
				<button type="button" class="nav-btn" onclick={nextMonth} aria-label="Próximo mês">
					<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
				</button>
			</div>

			<div class="calendar-grid">
				<div class="weekday">D</div>
				<div class="weekday">S</div>
				<div class="weekday">T</div>
				<div class="weekday">Q</div>
				<div class="weekday">Q</div>
				<div class="weekday">S</div>
				<div class="weekday">S</div>

				{#each calendarDays as day, i}
					{#if day === null}
						<div class="empty-day"></div>
					{:else}
						<button
							type="button"
							class="day-btn"
							class:selected={value === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`}
							onclick={() => selectDate(day)}
						>
							{day}
						</button>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.datepicker-container {
		position: relative;
		width: 100%;
		font-family: var(--font-sans);
	}

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.datepicker-input {
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

	.datepicker-input:focus-visible {
		outline: 2px solid var(--accent, var(--azul));
		outline-offset: 2px;
	}

	.datepicker-input.invalid {
		border-color: var(--vermelho);
		background-color: var(--vermelho-soft);
	}

	.datepicker-input.invalid:focus-visible {
		outline-color: var(--vermelho);
	}

	.datepicker-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.calendar-icon {
		position: absolute;
		right: 0.75rem;
		width: 1.25rem;
		height: 1.25rem;
		color: var(--concreto-60);
		pointer-events: none;
	}

	/* Concreto doctrine: sharp geometry, rigid structure, pool shadow */
	.datepicker-popover {
		position: absolute;
		top: calc(100% + 0.25rem);
		left: 0;
		z-index: 50;
		background-color: var(--papel-00);
		border: 1px solid var(--concreto-80);
		border-radius: 0px; /* Sharp geometry */
		padding: 1rem;
		box-shadow: var(--shadow-2);
		min-width: 280px;
	}

	.calendar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.nav-btn {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--concreto-80);
		padding: 0.25rem;
		border-radius: var(--r-1);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-btn:hover {
		background-color: var(--papel-10);
	}

	.nav-btn:focus-visible {
		outline: 2px solid var(--azul);
		outline-offset: 2px;
	}

	.month-year {
		color: var(--concreto-90);
		font-size: var(--t-body);
	}

	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 0.25rem;
		text-align: center;
	}

	.weekday {
		font-size: var(--t-small);
		color: var(--concreto-60);
		font-weight: bold;
		padding-bottom: 0.5rem;
	}

	.day-btn {
		background: none;
		border: 1px solid transparent;
		border-radius: var(--r-1);
		padding: 0.5rem 0;
		cursor: pointer;
		font-family: var(--font-sans);
		font-size: var(--t-small);
		color: var(--concreto-80);
	}

	.day-btn:hover:not(.selected) {
		background-color: var(--papel-10);
		border-color: var(--concreto-40);
	}

	.day-btn:focus-visible {
		outline: 2px solid var(--azul);
		outline-offset: 2px;
	}

	.day-btn.selected {
		background-color: var(--azul);
		color: var(--papel-00);
		font-weight: bold;
	}
</style>
