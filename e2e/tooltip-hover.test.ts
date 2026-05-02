import { test, expect } from '@playwright/test';

test.describe('Tooltip Hoverable Content (WCAG 1.4.13)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cobogo/e2e/tooltip-hover');
  });

  test('Tooltip remains visible when moving pointer to the tooltip content', async ({ page }) => {
    // Locate the trigger
    const trigger = page.locator('#tooltip-trigger');

    // Hover over the trigger
    await trigger.hover();

    // The tooltip should become visible
    const tooltip = page.locator('role=tooltip');
    await expect(tooltip).toBeVisible();

    // Move the mouse directly onto the tooltip content
    await tooltip.hover();

    // The tooltip should STILL be visible (WCAG 1.4.13 requires it to be hoverable)
    await expect(tooltip).toBeVisible();
  });

  test('Tooltip is dismissible via Escape key without losing focus', async ({ page }) => {
    // Locate the trigger
    const trigger = page.locator('#tooltip-trigger');

    // Focus the trigger to open the tooltip
    await trigger.focus();

    const tooltip = page.locator('role=tooltip');
    await expect(tooltip).toBeVisible();

    // Press the Escape key
    await page.keyboard.press('Escape');

    // The tooltip should be hidden
    await expect(tooltip).toBeHidden();

    // Focus should remain on the trigger element
    await expect(trigger).toBeFocused();
  });
});
