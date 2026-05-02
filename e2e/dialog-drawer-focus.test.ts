import { test, expect } from '@playwright/test';

test.describe('Focus trapping in Overlays', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cobogo/e2e/dialog-drawer-focus');
  });

  test('Dialog traps focus correctly', async ({ page }) => {
    // 1. Open the dialog
    await page.click('#open-dialog');
    await expect(page.locator('dialog[aria-label="Test Dialog"]')).toBeVisible();

    // 2. Wait for transitions (just to be safe)
    await page.waitForTimeout(300);

    // 3. Tab through elements.
    await page.locator('.cobogo-dialog-close').focus();
    await expect(page.locator('.cobogo-dialog-close')).toBeFocused();

    // Tab to next (dialog-input-1)
    await page.keyboard.press('Tab');
    await expect(page.locator('#dialog-input-1')).toBeFocused();

    // Tab to next (dialog-input-2)
    await page.keyboard.press('Tab');
    await expect(page.locator('#dialog-input-2')).toBeFocused();

    // Tab to next (dialog-cancel)
    await page.keyboard.press('Tab');
    await expect(page.locator('#dialog-cancel')).toBeFocused();

    // Tab to last (dialog-confirm)
    await page.keyboard.press('Tab');
    await expect(page.locator('#dialog-confirm')).toBeFocused();

    // Tab from last SHOULD cycle back to the first element (the close button)
    await page.keyboard.press('Tab');
    await expect(page.locator('.cobogo-dialog-close')).toBeFocused();

    // Shift+Tab from first SHOULD cycle to the last element
    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('#dialog-confirm')).toBeFocused();

    // Verify background elements are NOT focused
    await expect(page.locator('#background-button-1')).not.toBeFocused();
    await expect(page.locator('#background-link')).not.toBeFocused();
  });

  test('Drawer traps focus correctly', async ({ page }) => {
    // 1. Open the drawer
    await page.click('#open-drawer');
    await expect(page.locator('dialog[aria-label="Test Drawer"]')).toBeVisible();

    // 2. Wait for transitions
    await page.waitForTimeout(300);

    // 3. Force focus to the first element
    await page.locator('.cobogo-drawer-close').focus();
    await expect(page.locator('.cobogo-drawer-close')).toBeFocused();

    // Tab to last element
    await page.keyboard.press('Tab'); // input-1
    await page.keyboard.press('Tab'); // input-2
    await page.keyboard.press('Tab'); // cancel
    await page.keyboard.press('Tab'); // confirm
    await expect(page.locator('#drawer-confirm')).toBeFocused();

    // Tab from last SHOULD cycle back to first
    await page.keyboard.press('Tab');
    await expect(page.locator('.cobogo-drawer-close')).toBeFocused();

    // Shift+Tab from first SHOULD cycle to last
    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('#drawer-confirm')).toBeFocused();
  });

  test('Dialog focus trap pulls focus back if it escapes to the body', async ({ page }) => {
    await page.click('#open-dialog');
    await expect(page.locator('dialog[aria-label="Test Dialog"]')).toBeVisible();
    await page.waitForTimeout(300);

    // Programmatically blur the active element so focus goes to the body
    await page.evaluate(() => {
      (document.activeElement as HTMLElement)?.blur();
    });

    // Press Tab. The trap should catch it and focus the first element.
    await page.keyboard.press('Tab');

    // Check that background element is not focused
    await expect(page.locator('#background-button-1')).not.toBeFocused();
    // And that something inside the dialog IS focused (e.g. close button)
    await expect(page.locator('.cobogo-dialog-close')).toBeFocused();

    // Same for Shift+Tab
    await page.evaluate(() => {
      (document.activeElement as HTMLElement)?.blur();
    });

    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('#background-button-2')).not.toBeFocused();
    await expect(page.locator('#dialog-confirm')).toBeFocused();
  });
});
