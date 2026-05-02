import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/svelte';
import Checkbox from './Checkbox.svelte';
import Radio from './Radio.svelte';
import Switch from './Switch.svelte';

describe('Validation States - Checked and Invalid', () => {
  afterEach(cleanup);

  it('Checkbox should have invalid class even when checked', () => {
    render(Checkbox, { props: { invalid: true, checked: true } });
    const input = screen.getByRole('checkbox');
    const container = input.parentElement;
    expect(container).toHaveClass('invalid');
  });

  it('Radio should have invalid class even when checked', () => {
    render(Radio, { props: { invalid: true, value: '1', group: '1' } });
    const input = screen.getByRole('radio');
    const container = input.parentElement;
    expect(container).toHaveClass('invalid');
  });

  it('Switch should have invalid class even when checked', () => {
    render(Switch, { props: { invalid: true, checked: true } });
    const input = screen.getByRole('switch');
    const container = input.parentElement;
    expect(container).toHaveClass('invalid');
  });
});
