import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import TextInput from './TextInput.svelte';

describe('TextInput Component', () => {
  it('renders correctly', () => {
    const { container } = render(TextInput);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders invalid state correctly', () => {
    const { container } = render(TextInput, { props: { invalid: true } });
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('invalid');
  });

  it('handles keyboard navigation and rest props', async () => {
    const onKeyDownMock = vi.fn();
    const { container } = render(TextInput, { props: { onkeydown: onKeyDownMock, 'aria-label': 'Input Test' } });
    const input = container.querySelector('input') as HTMLInputElement;

    expect(input).toHaveAttribute('aria-label', 'Input Test');

    input.focus();
    expect(input).toHaveFocus();

    await fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(onKeyDownMock).toHaveBeenCalledTimes(1);
  });
});
