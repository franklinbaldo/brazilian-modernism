import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/svelte';
import TimePicker from './TimePicker.svelte';
import FormFieldMockWrapper from './FormFieldMockWrapper.test.svelte';

describe('TimePicker Component', () => {
	afterEach(() => {
		cleanup();
		vi.clearAllMocks();
	});

	it('renders correctly with default props', () => {
		const { getByRole } = render(TimePicker);
		const input = getByRole('textbox');
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('placeholder', 'Selecione um horário');
		expect(input).toHaveAttribute('aria-expanded', 'false');
	});

	it('opens the time popover on click', async () => {
		const { getByRole, getByLabelText } = render(TimePicker);
		const input = getByRole('textbox');

		await fireEvent.click(input);

		const popover = getByLabelText('Horário');
		expect(popover).toBeInTheDocument();
		expect(popover).toHaveAttribute('role', 'dialog');
		expect(input).toHaveAttribute('aria-expanded', 'true');
	});

	it('selects a time and closes popover', async () => {
		const { getByRole, getByLabelText, getAllByText } = render(TimePicker);
		const input = getByRole('textbox');

		await fireEvent.click(input);

		// Select hour '14'
		const hourBtn = getAllByText('14')[0]; // first '14' is hour
		await fireEvent.click(hourBtn);

		// Select minute '30'
		const minBtns = getAllByText('30');
		const minBtn = minBtns[minBtns.length - 1];
		await fireEvent.click(minBtn);

		expect(input).toHaveValue('14:30');

		// Close explicitly via escape since we changed it to not close on selection
		await fireEvent.keyDown(input, { key: 'Escape' });
		expect(input).toHaveAttribute('aria-expanded', 'false');
	});

	it('closes the popover on Escape key', async () => {
		const { getByRole, getByLabelText } = render(TimePicker);
		const input = getByRole('textbox');

		await fireEvent.click(input);
		expect(getByLabelText('Horário')).toBeInTheDocument();

		await fireEvent.keyDown(getByLabelText('Horário'), { key: 'Escape' });

		expect(input).toHaveAttribute('aria-expanded', 'false');
	});

	it('integrates with FormField invalid context', () => {
		const { getByRole } = render(FormFieldMockWrapper, {
			props: {
				invalid: true,
				component: TimePicker
			}
		});

		const input = getByRole('textbox');
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input.classList.contains('invalid')).toBe(true);
	});
});
