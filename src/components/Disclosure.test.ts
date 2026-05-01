import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import DisclosureTest from './Disclosure.test.svelte';

describe('Disclosure Component (BDD)', () => {
  it('renders closed by default', () => {
    render(DisclosureTest, { title: 'Lina Bo Bardi' });

    const summary = screen.getByText('Lina Bo Bardi');
    expect(summary).toBeInTheDocument();

    const details = summary.closest('details');
    expect(details?.open).toBe(false);
  });

  it('renders open when open prop is true', () => {
    render(DisclosureTest, { title: 'Lina Bo Bardi', open: true });

    const summary = screen.getByText('Lina Bo Bardi');
    const details = summary.closest('details');

    expect(details?.open).toBe(true);
    // Since details is natively open, the content should be visible to querying
    const content = screen.getByTestId('disclosure-content');
    expect(content).toBeVisible();
  });

  it('opens and closes on summary click', async () => {
    render(DisclosureTest, { title: 'Lucio Costa' });

    const summary = screen.getByText('Lucio Costa').closest('summary');
    const details = summary?.closest('details');

    expect(details?.open).toBe(false);

    if (summary) {
      await fireEvent.click(summary);
      // Native details toggles the open attribute automatically in real browsers.
      // However, jsdom needs manual mocking/triggering sometimes.
      // Let's check if jsdom handled the click properly.
      expect(details?.open).toBe(true);

      await fireEvent.click(summary);
      expect(details?.open).toBe(false);
    }
  });

  it('does not toggle when disabled', async () => {
    render(DisclosureTest, { title: 'Oscar Niemeyer', disabled: true });

    const summary = screen.getByText('Oscar Niemeyer').closest('summary');
    const details = summary?.closest('details');

    expect(details?.open).toBe(false);

    if (summary) {
      await fireEvent.click(summary);
      // Because we call event.preventDefault() in the handler, it shouldn't open
      expect(details?.open).toBe(false);
    }
  });
});
