import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/svelte';
import OptionGroupTest from './OptionGroup.test.svelte';

describe('OptionGroup Molecule', () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders a fieldset with a legend', () => {
    render(OptionGroupTest, {
      legend: 'Select an option'
    });

    const fieldset = screen.getByRole('group', { name: 'Select an option' });
    expect(fieldset).toBeInTheDocument();
    expect(fieldset.tagName.toLowerCase()).toBe('fieldset');

    // The legend is visually present and accessible
    const legend = document.querySelector('legend');
    expect(legend).toBeInTheDocument();
    expect(legend?.textContent).toBe('Select an option');
  });

  it('applies the horizontal orientation class when specified', () => {
    const { container } = render(OptionGroupTest, {
      legend: 'Select an option',
      orientation: 'horizontal'
    });

    const optionsContainer = container.querySelector('.options-container');
    expect(optionsContainer).toHaveClass('horizontal');
  });

  it('defaults to vertical orientation', () => {
    const { container } = render(OptionGroupTest, {
      legend: 'Select an option'
    });

    const optionsContainer = container.querySelector('.options-container');
    expect(optionsContainer).not.toHaveClass('horizontal');
  });

  it('renders an error message and links it via aria-describedby', () => {
    render(OptionGroupTest, {
      legend: 'Select an option',
      name: 'my-group',
      error: 'This field is required'
    });

    const fieldset = screen.getByRole('group', { name: 'Select an option' });
    expect(fieldset).toHaveAttribute('aria-describedby', 'my-group-error');

    const errorMsg = screen.getByText('This field is required');
    expect(errorMsg).toBeInTheDocument();
    expect(errorMsg.closest('p')).toHaveAttribute('id', 'my-group-error');
  });

  it('passes the disabled state to the fieldset', () => {
    render(OptionGroupTest, {
      legend: 'Select an option',
      disabled: true
    });

    const fieldset = screen.getByRole('group', { name: 'Select an option' }) as HTMLFieldSetElement;
    expect(fieldset.disabled).toBe(true);
  });
});
