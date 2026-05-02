import { test, expect } from '@playwright/test';

test.describe('Advanced Form Controls Validation States', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cobogo/e2e/advanced-validation-states');
  });

  test('Invalid states display correctly', async ({ page }) => {
    const invalidSection = page.locator('#invalid-states');

    // Check DatePicker
    const datePicker = invalidSection.locator('input[type="date"]');
    await expect(datePicker).toHaveClass(/invalid/);
    await expect(datePicker).toHaveAttribute('aria-invalid', 'true');
    await expect(datePicker).toHaveCSS('border-color', 'rgb(200, 71, 46)'); // --vermelho

    // Check Combobox (using specific class since TextInput wraps it)
    const comboboxInput = invalidSection.locator('input.text-input').first();
    await expect(comboboxInput).toHaveClass(/invalid/);
    await expect(comboboxInput).toHaveAttribute('aria-invalid', 'true');

    // MultiSelect (trigger wrapper)
    const multiSelectWrapper = invalidSection.locator('.multiselect-wrapper');
    await expect(multiSelectWrapper).toHaveClass(/invalid/);
  });

  test('Valid states display correctly', async ({ page }) => {
    const validSection = page.locator('#valid-states');

    // Check DatePicker
    const datePicker = validSection.locator('input[type="date"]');
    await expect(datePicker).toHaveClass(/valid/);
    await expect(datePicker).toHaveCSS('border-color', 'rgb(46, 107, 74)'); // --verde

    // Check Combobox
    const comboboxInput = validSection.locator('input.text-input').first();
    await expect(comboboxInput).toHaveClass(/valid/);

    // MultiSelect (trigger wrapper)
    const multiSelectWrapper = validSection.locator('.multiselect-wrapper');
    await expect(multiSelectWrapper).toHaveClass(/valid/);
  });
});
