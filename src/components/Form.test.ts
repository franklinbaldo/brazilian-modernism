import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import FormWrapper from './Form.test.svelte';

describe('Form Component', () => {
  it('renders a form with given action and method', () => {
    const { container } = render(FormWrapper, { action: '/submit', method: 'post' });
    const form = container.querySelector('form');
    expect(form).toBeTruthy();
    expect(form?.getAttribute('action')).toBe('/submit');
    expect(form?.getAttribute('method')).toBe('post');
  });

  it('calls onsubmit handler when submitted', async () => {
    const mockSubmit = vi.fn((e) => e.preventDefault());
    const { getByText } = render(FormWrapper, { mockSubmit });

    const submitBtn = getByText('Submit');
    await fireEvent.click(submitBtn);

    expect(mockSubmit).toHaveBeenCalled();
  });

  it('renders a fieldset and legend when legend prop is provided', () => {
    const { container, getByText } = render(FormWrapper, { legend: 'Personal Info' });

    const fieldset = container.querySelector('fieldset');
    expect(fieldset).toBeTruthy();

    const legend = getByText('Personal Info');
    expect(legend.tagName).toBe('LEGEND');
  });

  it('renders a form-level error summary when error prop is provided', () => {
    const { getByText, getByRole } = render(FormWrapper, { error: 'Please correct the errors below.' });

    const errorAlert = getByRole('alert');
    expect(errorAlert).toBeTruthy();
    expect(getByText('Please correct the errors below.')).toBeTruthy();
  });
});
