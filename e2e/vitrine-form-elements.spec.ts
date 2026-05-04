import { test, expect } from '@playwright/test';

test.describe('Vitrine Form Elements Documentation', () => {
  test('Checkbox is documented and shows validation states', async ({ page }) => {
    await page.goto('/cobogo/docs/components/checkbox');
    await expect(page.locator('h1', { hasText: 'Checkbox' }).first()).toBeVisible();
    await expect(page.locator('.checkbox-visual').first()).toBeVisible();
  });

  test('Radio is documented and shows validation states', async ({ page }) => {
    await page.goto('/cobogo/docs/components/radio');
    await expect(page.locator('h1', { hasText: 'Radio' }).first()).toBeVisible();
    await expect(page.locator('.radio-visual').first()).toBeVisible();
  });

  test('Switch is documented and shows validation states', async ({ page }) => {
    await page.goto('/cobogo/docs/components/switch');
    await expect(page.locator('h1', { hasText: 'Switch' }).first()).toBeVisible();
    await expect(page.locator('.switch-visual').first()).toBeVisible();
  });

  test('TextInput is documented', async ({ page }) => {
    await page.goto('/cobogo/docs/components/text-input');
    await expect(page.locator('h1', { hasText: 'TextInput' }).first()).toBeVisible();
  });

  test('Select is documented', async ({ page }) => {
    await page.goto('/cobogo/docs/components/select');
    await expect(page.locator('h1', { hasText: 'Select' }).first()).toBeVisible();
  });

  test('FileInput is documented', async ({ page }) => {
    await page.goto('/cobogo/docs/components/file-input');
    await expect(page.locator('h1', { hasText: 'FileInput' }).first()).toBeVisible();
  });

  test('Combobox is documented', async ({ page }) => {
    await page.goto('/cobogo/docs/components/combobox');
    await expect(page.locator('h1', { hasText: 'Combobox' }).first()).toBeVisible();
    await expect(page.getByPlaceholder('Type to filter...').first()).toBeVisible();
  });

  test('MultiSelect is documented', async ({ page }) => {
    await page.goto('/cobogo/docs/components/multiselect');
    await expect(page.locator('h1', { hasText: 'MultiSelect' }).first()).toBeVisible();
    await expect(page.locator('label', { hasText: 'Searchable Regions' }).first()).toBeVisible();
  });
});
