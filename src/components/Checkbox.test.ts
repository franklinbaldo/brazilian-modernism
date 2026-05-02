import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, cleanup, screen } from '@testing-library/svelte';
import Checkbox from './Checkbox.svelte';

describe('Checkbox Component (BDD)', () => {
  afterEach(cleanup);

  it('should render a checkbox with correct default attributes', () => {
    const { getByRole } = render(Checkbox);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);
    expect(checkbox.disabled).toBe(false);
  });

  it('should toggle checked state when clicked', async () => {
    const { getByRole } = render(Checkbox);
    const checkbox = getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBe(false);
    await fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    await fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it('should render as disabled when disabled prop is true', () => {
    const { getByRole } = render(Checkbox, { disabled: true });
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });

  it('should associate with aria-describedby and id appropriately', () => {
    const { getByRole } = render(Checkbox, { id: 'cb-1', 'aria-describedby': 'helper-1' });
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.id).toBe('cb-1');
    expect(checkbox.getAttribute('aria-describedby')).toBe('helper-1');
  });

  it('renders invalid state correctly when explicitly passed', () => {
    render(Checkbox, { props: { invalid: true } });
    const input = screen.getByRole('checkbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const container = input.parentElement;
    expect(container).toHaveClass('invalid');
  });
});

import CheckboxGroupTest from './CheckboxGroup.test.svelte';

describe('Checkbox Group Interaction', () => {
  afterEach(cleanup);

  it('should update group array when checked/unchecked', async () => {
    const { getByLabelText } = render(CheckboxGroupTest, { testGroup: ['apple'] });

    const apple = getByLabelText('Apple') as HTMLInputElement;
    const banana = getByLabelText('Banana') as HTMLInputElement;

    expect(apple.checked).toBe(true);
    expect(banana.checked).toBe(false);

    await fireEvent.click(banana);
    expect(banana.checked).toBe(true);

    await fireEvent.click(apple);
    expect(apple.checked).toBe(false);
  });
});

describe('Checkbox Validation States', () => {
  afterEach(cleanup);

  it('renders invalid state class', () => {
    render(Checkbox, { props: { invalid: true } });
    const input = screen.getByRole('checkbox');
    const container = input.parentElement;
    expect(container).toHaveClass('invalid');
    expect(container).not.toHaveClass('valid');
  });

  it('renders valid state class', () => {
    render(Checkbox, { props: { valid: true } });
    const input = screen.getByRole('checkbox');
    const container = input.parentElement;
    expect(container).toHaveClass('valid');
    expect(container).not.toHaveClass('invalid');
  });

  it('prioritizes invalid state over valid state', () => {
    render(Checkbox, { props: { invalid: true, valid: true } });
    const input = screen.getByRole('checkbox');
    const container = input.parentElement;
    expect(container).toHaveClass('invalid');
    expect(container).not.toHaveClass('valid');
  });
});
