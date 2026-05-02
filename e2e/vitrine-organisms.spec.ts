import { test, expect } from '@playwright/test';

test.describe('Vitrine Organism Documentation', () => {
  test('Modal organisms are documented', async ({ page }) => {
    // Navigate to the components documentation section (or just start from Dialog page directly for speed)
    await page.goto('/cobogo/docs/components/dialog');

    // Then I should find a dedicated page for "Dialog"
    await expect(page.locator('h1', { hasText: 'Dialog' }).first()).toBeVisible();

    // And the documentation should explain focus trapping compliance with WCAG 2.1.2
    await expect(page.locator('text=WCAG 2.1.2').first()).toBeVisible();

    // And the documentation should include interactive examples (DialogDemo)
    await expect(page.locator('button', { hasText: 'Open Modal Demo' }).first()).toBeVisible();


    // And I should find a dedicated page for "Drawer"
    await page.goto('/cobogo/docs/components/drawer');

    await expect(page.locator('h1', { hasText: 'Drawer' }).first()).toBeVisible();

    // And the documentation should explain focus trapping compliance with WCAG 2.1.2
    await expect(page.locator('text=WCAG 2.1.2')).toBeVisible();

    // And the documentation should include interactive examples (DrawerDemo)
    await expect(page.locator('button', { hasText: 'Open Right Drawer' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Open Left Drawer' })).toBeVisible();
  });
});
