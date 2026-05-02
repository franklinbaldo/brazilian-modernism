import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Select from './Select.svelte';

describe('Select Component', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];

  it('renders correctly with default props', () => {
    render(Select, { props: { options } });
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).not.toHaveAttribute('disabled');
    expect(select).toHaveClass('select-input-md');

    // Due to jsdom limitations with hidden options in selects, we can check children directly
    expect(select.children).toHaveLength(2);
    expect(select.children[0]).toHaveTextContent('Option 1');
    expect(select.children[1]).toHaveTextContent('Option 2');
  });

  it('renders a placeholder option if provided', () => {
    render(Select, { props: { options, placeholder: 'Choose an option' } });
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('has-placeholder');

    // Check children instead of getByRole('option') due to 'hidden' attribute behavior in testing-library
    expect(select.children).toHaveLength(3); // Placeholder + 2 options

    // The first option should be the disabled placeholder
    expect(select.children[0]).toHaveTextContent('Choose an option');
    expect(select.children[0]).toHaveAttribute('disabled');
    expect(select.children[0]).toHaveAttribute('hidden');
  });

  it('updates value when selection changes', async () => {
    render(Select, { props: { options } });
    const select = screen.getByRole('combobox') as HTMLSelectElement;

    // Change to '2'
    await fireEvent.change(select, { target: { value: '2' } });
    expect(select.value).toBe('2');
  });

  it('renders invalid state correctly when explicitly passed', () => {
    const options = [{ value: '1', label: 'One' }];
    render(Select, { props: { options, invalid: true } });
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveClass('invalid');
    expect(select).not.toHaveClass('valid');
  });

  it('renders valid state correctly when explicitly passed', () => {
    const options = [{ value: '1', label: 'One' }];
    render(Select, { props: { options, valid: true } });
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('valid');
    expect(select).toHaveAttribute('aria-invalid', 'false');
  });

  it('invalid prop takes precedence over valid prop', () => {
    const options = [{ value: '1', label: 'One' }];
    render(Select, { props: { options, invalid: true, valid: true } });
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveClass('invalid');
    expect(select).not.toHaveClass('valid');
  });
});
