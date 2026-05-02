import { test, expect } from '@playwright/test';

test.describe('Vitrine Form Atoms Documentation', () => {
  test('Form atoms are documented', async ({ page }) => {
    // Checkbox
    await page.goto('/cobogo/docs/components/checkbox');
    await expect(page.locator('h1', { hasText: 'Checkbox' }).first()).toBeVisible();
    await expect(page.locator('text=Standard Checkbox').first()).toBeVisible();

    // Radio
    await page.goto('/cobogo/docs/components/radio');
    await expect(page.locator('h1', { hasText: 'Radio' }).first()).toBeVisible();
    await expect(page.locator('text=Standard Radio').first()).toBeVisible();

    // Switch
    await page.goto('/cobogo/docs/components/switch');
    await expect(page.locator('h1', { hasText: 'Switch' }).first()).toBeVisible();
    await expect(page.locator('text=Standard Switch').first()).toBeVisible();
  });
});
