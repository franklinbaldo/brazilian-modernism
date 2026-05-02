import { test, expect } from '@playwright/test';

test.describe('MultiSelect component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cobogo/docs/components/multiselect');
  });

  test('Toggling the dropdown menu', async ({ page }) => {
    // Basic MultiSelect is the first one
    const trigger = page.locator('.multiselect-trigger').first();
    const listbox = page.locator('.dropdown-menu').first();

    await expect(listbox).toBeHidden();

    await trigger.click();
    await expect(listbox).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await trigger.click();
    await expect(listbox).toBeHidden();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('Selecting an option', async ({ page }) => {
    const trigger = page.locator('.multiselect-trigger').first();

    await trigger.click();

    const listbox = page.locator('.dropdown-menu').filter({ state: 'visible' }).first();
    const option = listbox.locator('label.dropdown-item').filter({ hasText: 'São Paulo' }).first();
    // Use Force click because it might be obscured by animation or overlapping elements
    await option.click({ force: true });

    const badge = trigger.locator('.concrete-badge').filter({ hasText: 'São Paulo' });
    await expect(badge).toBeVisible();
  });

  test('Removing an option', async ({ page }) => {
    const trigger = page.locator('.multiselect-trigger').first();

    await trigger.click();

    const listbox = page.locator('.dropdown-menu').filter({ state: 'visible' }).first();
    const option = listbox.locator('label.dropdown-item').filter({ hasText: 'São Paulo' }).first();
    await option.click({ force: true });

    const badge = trigger.locator('.concrete-badge').filter({ hasText: 'São Paulo' });
    await expect(badge).toBeVisible();

    const removeBtn = badge.locator('.remove-btn');
    await removeBtn.click();

    await expect(badge).toBeHidden();
  });

  test('Searching options', async ({ page }) => {
    const trigger = page.locator('.multiselect-trigger').nth(1);

    await trigger.click();

    const listbox = page.locator('.dropdown-menu').filter({ state: 'visible' }).first();
    const input = trigger.locator('.search-input');

    await input.fill('Minas');

    const optionMG = listbox.locator('label.dropdown-item').filter({ hasText: 'Minas Gerais' }).first();
    await expect(optionMG).toBeVisible();

    const optionSP = listbox.locator('label.dropdown-item').filter({ hasText: 'São Paulo' });
    await expect(optionSP).toBeHidden();
  });

  test('FormField context integration', async ({ page }) => {
    // The "Validation State" section has the FormField wrapper with error
    const wrapper = page.locator('.multiselect-wrapper.invalid').first();
    await expect(wrapper).toBeVisible();

    await expect(wrapper).toHaveClass(/invalid/);
  });
});
