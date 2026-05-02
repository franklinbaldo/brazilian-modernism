import { tick } from 'svelte';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Combobox from './Combobox.svelte';
import ComboboxContextTest from './ComboboxContext.test.svelte';

const defaultOptions = [
	{ value: 'sp', label: 'São Paulo' },
	{ value: 'rj', label: 'Rio de Janeiro' },
	{ value: 'mg', label: 'Minas Gerais' }
];

describe('Combobox Component', () => {
	it('renders correctly with placeholder', () => {
		render(Combobox, { props: { options: defaultOptions, placeholder: 'Select state' } });
		const input = screen.getByPlaceholderText('Select state');
		expect(input).toBeInTheDocument();
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});

	it('opens listbox on focus', async () => {
		render(Combobox, { props: { options: defaultOptions, placeholder: 'Select state' } });
		const input = screen.getByPlaceholderText('Select state');
		await fireEvent.focus(input);
		const listbox = screen.getByRole('listbox');
		expect(listbox).toBeInTheDocument();
		expect(screen.getAllByRole('option')).toHaveLength(3);
	});

	it('filters options based on input', async () => {
		render(Combobox, { props: { options: defaultOptions, placeholder: 'Search...' } });
		const input = screen.getByPlaceholderText('Search...');
		await fireEvent.focus(input);
		await fireEvent.input(input, { target: { value: 'Rio' } });

		const options = screen.getAllByRole('option');
		expect(options).toHaveLength(1);
		expect(options[0]).toHaveTextContent('Rio de Janeiro');
	});

	it('shows no results message when filter matches nothing', async () => {
		render(Combobox, { props: { options: defaultOptions, placeholder: 'Search...' } });
		const input = screen.getByPlaceholderText('Search...');
		await fireEvent.focus(input);
		await fireEvent.input(input, { target: { value: 'Bahia' } });

		const noResults = screen.getByRole('option');
		expect(noResults).toHaveTextContent('No options found');
	});

	it('selects an option via click', async () => {
		const { component } = render(Combobox, { props: { options: defaultOptions, placeholder: 'Search...', value: '' } });
		const input = screen.getByPlaceholderText('Search...');

		await fireEvent.focus(input);
		const spOption = screen.getByText('São Paulo');

		// Use mousedown since that's what the component listens to
		await fireEvent.mouseDown(spOption);

		// Manually click outside to close listbox
		await fireEvent.mouseDown(document.body);
		await tick();

		expect(input).toHaveValue('São Paulo');
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});

	it('supports keyboard navigation', async () => {
		render(Combobox, { props: { options: defaultOptions, placeholder: 'Search...' } });
		const input = screen.getByPlaceholderText('Search...');

		await fireEvent.focus(input);

		// Navigate down
		await fireEvent.keyDown(input, { key: 'ArrowDown' });
		let options = screen.getAllByRole('option');
		expect(options[0]).toHaveClass('focused');

		// Navigate down again
		await fireEvent.keyDown(input, { key: 'ArrowDown' });
		expect(options[1]).toHaveClass('focused');

		// Select with enter
		await fireEvent.keyDown(input, { key: 'Enter' });

		// Manually click outside to close listbox
		await fireEvent.mouseDown(document.body);
		await tick();

		expect(input).toHaveValue('Rio de Janeiro');
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});

	it('inherits form field context properties', () => {
		render(ComboboxContextTest);
		const input = screen.getByRole('textbox');

		expect(input).toHaveAttribute('id', 'ctx-id');
		expect(input).toHaveAttribute('aria-describedby', 'ctx-desc');
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input).toBeRequired();
	});

	it('renders valid state class when passed', () => {
		const options = [{ value: '1', label: 'Option 1' }];
		render(Combobox, { props: { options, valid: true } });
		const input = document.querySelector('input') as HTMLInputElement;
		expect(input).toHaveClass('valid');
	});

	it('prioritizes invalid state over valid state', () => {
		const options = [{ value: '1', label: 'Option 1' }];
		render(Combobox, { props: { options, invalid: true, valid: true } });
		const input = document.querySelector('input') as HTMLInputElement;

		expect(input).toHaveClass('invalid');
		expect(input).not.toHaveClass('valid');
		expect(input).toHaveAttribute('aria-invalid', 'true');
	});
});
