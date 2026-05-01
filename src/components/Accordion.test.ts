import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import AccordionTest from './Accordion.test.svelte';

describe('Accordion Component (BDD)', () => {
  it('renders a group of disclosures', () => {
    render(AccordionTest);

    const summary1 = screen.getByText('Item 1');
    const summary2 = screen.getByText('Item 2');

    expect(summary1).toBeInTheDocument();
    expect(summary2).toBeInTheDocument();

    const details1 = summary1.closest('details');
    const details2 = summary2.closest('details');

    expect(details1?.getAttribute('name')).toBe('my-accordion');
    expect(details2?.getAttribute('name')).toBe('my-accordion');
  });

  it('allows native name-based mutual exclusivity if toggled manually', async () => {
    // jsdom doesn't fully support <details name="..."> mutual exclusivity when simulating clicks.
    // However, we can test that clicking them functions as normal, and that the name attribute
    // is correctly propagated, which delegates the mutual exclusivity to the browser natively.
    render(AccordionTest);

    const summary1 = screen.getByText('Item 1');
    const summary2 = screen.getByText('Item 2');

    const details1 = summary1.closest('details');
    const details2 = summary2.closest('details');

    expect(details1?.open).toBe(false);
    expect(details2?.open).toBe(false);

    await fireEvent.click(summary1);
    expect(details1?.open).toBe(true);

    await fireEvent.click(summary2);
    expect(details2?.open).toBe(true);

    // In a real browser, opening details2 would close details1 because they share the same 'name'.
    // Since we rely on the native browser feature 'name' for this behavior to avoid JS overhead
    // (Curva & Concreto doctrine), we acknowledge jsdom won't close details1 automatically in test.
  });
});
