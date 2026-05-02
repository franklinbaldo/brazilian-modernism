import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/svelte';
import TextInputContext from './TextInputContext.test.svelte';
import SelectContext from './SelectContext.test.svelte';

describe('Validation States - TextInput and Select via Context', () => {
  afterEach(cleanup);

  it('TextInput should inherit invalid state from context', () => {
    render(TextInputContext, { props: { invalid: true } });
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('invalid');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('Select should inherit invalid state from context', () => {
    render(SelectContext, { props: { invalid: true } });
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('invalid');
    expect(select).toHaveAttribute('aria-invalid', 'true');
  });
});
