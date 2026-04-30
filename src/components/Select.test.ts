import { render } from '@testing-library/svelte';
import Select from './Select.svelte';

test('renders correctly and respects disabled states', () => {
  const { getByRole, getAllByRole } = render(Select, {
    value: '',
    options: [
      { value: 'op1', label: 'Option 1' },
      { value: 'op2', label: 'Option 2' }
    ],
    disabled: true,
    placeholder: 'Select one'
  });

  const select = getByRole('combobox') as HTMLSelectElement;
  expect(select.disabled).toBe(true);

  // Option roles are somewhat tricky with hidden elements in testing-library
  const options = document.querySelectorAll('option');
  expect(options).toHaveLength(3); // placeholder + 2 options
});
