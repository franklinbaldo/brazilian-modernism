import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import TabsTest from './Tabs.test.svelte';

describe('Tabs Organism (BDD)', () => {
  it('renders the tabs and displays the correct active panel by default', () => {
    render(TabsTest);

    const tab1 = screen.getByRole('tab', { name: 'First Tab' });
    const tab2 = screen.getByRole('tab', { name: 'Second Tab' });

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();

    // Tab1 should be active
    expect(tab1.getAttribute('aria-selected')).toBe('true');
    expect(tab2.getAttribute('aria-selected')).toBe('false');

    // Panel1 should be visible
    const panel1 = screen.getByRole('tabpanel', { name: 'First Tab' });
    expect(panel1).toBeInTheDocument();
    expect(panel1).toHaveTextContent('Content for the first tab.');

    // Panel2 should NOT be visible
    expect(screen.queryByRole('tabpanel', { name: 'Second Tab' })).not.toBeInTheDocument();
  });

  it('switches tabs and active panels when clicked', async () => {
    render(TabsTest);

    const tab2 = screen.getByRole('tab', { name: 'Second Tab' });

    await fireEvent.click(tab2);

    expect(tab2.getAttribute('aria-selected')).toBe('true');

    // Panel2 should now be visible
    const panel2 = screen.getByRole('tabpanel', { name: 'Second Tab' });
    expect(panel2).toBeInTheDocument();
    expect(panel2).toHaveTextContent('Content for the second tab.');

    // Panel1 should NOT be visible anymore
    expect(screen.queryByRole('tabpanel', { name: 'First Tab' })).not.toBeInTheDocument();

    // The bound value should update
    const activeValue = screen.getByTestId('active-value');
    expect(activeValue).toHaveTextContent('tab2');
  });

  it('prevents disabled tabs from being activated', async () => {
    render(TabsTest);

    const tab3 = screen.getByRole('tab', { name: 'Third Tab' });

    await fireEvent.click(tab3);

    expect(tab3.getAttribute('aria-selected')).toBe('false');
    expect(screen.queryByRole('tabpanel', { name: 'Third Tab' })).not.toBeInTheDocument();

    // The bound value should remain tab1
    const activeValue = screen.getByTestId('active-value');
    expect(activeValue).toHaveTextContent('tab1');
  });

  it('supports keyboard navigation via Arrow keys, Home, and End', async () => {
    render(TabsTest);

    const tabList = screen.getByRole('tablist');
    const tab1 = screen.getByRole('tab', { name: 'First Tab' });
    const tab2 = screen.getByRole('tab', { name: 'Second Tab' });

    tab1.focus();
    expect(document.activeElement).toBe(tab1);

    // Right arrow moves to next non-disabled tab
    await fireEvent.keyDown(tabList, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tab2);

    // Right arrow again wraps around (because tab3 is disabled)
    await fireEvent.keyDown(tabList, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tab1);

    // End moves to the last non-disabled tab
    await fireEvent.keyDown(tabList, { key: 'End' });
    expect(document.activeElement).toBe(tab2);

    // Home moves to the first non-disabled tab
    await fireEvent.keyDown(tabList, { key: 'Home' });
    expect(document.activeElement).toBe(tab1);
  });
});
