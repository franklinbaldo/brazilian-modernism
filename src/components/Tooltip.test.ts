import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import TooltipTest from './Tooltip.test.svelte';

describe('Tooltip Molecule', () => {
  it('renders closed by default', () => {
    render(TooltipTest);
    const trigger = screen.getByText('Hover me');
    expect(trigger).toBeInTheDocument();

    // Tooltip popup should not be in the document initially
    const tooltip = screen.queryByRole('tooltip');
    expect(tooltip).not.toBeInTheDocument();
  });

  it('opens and displays content on mouseenter and closes on mouseleave', async () => {
    render(TooltipTest);

    const button = screen.getByText('Hover me');
    const wrapper = button.closest('.cobogo-tooltip-wrapper');

    await fireEvent.mouseEnter(wrapper!);

    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent('Tooltip Content');
    });

    await fireEvent.mouseLeave(wrapper!);

    // Test that aria-describedby is removed to indicate it's logically closed
    await waitFor(() => {
      expect(button).not.toHaveAttribute('aria-describedby');
    });
  });

  it('opens on focusin and closes on blur', async () => {
    render(TooltipTest);

    const button = screen.getByText('Hover me');
    const wrapper = button.closest('.cobogo-tooltip-wrapper');

    await fireEvent.focusIn(wrapper!);

    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
    });

    await fireEvent.focusOut(wrapper!);

    await waitFor(() => {
      expect(button).not.toHaveAttribute('aria-describedby');
    });
  });

  it('applies aria-describedby to the trigger element when visible', async () => {
    render(TooltipTest);

    const button = screen.getByText('Hover me');
    const wrapper = button.closest('.cobogo-tooltip-wrapper');

    expect(button).not.toHaveAttribute('aria-describedby');

    await fireEvent.mouseEnter(wrapper!);

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-describedby');
      const describedBy = button.getAttribute('aria-describedby');
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip.id).toBe(describedBy);
    });
  });

  it('can be dismissed with Escape key without losing focus (WCAG 1.4.13)', async () => {
    render(TooltipTest);

    const button = screen.getByText('Hover me');
    const wrapper = button.closest('.cobogo-tooltip-wrapper');

    // Focus to open
    button.focus();
    await fireEvent.focusIn(wrapper!);

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    // Press Escape
    // Note: The event will bubble from the focused element (button) up to the wrapper
    await fireEvent.keyDown(button, { key: 'Escape', code: 'Escape' });

    // We check aria-describedby instead of checking if the tooltip element is removed
    // because out:fade keeps the element in the DOM until the transition finishes.
    await waitFor(() => {
      expect(button).not.toHaveAttribute('aria-describedby');
      // Focus should still be on the button
      expect(document.activeElement).toBe(button);
    });
  });
});
