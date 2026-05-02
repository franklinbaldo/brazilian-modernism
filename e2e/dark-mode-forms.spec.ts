import { test, expect } from '@playwright/test';

function luminance(r: number, g: number, b: number) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrast(rgb1: number[], rgb2: number[]) {
  const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function parseRgb(rgbStr: string) {
  const match = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return [0, 0, 0];
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

test.describe('Form Controls Dark Mode Contrast', () => {
  test('Form elements maintain WCAG AA contrast in dark mode', async ({ page }) => {
    await page.goto('/cobogo/e2e/validation-states');

    // Wait for components to mount
    await page.waitForSelector('.text-input', { state: 'visible' });

    // Force Dark Mode on
    await page.evaluate(() => {
      document.documentElement.classList.add('dark-mode');
    });

    // To test a normal input we can just look at the focus styles of the TextInput since
    // it's focus color that has the issue, or we can use evaluate to create a normal input.
    await page.evaluate(() => {
        const input = document.createElement('input');
        input.className = 'text-input test-normal-input';
        document.body.appendChild(input);
    });

    const normalInput = page.locator('.test-normal-input');
    await expect(normalInput).toBeVisible();

    const inputStyles = await normalInput.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return { border: computed.borderColor, bg: computed.backgroundColor };
    });

    const contrast = getContrast(parseRgb(inputStyles.border), parseRgb(inputStyles.bg));
    console.log('Border vs BG Contrast:', contrast);
    expect(contrast).toBeGreaterThanOrEqual(3);

    await normalInput.focus();
    const focusStyles = await normalInput.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return { outline: computed.outlineColor, bg: computed.backgroundColor };
    });
    const focusContrast = getContrast(parseRgb(focusStyles.outline), parseRgb(focusStyles.bg));
    console.log('Focus Ring vs BG Contrast:', focusContrast);
    expect(focusContrast).toBeGreaterThanOrEqual(3);
  });
});
