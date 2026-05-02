import { test, expect } from '@playwright/test';

test.describe('Validation States (TextInput & Select)', () => {
  test('TextInput and Select should render invalid and valid states correctly', async ({ page }) => {
    await page.goto('/cobogo/docs/components/text-input');

    // Check TextInput Invalid State
    const invalidInput = page.getByRole('textbox', { name: 'Invalid State' });
    await expect(invalidInput).toHaveAttribute('aria-invalid', 'true');
    await expect(invalidInput).toHaveCSS('background-color', 'rgb(249, 231, 225)'); // --vermelho-soft
    await expect(invalidInput).toHaveCSS('border-color', 'rgb(200, 71, 46)'); // --vermelho

    // Check TextInput Valid State
    const validInput = page.getByRole('textbox', { name: 'Valid State', exact: true });
    await expect(validInput).toHaveAttribute('aria-invalid', 'false');
    await expect(validInput).toHaveCSS('background-color', 'rgb(221, 235, 225)'); // --verde-soft
    await expect(validInput).toHaveCSS('border-color', 'rgb(46, 107, 74)'); // --verde

    await page.goto('/cobogo/docs/components/select');

    // Check Select Invalid State
    const invalidSelect = page.getByRole('combobox', { name: 'Invalid State' });
    await expect(invalidSelect).toHaveAttribute('aria-invalid', 'true');
    await expect(invalidSelect).toHaveCSS('background-color', 'rgb(249, 231, 225)'); // --vermelho-soft
    await expect(invalidSelect).toHaveCSS('border-color', 'rgb(200, 71, 46)'); // --vermelho

    // Check Select Valid State
    const validSelect = page.getByRole('combobox', { name: 'Valid State', exact: true });
    await expect(validSelect).toHaveAttribute('aria-invalid', 'false');
    await expect(validSelect).toHaveCSS('background-color', 'rgb(221, 235, 225)'); // --verde-soft
    await expect(validSelect).toHaveCSS('border-color', 'rgb(46, 107, 74)'); // --verde
  });
});
