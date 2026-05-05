import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Composition Wall - Visual Governance', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 800 }
  ];

  for (const viewport of viewports) {
    test(`Composition Page Viewport: ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      // Load the composition page
      await page.goto('/cobogo/composition');
      await page.waitForLoadState('networkidle');

      // Wait a moment for any styling to finish applying
      await page.waitForTimeout(1000);

      // Run axe accessibility check
      const accessibilityScanResults = await new AxeBuilder({ page }).disableRules(['aria-hidden-focus']).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);

      // Take a full-page snapshot
      await expect(page).toHaveScreenshot(`composition-wall-${viewport.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05
      });
    });
  }
});

test.describe('Doctrine Operational Rules - Modularity that breathes', () => {
  test('Composition Wall uses Grid with correct gap', async ({ page }) => {
    await page.goto('/cobogo/composition');
    await page.waitForLoadState('networkidle');

    // Assert that the grid element exists
    const grid = page.locator('.cobogo-grid').first();
    await expect(grid).toBeVisible();

    // Assert that the computed gap is 32px (equivalent to 2rem)
    const gap = await grid.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('gap');
    });

    expect(gap).toBe('32px');
  });
});
