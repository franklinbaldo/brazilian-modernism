import { test, expect } from '@playwright/test';

test.describe('Form Validation States Visual Governance', () => {
  test('TextInput and Select display invalid styles', async ({ page }) => {
    await page.goto('/cobogo/e2e/validation-states');

    // Wait for components to mount
    await page.waitForSelector('.text-input', { state: 'visible' });

    // 1. Direct invalid prop on TextInput
    const invalidTextInput = page.locator('.text-input.invalid').first();
    await expect(invalidTextInput).toBeVisible();

    // Check computed styles
    const inputBorder = await invalidTextInput.evaluate(el => getComputedStyle(el).borderColor);
    const inputBg = await invalidTextInput.evaluate(el => getComputedStyle(el).backgroundColor);
    const inputText = await invalidTextInput.evaluate(el => getComputedStyle(el).color);

    // rgb(200, 71, 46) is --vermelho, rgb(249, 231, 225) is --vermelho-soft
    expect(inputBorder).toBe('rgb(200, 71, 46)');
    expect(inputBg).toBe('rgb(249, 231, 225)');
    expect(inputText).toBe('rgb(200, 71, 46)');

    // 2. Direct invalid prop on Select
    const invalidSelect = page.locator('.select-input.invalid').first();
    await expect(invalidSelect).toBeVisible();

    // Check computed styles
    const selectBorder = await invalidSelect.evaluate(el => getComputedStyle(el).borderColor);
    const selectBg = await invalidSelect.evaluate(el => getComputedStyle(el).backgroundColor);
    const selectText = await invalidSelect.evaluate(el => getComputedStyle(el).color);

    expect(selectBorder).toBe('rgb(200, 71, 46)');
    expect(selectBg).toBe('rgb(249, 231, 225)');
    expect(selectText).toBe('rgb(200, 71, 46)');

    // 3. Inherited invalid state from FormField context
    const contextInput = page.locator('input[placeholder="Context Invalid Input"]');
    await expect(contextInput).toHaveClass(/invalid/);

    const contextBorder = await contextInput.evaluate(el => getComputedStyle(el).borderColor);
    const contextBg = await contextInput.evaluate(el => getComputedStyle(el).backgroundColor);
    const contextText = await contextInput.evaluate(el => getComputedStyle(el).color);

    expect(contextBorder).toBe('rgb(200, 71, 46)');
    expect(contextBg).toBe('rgb(249, 231, 225)');
    expect(contextText).toBe('rgb(200, 71, 46)');
  });
});
