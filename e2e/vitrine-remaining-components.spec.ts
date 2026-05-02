import { test, expect } from '@playwright/test';

test.describe('Vitrine Remaining Components Documentation', () => {
  test('Remaining components are documented', async ({ page }) => {
    // Pagination
    await page.goto('/cobogo/docs/components/pagination');
    await expect(page.locator('h1', { hasText: 'Pagination' }).first()).toBeVisible();

    // Alert
    await page.goto('/cobogo/docs/components/alert');
    await expect(page.locator('h1', { hasText: 'Alert' }).first()).toBeVisible();

    // Breadcrumbs
    await page.goto('/cobogo/docs/components/breadcrumbs');
    await expect(page.locator('h1', { hasText: 'Breadcrumbs' }).first()).toBeVisible();

    // Button
    await page.goto('/cobogo/docs/components/button');
    await expect(page.locator('h1', { hasText: 'Button' }).first()).toBeVisible();

    // Card
    await page.goto('/cobogo/docs/components/card');
    await expect(page.locator('h1', { hasText: 'Card' }).first()).toBeVisible();

    // DataTable
    await page.goto('/cobogo/docs/components/data-table');
    await expect(page.locator('h1', { hasText: 'DataTable' }).first()).toBeVisible();

    // FilterBar
    await page.goto('/cobogo/docs/components/filter-bar');
    await expect(page.locator('h1', { hasText: 'FilterBar' }).first()).toBeVisible();

    // Timeline
    await page.goto('/cobogo/docs/components/timeline');
    await expect(page.locator('h1', { hasText: 'Timeline' }).first()).toBeVisible();
  });
});
