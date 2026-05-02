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

test.describe('Dark Mode Contrast in Layered Organisms', () => {
  test('Dialog, Drawer, and Notification maintain WCAG AA contrast in dark mode', async ({ page }) => {
    await page.goto('/cobogo/e2e/dark-mode');

    const dialog = page.locator('dialog.cobogo-dialog');
    const drawer = page.locator('dialog.cobogo-drawer');
    const notificationInfo = page.locator('.br-notification--info').first();
    // Danger test removed since _DarkModeTest.svelte only has an info notification

    await expect(dialog).toBeVisible();
    await expect(notificationInfo).toBeVisible();

    // Force Dark Mode on
    await page.evaluate(() => {
      document.documentElement.classList.add('dark-mode');
    });

    // Check Dialog Contrast
    const dialogStyles = await dialog.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return { bg: computed.backgroundColor, color: computed.color };
    });

    const dialogContrast = getContrast(parseRgb(dialogStyles.bg), parseRgb(dialogStyles.color));
    expect(dialogContrast).toBeGreaterThanOrEqual(4.5);

    // Check Notification Info Contrast
    const infoTitleStyles = await notificationInfo.locator('.br-notification__title').evaluate((el) => {
      const parent = el.closest('.br-notification');
      const parentComputed = window.getComputedStyle(parent!);
      const computed = window.getComputedStyle(el);
      return { bg: parentComputed.backgroundColor, color: computed.color };
    });

    const infoTitleContrast = getContrast(parseRgb(infoTitleStyles.bg), parseRgb(infoTitleStyles.color));
    expect(infoTitleContrast).toBeGreaterThanOrEqual(4.5);

    // Check Notification Info Accent Strip Color (verify it resolves to the vibrant base variable)
    const infoStripStyles = await notificationInfo.evaluate((el) => {
      const beforeComputed = window.getComputedStyle(el, '::before');
      return { accent: beforeComputed.backgroundColor };
    });

    // Dark mode --azul resolves to #1B2B4B -> rgb(27, 43, 75)
    // The design constraint asserts the primary colors remain unchanged.
    expect(infoStripStyles.accent).toBe('rgb(27, 43, 75)');

    // Check Drawer Contrast
    const drawerStyles = await drawer.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return { bg: computed.backgroundColor, color: computed.color };
    });

    const drawerContrast = getContrast(parseRgb(drawerStyles.bg), parseRgb(drawerStyles.color));
    expect(drawerContrast).toBeGreaterThanOrEqual(4.5);
  });
});
