import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, cleanup, screen } from '@testing-library/svelte';
import Radio from './Radio.svelte';

describe('Radio Component (BDD)', () => {
  afterEach(cleanup);

  it('should render a radio with correct default attributes', () => {
    const { getByRole } = render(Radio, { value: 'option1', group: null });
    const radio = getByRole('radio') as HTMLInputElement;
    expect(radio).toBeInTheDocument();
    expect(radio.value).toBe('option1');
    expect(radio.disabled).toBe(false);
  });

  it('should associate with aria-describedby and id appropriately', () => {
    const { getByRole } = render(Radio, { value: 'option1', group: null, id: 'rd-1', 'aria-describedby': 'helper-1' });
    const radio = getByRole('radio') as HTMLInputElement;
    expect(radio.id).toBe('rd-1');
    expect(radio.getAttribute('aria-describedby')).toBe('helper-1');
  });

  it('should render as disabled when disabled prop is true', () => {
    const { getByRole } = render(Radio, { value: 'option1', group: null, disabled: true });
    const radio = getByRole('radio') as HTMLInputElement;
    expect(radio.disabled).toBe(true);
  });

  it('renders invalid state correctly when explicitly passed', () => {
    render(Radio, { props: { value: '1', group: '2', invalid: true } });
    const input = screen.getByRole('radio');
    const container = input.parentElement;
    expect(container).toHaveClass('invalid');
  });
});

import RadioGroupTest from './RadioGroup.test.svelte';

describe('Radio Group Interaction', () => {
  afterEach(cleanup);

  it('should update group value when another radio is selected', async () => {
    const { getByLabelText } = render(RadioGroupTest, { testGroup: 'apple' });

    const apple = getByLabelText('Apple') as HTMLInputElement;
    const banana = getByLabelText('Banana') as HTMLInputElement;

    expect(apple.checked).toBe(true);
    expect(banana.checked).toBe(false);

    await fireEvent.click(banana);

    expect(banana.checked).toBe(true);
    expect(apple.checked).toBe(false);
  });
});
