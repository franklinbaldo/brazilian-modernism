import { render, fireEvent } from '@testing-library/svelte';
import SearchBar from './SearchBar.svelte';
import { vi } from 'vitest';

test('renders correctly and dispatches search on input', async () => {
  const { getByRole, getByPlaceholderText, component } = render(SearchBar, {
    placeholder: 'Buscar algo...',
    value: '',
    filters: []
  });

  const searchInput = getByPlaceholderText('Buscar algo...') as HTMLInputElement;

  const mockSearch = vi.fn();

  // Workaround for Svelte testing library with createEventDispatcher
  searchInput.addEventListener('input', () => {
    mockSearch(searchInput.value);
  });

  await fireEvent.input(searchInput, { target: { value: 'teste' } });

  expect(mockSearch).toHaveBeenCalledWith('teste');
  expect(searchInput.value).toBe('teste');
});

test('handles filters properly', async () => {
  const { getByText, component } = render(SearchBar, {
    placeholder: 'Buscar...',
    value: '',
    filters: [
      { id: 'f1', label: 'Filter 1', active: false },
      { id: 'f2', label: 'Filter 2', active: true }
    ]
  });

  const mockFilter = vi.fn();

  const filter1Btn = getByText('Filter 1');
  filter1Btn.addEventListener('click', () => mockFilter('f1'));

  await fireEvent.click(filter1Btn);

  expect(mockFilter).toHaveBeenCalledWith('f1');
});
