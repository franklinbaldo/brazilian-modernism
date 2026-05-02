import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, cleanup, screen } from '@testing-library/svelte';
import Switch from './Switch.svelte';

describe('Switch Component (BDD)', () => {
  afterEach(cleanup);

  it('should render a switch with correct default attributes', () => {
    const { getByRole } = render(Switch);
    const toggle = getByRole('switch') as HTMLInputElement;
    expect(toggle).toBeInTheDocument();
    expect(toggle.checked).toBe(false);
    expect(toggle.disabled).toBe(false);
  });

  it('should toggle checked state when clicked', async () => {
    const { getByRole } = render(Switch);
    const toggle = getByRole('switch') as HTMLInputElement;

    expect(toggle.checked).toBe(false);
    await fireEvent.click(toggle);
    expect(toggle.checked).toBe(true);
    await fireEvent.click(toggle);
    expect(toggle.checked).toBe(false);
  });

  it('should render as disabled when disabled prop is true', () => {
    const { getByRole } = render(Switch, { disabled: true });
    const toggle = getByRole('switch') as HTMLInputElement;
    expect(toggle.disabled).toBe(true);
  });

  it('should associate with aria-describedby and id appropriately', () => {
    const { getByRole } = render(Switch, { id: 'sw-1', 'aria-describedby': 'helper-1' });
    const toggle = getByRole('switch') as HTMLInputElement;
    expect(toggle.id).toBe('sw-1');
    expect(toggle.getAttribute('aria-describedby')).toBe('helper-1');
  });

  it('renders invalid state correctly when explicitly passed', () => {
    render(Switch, { props: { invalid: true } });
    const input = screen.getByRole('switch');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const container = input.parentElement;
    expect(container).toHaveClass('invalid');
  });
});

describe('Switch Validation States', () => {
  afterEach(cleanup);

  it('renders invalid state class', () => {
    render(Switch, { props: { invalid: true } });
    const input = screen.getByRole('switch');
    const container = input.parentElement;
    expect(container).toHaveClass('invalid');
    expect(container).not.toHaveClass('valid');
  });

  it('renders valid state class', () => {
    render(Switch, { props: { valid: true } });
    const input = screen.getByRole('switch');
    const container = input.parentElement;
    expect(container).toHaveClass('valid');
    expect(container).not.toHaveClass('invalid');
  });

  it('prioritizes invalid state over valid state', () => {
    render(Switch, { props: { invalid: true, valid: true } });
    const input = screen.getByRole('switch');
    const container = input.parentElement;
    expect(container).toHaveClass('invalid');
    expect(container).not.toHaveClass('valid');
  });
});
