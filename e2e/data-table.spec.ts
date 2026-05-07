import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('DataTable Governance', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 800 }
  ];

  for (const viewport of viewports) {
    test.describe(`Viewport: ${viewport.name}`, () => {
      test.use({ viewport });

      test.beforeEach(async ({ page }) => {
        await page.goto('/cobogo/docs/components/data-table');
        // Wait for the specific data table component to be visible in the demo
        await expect(page.locator('.demo-container [data-table]').first()).toBeVisible();
      });

      test('should maintain visual stability', async ({ page }) => {
        const demoContainer = page.locator('.demo-container').first();
        // Wait for fonts/styles to stabilize
        await page.waitForTimeout(500);

        await expect(demoContainer).toHaveScreenshot(`data-table-demo-${viewport.name}.png`, {
           maxDiffPixelRatio: 0.05
        });
      });
    });
  }

  test.describe('Accessibility & Focus', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/cobogo/docs/components/data-table');
      // Wait for the specific data table component to be visible in the demo
      await expect(page.locator('.demo-container [data-table]').first()).toBeVisible();
    });

    test('should pass automated accessibility checks', async ({ page }) => {
      // Disabling typical documentation-shell related rules.
      const accessibilityScanResults = await new AxeBuilder({ page })
        .disableRules(['heading-order', 'landmark-unique', 'region', 'page-has-heading-one', 'listitem', 'aria-allowed-role', 'color-contrast', 'landmark-complementary-is-top-level'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should be keyboard focusable (WCAG 2.1.1/2.1.3)', async ({ page }) => {
      const tableContainer = page.locator('.demo-container [data-table]').first();

      // Check if the container has tabindex="0"
      await expect(tableContainer).toHaveAttribute('tabindex', '0');

      // Simulate keyboard navigation to focus the table
      await tableContainer.focus();

      // Evaluate if the element is currently the active element in the document
      const isFocused = await tableContainer.evaluate((node) => document.activeElement === node);
      expect(isFocused).toBeTruthy();
    });
  });
});
