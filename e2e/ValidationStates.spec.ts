import { test, expect } from '@playwright/test';

test.describe('Validation States', () => {
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

  test('Checkbox, Radio, and Switch should render invalid and valid states correctly', async ({ page }) => {
    await page.goto('/cobogo/e2e/validation-states');

    // --- Checkbox ---
    const invalidCheckbox = page.locator('.test-row', { hasText: 'Checkbox Invalid' }).locator('.checkbox-visual');
    await expect(invalidCheckbox).toHaveCSS('background-color', 'rgb(249, 231, 225)'); // --vermelho-soft
    await expect(invalidCheckbox).toHaveCSS('border-color', 'rgb(200, 71, 46)'); // --vermelho

    const validCheckbox = page.locator('.test-row', { hasText: 'Checkbox Valid' }).locator('.checkbox-visual');
    await expect(validCheckbox).toHaveCSS('background-color', 'rgb(221, 235, 225)'); // --verde-soft
    await expect(validCheckbox).toHaveCSS('border-color', 'rgb(46, 107, 74)'); // --verde

    // --- Switch ---
    const invalidSwitch = page.locator('.test-row', { hasText: 'Switch Invalid' }).locator('.switch-visual');
    await expect(invalidSwitch).toHaveCSS('background-color', 'rgb(249, 231, 225)'); // --vermelho-soft
    await expect(invalidSwitch).toHaveCSS('border-color', 'rgb(200, 71, 46)'); // --vermelho

    const validSwitch = page.locator('.test-row', { hasText: 'Switch Valid' }).locator('.switch-visual');
    await expect(validSwitch).toHaveCSS('background-color', 'rgb(221, 235, 225)'); // --verde-soft
    await expect(validSwitch).toHaveCSS('border-color', 'rgb(46, 107, 74)'); // --verde

    // --- OptionGroup -> Radio ---
    // The optiongroup test has 2 radios. Let's check the first one's visual container.
    const invalidRadioGroup = page.locator('#optiongroup-invalid-test');

    // First radio is checked (value="1"). It should have a red border and red background (for the dot/checked state)
    // Wait, let's look at Checkbox/Radio CSS rules when valid/invalid AND checked:
    // .invalid input:checked + .radio-visual { border-color: var(--vermelho); }
    // .invalid input:checked + .radio-visual .radio-dot { background-color: var(--vermelho); }
    const firstRadioVisual = invalidRadioGroup.locator('.radio-visual').nth(0);
    await expect(firstRadioVisual).toHaveCSS('border-color', 'rgb(200, 71, 46)'); // --vermelho
    const firstRadioDot = invalidRadioGroup.locator('.radio-dot').nth(0);
    await expect(firstRadioDot).toHaveCSS('background-color', 'rgb(200, 71, 46)'); // --vermelho

    // Second radio is NOT checked. It should have a red-soft background and red border.
    const secondRadioVisual = invalidRadioGroup.locator('.radio-visual').nth(1);
    await expect(secondRadioVisual).toHaveCSS('background-color', 'rgb(249, 231, 225)'); // --vermelho-soft
    await expect(secondRadioVisual).toHaveCSS('border-color', 'rgb(200, 71, 46)'); // --vermelho
  });
});
