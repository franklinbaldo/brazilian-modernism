import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import TextInput from './TextInput.svelte';

describe('TextInput Component', () => {
  it('renders correctly with default props', () => {
    render(TextInput);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).not.toHaveAttribute('disabled');
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).toHaveClass('text-input-md');
  });

  it('applies custom props correctly', () => {
    render(TextInput, { props: { type: 'email', placeholder: 'Enter email', size: 'lg', disabled: true } });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Enter email');
    expect(input).toHaveAttribute('disabled');
    expect(input).toHaveClass('text-input-lg');
  });

  it('updates value on user input', async () => {
    render(TextInput);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await fireEvent.input(input, { target: { value: 'New text' } });
    expect(input.value).toBe('New text');
  });

  it('renders invalid state correctly when explicitly passed', () => {
    const { component } = render(TextInput, { props: { invalid: true } });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('invalid');
    // Ensure the invalid state prevents 'valid' class even if explicitly passed
    expect(input).not.toHaveClass('valid');
  });

  it('renders valid state correctly when explicitly passed', () => {
    const { component } = render(TextInput, { props: { valid: true } });
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('valid');
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('invalid prop takes precedence over valid prop', () => {
    render(TextInput, { props: { invalid: true, valid: true } });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('invalid');
    expect(input).not.toHaveClass('valid');
  });
});
