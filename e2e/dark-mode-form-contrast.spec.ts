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

test.describe('Dark Mode Contrast for Form Elements', () => {
  test('TextInput, Select, and MultiSelect borders maintain WCAG AA non-text contrast in dark mode', async ({ page }) => {
    // Navigate to the test page
    await page.goto('/cobogo/e2e/dark-mode-forms');

    // Force Dark Mode on
    await page.evaluate(() => {
      document.documentElement.classList.add('dark-mode');
    });

    const textInput = page.locator('#test-text-input');
    const select = page.locator('#test-select');
    const multiselectTrigger = page.locator('#test-multiselect .multiselect-trigger');

    await expect(textInput).toBeVisible();
    await expect(select).toBeVisible();
    await expect(multiselectTrigger).toBeVisible();

    // -- BORDER CONTRAST TESTS --

    // Check TextInput contrast
    const textInputStyles = await textInput.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return { bg: computed.backgroundColor, border: computed.borderColor };
    });

    const textInputContrast = getContrast(parseRgb(textInputStyles.bg), parseRgb(textInputStyles.border));
    // WCAG Non-text contrast ratio is 3:1
    expect(textInputContrast).toBeGreaterThanOrEqual(3.0);

    // Check Select contrast
    const selectStyles = await select.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return { bg: computed.backgroundColor, border: computed.borderColor };
    });

    const selectContrast = getContrast(parseRgb(selectStyles.bg), parseRgb(selectStyles.border));
    expect(selectContrast).toBeGreaterThanOrEqual(3.0);

    // Check MultiSelect contrast
    const multiselectStyles = await multiselectTrigger.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return { bg: computed.backgroundColor, border: computed.borderColor };
    });

    const multiselectContrast = getContrast(parseRgb(multiselectStyles.bg), parseRgb(multiselectStyles.border));
    expect(multiselectContrast).toBeGreaterThanOrEqual(3.0);

    // -- FOCUS RING CONTRAST TESTS --

    // Check TextInput focus
    await textInput.focus();
    const textInputFocusStyles = await textInput.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      // We assume outline color provides the visual boundary, or border if it changes.
      // But standard cobogó uses outline: 2px solid var(--focus-ring).
      return { bg: computed.backgroundColor, outline: computed.outlineColor };
    });

    const textInputFocusContrast = getContrast(parseRgb(textInputFocusStyles.bg), parseRgb(textInputFocusStyles.outline));
    expect(textInputFocusContrast).toBeGreaterThanOrEqual(3.0);

    // Check Select focus
    await select.focus();
    const selectFocusStyles = await select.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return { bg: computed.backgroundColor, outline: computed.outlineColor };
    });

    const selectFocusContrast = getContrast(parseRgb(selectFocusStyles.bg), parseRgb(selectFocusStyles.outline));
    expect(selectFocusContrast).toBeGreaterThanOrEqual(3.0);

    // Check MultiSelect focus
    await multiselectTrigger.focus();
    const multiselectFocusStyles = await multiselectTrigger.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return { bg: computed.backgroundColor, outline: computed.outlineColor };
    });

    const multiselectFocusContrast = getContrast(parseRgb(multiselectFocusStyles.bg), parseRgb(multiselectFocusStyles.outline));
    expect(multiselectFocusContrast).toBeGreaterThanOrEqual(3.0);
  });
});
