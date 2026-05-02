import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/svelte';
import { tick } from 'svelte';
import MultiSelect from './MultiSelect.svelte';
import MultiSelectWrapper from './MultiSelectWrapper.test.svelte';

describe('MultiSelect.svelte', () => {
  const options = [
    { value: 'a', label: 'Opção A' },
    { value: 'b', label: 'Opção B' }
  ];

  afterEach(() => {
    cleanup();
  });

  it('toggles the dropdown menu', async () => {
    render(MultiSelect, { options });
    const trigger = screen.getByRole('combobox');

    // Initially hidden
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    // Open
    await fireEvent.click(trigger);
    await tick();
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // Close
    await fireEvent.click(trigger);
    await tick();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('selects an option', async () => {
    render(MultiSelect, { options, value: [] });
    const trigger = screen.getByRole('combobox');

    await fireEvent.click(trigger);
    await tick();

    const optionA = screen.getByLabelText('Opção A');
    await fireEvent.click(optionA);
    await tick();

    // The option "A" is selected and visible as a badge. Badge label is rendered
    expect(screen.getAllByText('Opção A')[0]).toBeInTheDocument();
  });

  it('unselects an option by clicking it again in the dropdown menu', async () => {
    render(MultiSelect, { options, value: ['a'] });
    const trigger = screen.getByRole('combobox');

    // Make sure it's initially selected and the badge is visible
    expect(screen.getAllByText('Opção A')[0]).toBeInTheDocument();

    // Open dropdown
    await fireEvent.click(trigger);
    await tick();

    // Click the checkbox to unselect
    const optionA = screen.getByLabelText('Opção A');
    await fireEvent.click(optionA);
    await tick();

    // The badge should no longer be in the document
    expect(screen.queryByText('Remove Opção A')).not.toBeInTheDocument();
  });

  it('removes an option', async () => {
    render(MultiSelect, { options, value: ['a'] });

    expect(screen.getAllByText('Opção A')[0]).toBeInTheDocument();

    const removeBtn = screen.getByRole('button', { name: 'Remove Opção A' });
    await fireEvent.click(removeBtn);
    await tick();

    expect(screen.queryByText('Opção A')).not.toBeInTheDocument();
  });

  it('searches options', async () => {
    const searchOptions = [
      { value: 'br', label: 'Brasil' },
      { value: 'ar', label: 'Argentina' }
    ];
    render(MultiSelect, { options: searchOptions, searchable: true });

    const input = screen.getByRole('textbox');
    await fireEvent.input(input, { target: { value: 'Bra' } });
    await tick();

    const trigger = screen.getByRole('combobox');
    await fireEvent.click(trigger);
    await tick();

    expect(screen.getAllByText('Brasil')[0]).toBeInTheDocument();
    expect(screen.queryByText('Argentina')).not.toBeInTheDocument();
  });

  it('integrates with FormField context', async () => {
    render(MultiSelectWrapper, { options, invalid: true });

    const trigger = screen.getByRole('combobox');

    // the hidden input inside multiselect-trigger receives the aria-invalid
    const hiddenInput = trigger.querySelector('.sr-only-input');
    expect(hiddenInput).toHaveAttribute('aria-invalid', 'true');
    // wrapper receives invalid class
    expect(trigger.parentElement).toHaveClass('invalid');
  });

  it('renders valid state correctly when explicitly passed', () => {
    render(MultiSelect, { options, valid: true });
    const trigger = screen.getByRole('combobox');
    expect(trigger.parentElement).toHaveClass('valid');
  });

  it('invalid prop takes precedence over valid prop', () => {
    render(MultiSelect, { options, invalid: true, valid: true });
    const trigger = screen.getByRole('combobox');
    const hiddenInput = trigger.querySelector('.sr-only-input');

    expect(trigger.parentElement).toHaveClass('invalid');
    expect(trigger.parentElement).not.toHaveClass('valid');
    expect(hiddenInput).toHaveAttribute('aria-invalid', 'true');
  });
});