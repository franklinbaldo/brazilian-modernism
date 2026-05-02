import { test, expect } from '@playwright/test';

test('Select with placeholder visually indicates invalid state', async ({ page }) => {
  await page.goto('/cobogo/docs/components/select');

  // Wait for page load
  await page.waitForSelector('.select-input', { state: 'visible' });

  // Locate the invalid Select with a placeholder (should have the invalid class)
  const invalidSelect = page.locator('.select-input.invalid').first();
  await expect(invalidSelect).toBeVisible();

  // Check background and border colors using getComputedStyle
  const border = await invalidSelect.evaluate(el => getComputedStyle(el).borderColor);
  const bg = await invalidSelect.evaluate(el => getComputedStyle(el).backgroundColor);
  const text = await invalidSelect.evaluate(el => getComputedStyle(el).color);

  // expect border to be --vermelho (rgb(200, 71, 46))
  expect(border).toBe('rgb(200, 71, 46)');
  // expect bg to be --vermelho-soft (rgb(249, 231, 225))
  expect(bg).toBe('rgb(249, 231, 225)');
  // expect color to be --vermelho (rgb(200, 71, 46))
  expect(text).toBe('rgb(200, 71, 46)');
});
