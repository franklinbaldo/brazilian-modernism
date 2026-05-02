import { test, expect } from '@playwright/test';

test.describe('MultiSelect component', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the MultiSelect docs page which acts as our vitrine/showcase
    await page.goto('http://localhost:4321/cobogo/docs/components/multi-select');
  });

  test('Toggling the dropdown menu', async ({ page }) => {
    // Wait for hydration
    await page.waitForTimeout(500);

    // Select the first combobox (Default example)
    const trigger = page.locator('.multiselect-trigger[role="combobox"]').first();
    const wrapper = trigger.locator('xpath=ancestor::div[contains(@class, "multiselect-wrapper")]');
    const listbox = wrapper.locator('.dropdown-menu[role="listbox"]');

    // Initially hidden
    await expect(listbox).not.toBeVisible();

    // Open
    await trigger.click();
    await expect(listbox).toBeVisible();

    // Close
    await trigger.click();
    await expect(listbox).not.toBeVisible();
  });

  test('Selecting an option', async ({ page }) => {
    await page.waitForTimeout(500);
    const trigger = page.locator('.multiselect-trigger[role="combobox"]').first();
    const wrapper = trigger.locator('xpath=ancestor::div[contains(@class, "multiselect-wrapper")]');
    const listbox = wrapper.locator('.dropdown-menu[role="listbox"]');

    await trigger.click();
    await expect(listbox).toBeVisible();

    const optionA = listbox.locator('label.dropdown-item', { hasText: 'Opção A' }).first();
    await optionA.click();

    // The option "A" is selected and visible as a badge inside the selected-items area
    const badge = trigger.locator('.selected-items').locator('text=Opção A').first();
    await expect(badge).toBeVisible();
  });

  test('Removing an option', async ({ page }) => {
    await page.waitForTimeout(500);
    const trigger = page.locator('.multiselect-trigger[role="combobox"]').first();
    const wrapper = trigger.locator('xpath=ancestor::div[contains(@class, "multiselect-wrapper")]');
    const listbox = wrapper.locator('.dropdown-menu[role="listbox"]');

    // First, select option A
    await trigger.click();
    await listbox.locator('label.dropdown-item', { hasText: 'Opção A' }).first().click();
    // Close it so we don't interfere
    await trigger.click();

    // Then remove it
    const removeBtn = trigger.locator('.selected-items').locator('button[aria-label="Remove Opção A"]');
    await removeBtn.click();

    // The badge should no longer be in the document
    await expect(trigger.locator('.selected-items').locator('text=Opção A')).not.toBeVisible();
  });

  test('Searching options', async ({ page }) => {
    await page.waitForTimeout(500);
    // The second multiselect on the page is the searchable one
    const trigger = page.locator('.multiselect-trigger[role="combobox"]').nth(1);
    const wrapper = trigger.locator('xpath=ancestor::div[contains(@class, "multiselect-wrapper")]');
    const searchInput = trigger.locator('input[type="text"].search-input');

    await searchInput.fill('Bahia');

    // Dropdown listbox should open automatically or we click
    await trigger.click();

    const listbox = wrapper.locator('.dropdown-menu[role="listbox"]');
    await expect(listbox).toBeVisible();

    // Should show Bahia
    await expect(listbox.locator('label.dropdown-item', { hasText: 'Bahia' })).toBeVisible();
    // Should NOT show São Paulo
    await expect(listbox.locator('label.dropdown-item', { hasText: 'São Paulo' })).not.toBeVisible();
  });

  test('FormField context integration', async ({ page }) => {
    await page.waitForTimeout(500);
    // Look at the documentation source again for the third element
    await expect(page.locator('span', { hasText: 'Você precisa selecionar pelo menos uma categoria.' }).first()).toBeVisible();
  });
});
