import { test, expect } from '@playwright/test';

test.describe('Composition Wall - Visual Regression', () => {
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

      // Take a full-page snapshot
      await expect(page).toHaveScreenshot(`composition-wall-${viewport.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05
      });
    });
  }
});
