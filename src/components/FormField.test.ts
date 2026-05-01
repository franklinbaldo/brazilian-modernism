import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import FormFieldWrapper from './FormFieldWrapper.test.svelte';

describe('FormField Component', () => {
  it('renders label and passes id and required context to child input', () => {
    render(FormFieldWrapper);

    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'test-input');

    const requiredAsterisk = screen.getByText('*');
    expect(requiredAsterisk).toBeInTheDocument();

    const input = screen.getByTestId('mock-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-input');
    expect(input).toHaveAttribute('required');
    expect(input).not.toHaveAttribute('aria-describedby');
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('passes helper aria-describedby context to child input', () => {
    render(FormFieldWrapper, { props: { helper: 'Helper text' } });

    const helper = screen.getByText('Helper text');
    expect(helper).toBeInTheDocument();
    expect(helper).toHaveAttribute('id', 'test-input-helper');

    const input = screen.getByTestId('mock-input');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-helper');
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('passes error aria-describedby and invalid context to child input and overrides helper', () => {
    render(FormFieldWrapper, { props: { helper: 'Helper text', error: 'Error text' } });

    const error = screen.getByText('Error text');
    expect(error).toBeInTheDocument();
    expect(error).toHaveAttribute('id', 'test-input-error');

    const helper = screen.queryByText('Helper text');
    expect(helper).not.toBeInTheDocument();

    const input = screen.getByTestId('mock-input');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('invalid');
  });
});
