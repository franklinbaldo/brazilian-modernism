import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/svelte';
import { tick } from 'svelte';
import MultiSelectTestWrapper from './MultiSelect.test.svelte';

describe('MultiSelect', () => {
  const options = [
    { value: 'br', label: 'Brasil' },
    { value: 'ar', label: 'Argentina' },
    { value: 'uy', label: 'Uruguai' },
  ];

  it('renders with placeholder and no selections initially', () => {
    render(MultiSelectTestWrapper, { options, placeholder: 'Test placeholder' });

    // In Svelte 5 with our implementation, the placeholder might be a span or an input
    const placeholderText = screen.getByText('Test placeholder');
    expect(placeholderText).toBeInTheDocument();
  });

  it('toggles dropdown when clicked', async () => {
    render(MultiSelectTestWrapper, { options });

    const trigger = screen.getByRole('combobox');

    // Initially closed
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    // Open
    await fireEvent.click(trigger);
    await tick();

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();

    // Check options are rendered
    expect(screen.getByText('Brasil')).toBeInTheDocument();
    expect(screen.getByText('Argentina')).toBeInTheDocument();

    // Close by clicking outside (simulating)
    await fireEvent.click(document.body);
    await tick();

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('renders badges for selected options', async () => {
    render(MultiSelectTestWrapper, { options, value: ['br', 'uy'] });

    // Badges should be rendered
    expect(screen.getByText('Brasil')).toBeInTheDocument();
    expect(screen.getByText('Uruguai')).toBeInTheDocument();
    expect(screen.queryByText('Argentina')).not.toBeInTheDocument();
  });

  it('can remove a selected option', async () => {
    render(MultiSelectTestWrapper, { options, value: ['br'] });

    expect(screen.getByText('Brasil')).toBeInTheDocument();

    const removeBtn = screen.getByRole('button', { name: 'Remove Brasil' });
    await fireEvent.click(removeBtn);
    await tick();

    expect(screen.queryByText('Brasil')).not.toBeInTheDocument();
  });

  it('filters options when searching', async () => {
    render(MultiSelectTestWrapper, { options, searchable: true });

    const trigger = screen.getByRole('combobox');
    await fireEvent.click(trigger);
    await tick();

    const input = screen.getByRole('textbox');
    await fireEvent.input(input, { target: { value: 'ar' } });
    await tick();

    expect(screen.getByText('Argentina')).toBeInTheDocument();
    expect(screen.queryByText('Brasil')).not.toBeInTheDocument();
    expect(screen.queryByText('Uruguai')).not.toBeInTheDocument();
  });
});
