import { test, expect } from '@playwright/test';

test.describe('Form Controls Dark Mode and Validation', () => {
  test('Form components show invalid states in dark mode correctly', async ({ page }) => {
    // Go to the form documentation page which has form components
    await page.goto('/cobogo/docs/components/form');

    // Make sure we are in light mode initially
    await page.evaluate(() => document.documentElement.classList.remove('dark-mode'));

    // Verify invalid inputs exist on page (from the "Form-Level Errors" example)
    const invalidInputs = page.locator('.text-input.invalid');
    await expect(invalidInputs.first()).toBeVisible();

    // Check light mode background (vermelho-soft)
    const lightBg = await invalidInputs.first().evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Toggle dark mode
    await page.evaluate(() => document.documentElement.classList.add('dark-mode'));

    // Check dark mode background (vermelho-soft dark variant)
    const darkBg = await invalidInputs.first().evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // The backgrounds should be different
    expect(lightBg).not.toBe(darkBg);

    // We expect the dark variant to be #4A1A0F (rgb(74, 26, 15))
    expect(darkBg).toBe('rgb(74, 26, 15)');

    // The border should be vermelho in both cases (rgb(200, 71, 46))
    const darkBorder = await invalidInputs.first().evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
    expect(darkBorder).toBe('rgb(200, 71, 46)');
  });
});
