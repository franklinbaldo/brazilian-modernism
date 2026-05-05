import { test, expect } from '@playwright/test';

test.describe('DatePicker and TimePicker Components', () => {
  test.describe('Vitrine Documentation Tests', () => {
    test('DatePicker is documented', async ({ page }) => {
      await page.goto('/cobogo/docs/components/date-picker');
      await expect(page.locator('h1', { hasText: 'DatePicker' }).first()).toBeVisible();
      // Test basic rendering from demo
      await expect(page.locator('input[type="date"]').first()).toBeVisible();
    });

    test('TimePicker is documented', async ({ page }) => {
      await page.goto('/cobogo/docs/components/time-picker');
      await expect(page.locator('h1', { hasText: 'TimePicker' }).first()).toBeVisible();
      // Test basic rendering from demo
      await expect(page.locator('input[type="time"]').first()).toBeVisible();
    });
  });

  test.describe('Visual and Validation Tests (Vitrine)', () => {
    test('DatePicker rendering and validation styles', async ({ page }) => {
      await page.goto('/cobogo/docs/components/date-picker');

      const inputs = page.locator('input[type="date"]');

      // Basic focus
      const basicInput = inputs.first();
      await basicInput.focus();
      await expect(basicInput).toBeFocused();

      // Ensure invalid input has correct validation class
      // In the DatePicker demo, the third example is the invalid one (with error prop)
      const invalidInput = page.locator('input[type="date"].invalid').first();
      await expect(invalidInput).toBeVisible();
    });

    test('TimePicker rendering and validation styles', async ({ page }) => {
      await page.goto('/cobogo/docs/components/time-picker');

      const inputs = page.locator('input[type="time"]');

      // Basic focus
      const basicInput = inputs.first();
      await basicInput.focus();
      await expect(basicInput).toBeFocused();

      // Ensure invalid input has correct validation class
      const invalidInput = page.locator('input[type="time"].invalid').first();
      await expect(invalidInput).toBeVisible();
    });
  });
});
