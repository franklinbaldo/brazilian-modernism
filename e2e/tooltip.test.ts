import { test, expect } from '@playwright/test';

test.describe('Tooltip component (WCAG 1.4.13)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Tooltip documentation page where there are demos
    await page.goto('/cobogo/docs/components/tooltip');
  });

  test('Tooltip can be dismissed with Escape key without losing focus', async ({ page }) => {
    // Focus the first tooltip trigger (Hover me button)
    const trigger = page.getByRole('button', { name: 'Hover me' }).first();

    // Using keyboard to focus the trigger
    await trigger.focus();

    // The tooltip should become visible and the trigger should get aria-describedby
    await expect(trigger).toHaveAttribute('aria-describedby');

    const describedById = await trigger.getAttribute('aria-describedby');
    expect(describedById).toBeTruthy();

    const tooltip = page.locator(`#${describedById}`);
    await expect(tooltip).toBeVisible();

    // Press Escape to dismiss the tooltip
    await page.keyboard.press('Escape');

    // Tooltip should be hidden, aria-describedby should be removed
    await expect(trigger).not.toHaveAttribute('aria-describedby');

    // Crucially, focus must remain on the trigger (WCAG 1.4.13 requirement)
    await expect(trigger).toBeFocused();
  });

  test('Tooltip is hoverable (WCAG 1.4.13)', async ({ page }) => {
    // Focus the first tooltip trigger (Hover me button)
    const trigger = page.getByRole('button', { name: 'Hover me' }).first();

    // Hover the trigger
    await trigger.hover();

    const describedById = await trigger.getAttribute('aria-describedby');
    expect(describedById).toBeTruthy();

    const tooltip = page.locator(`#${describedById}`);
    await expect(tooltip).toBeVisible();

    // Move mouse over the tooltip
    // We expect it to remain visible and for hover action to be successful
    await tooltip.hover();

    // We ensure the tooltip is still visible after hovering
    await expect(tooltip).toBeVisible();
  });
});
