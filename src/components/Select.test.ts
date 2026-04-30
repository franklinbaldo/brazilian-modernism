import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Select from './Select.svelte';

describe('Select Component', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];

  it('renders correctly with options', () => {
    const { container } = render(Select, { props: { options } });
    const select = container.querySelector('select');
    expect(select).toBeInTheDocument();
    expect(select?.querySelectorAll('option').length).toBe(2);
  });

  it('supports placeholder option', () => {
    const { container } = render(Select, { props: { options, placeholder: 'Select an option' } });
    const select = container.querySelector('select');
    const firstOption = select?.querySelector('option');
    expect(firstOption).toHaveAttribute('disabled');
    expect(firstOption).toHaveTextContent('Select an option');
  });

  it('handles keyboard navigation and rest props', async () => {
    const onKeyDownMock = vi.fn();
    const { container } = render(Select, { props: { options, onkeydown: onKeyDownMock, 'aria-label': 'Select Test' } });
    const select = container.querySelector('select') as HTMLSelectElement;

    expect(select).toHaveAttribute('aria-label', 'Select Test');

    select.focus();
    expect(select).toHaveFocus();

    await fireEvent.keyDown(select, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(onKeyDownMock).toHaveBeenCalledTimes(1);
  });
});
