import { test, expect } from '@playwright/test';

test.describe('Notification Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the component's docs page where examples are rendered
    await page.goto('/cobogo/docs/components/notification/');
  });

  test('renders with different intents', async ({ page }) => {
    // Check for different intents by looking at the text content of the notifications
    await expect(page.locator('text="Update Available"').first()).toBeVisible();
    await expect(page.locator('text="Report Generated"').first()).toBeVisible();
    await expect(page.locator('text="Connection Lost"').first()).toBeVisible();
    await expect(page.locator('text="Payment Failed"').first()).toBeVisible();
  });

  test('provides correct ARIA roles', async ({ page }) => {
    const infoNotification = page.locator('.br-notification--info').first();
    await expect(infoNotification).toHaveAttribute('role', 'status');
    await expect(infoNotification).toHaveAttribute('aria-live', 'polite');

    const dangerNotification = page.locator('.br-notification--danger').first();
    await expect(dangerNotification).toHaveAttribute('role', 'alert');
    await expect(dangerNotification).toHaveAttribute('aria-live', 'assertive');
  });

  test('auto-dismisses and pauses on hover', async ({ page }) => {
    // Locate the auto-dismissing notification
    const notification = page.locator('.br-notification', { hasText: 'Auto-dismissing' }).first();
    await expect(notification).toBeVisible();

    // Hover over the notification to pause the timer
    await notification.hover();

    // Wait for 5 seconds (the original timeout)
    await page.waitForTimeout(5000);

    // Assert it is still visible because it was paused
    await expect(notification).toBeVisible();

    // Remove hover to resume timer by moving mouse far away
    await page.mouse.move(0, 0);

    // Wait for remaining time + buffer
    await page.waitForTimeout(5500);

    // Assert it is dismissed
    await expect(notification).toBeHidden();
  });

  test('auto-dismisses and pauses on focus', async ({ page }) => {
    // Reload page to reset notifications
    await page.goto('/cobogo/docs/components/notification/');

    // Locate the auto-dismissing notification
    const notification = page.locator('.br-notification', { hasText: 'Auto-dismissing' }).first();
    await expect(notification).toBeVisible();

    // Focus the notification to pause the timer
    await notification.focus();

    // Wait for 5 seconds (the original timeout)
    await page.waitForTimeout(5000);

    // Assert it is still visible because it was paused
    await expect(notification).toBeVisible();

    // Remove focus to resume timer
    await notification.blur();

    // Wait for remaining time + buffer
    await page.waitForTimeout(5500);

    // Assert it is dismissed
    await expect(notification).toBeHidden();
  });
});
