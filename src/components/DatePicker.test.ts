import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/svelte';
import DatePicker from './DatePicker.svelte';
import FormFieldMockWrapper from './FormFieldMockWrapper.test.svelte';

describe('DatePicker Component', () => {
	afterEach(() => {
		cleanup();
		vi.clearAllMocks();
	});

	it('renders correctly with default props', () => {
		const { getByRole } = render(DatePicker);
		const input = getByRole('textbox');
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('placeholder', 'Selecione uma data');
		expect(input).toHaveAttribute('aria-expanded', 'false');
	});

	it('opens the calendar popover on click', async () => {
		const { getByRole, getByLabelText } = render(DatePicker);
		const input = getByRole('textbox');

		await fireEvent.click(input);

		const popover = getByLabelText('Calendário');
		expect(popover).toBeInTheDocument();
		expect(popover).toHaveAttribute('role', 'dialog');
		expect(input).toHaveAttribute('aria-expanded', 'true');
	});

	it('selects a date and closes popover', async () => {
		const { getByRole, getByLabelText, getByText } = render(DatePicker);
		const input = getByRole('textbox');

		await fireEvent.click(input);

		const dayBtn = getByText('15');
		await fireEvent.click(dayBtn);

		const val = (input as HTMLInputElement).value;
		expect(val.endsWith('-15')).toBe(true);
		expect(input).toHaveAttribute('aria-expanded', 'false');
	});

	it('closes the popover on Escape key', async () => {
		const { getByRole, getByLabelText } = render(DatePicker);
		const input = getByRole('textbox');

		await fireEvent.click(input);
		expect(getByLabelText('Calendário')).toBeInTheDocument();

		await fireEvent.keyDown(getByLabelText('Calendário'), { key: 'Escape' });

		expect(input).toHaveAttribute('aria-expanded', 'false');
	});

	it('integrates with FormField invalid context', () => {
		const { getByRole } = render(FormFieldMockWrapper, {
			props: {
				invalid: true,
				component: DatePicker
			}
		});

		const input = getByRole('textbox');
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input.classList.contains('invalid')).toBe(true);
	});
});
