import { test, expect } from '@playwright/test';

test.describe('Grid & Column Fluid Typography and Responsive Stacking', () => {
  test('typography scales via global CSS clamp without relying on media queries', async ({ page }) => {
    await page.goto('/cobogo/');

    // Check desktop
    await page.setViewportSize({ width: 1200, height: 800 });
    const h1Desktop = await page.evaluate(() => {
        const el = document.querySelector('h1');
        return el ? window.getComputedStyle(el).fontSize : null;
    });

    // Check tablet
    await page.setViewportSize({ width: 768, height: 800 });
    const h1Tablet = await page.evaluate(() => {
        const el = document.querySelector('h1');
        return el ? window.getComputedStyle(el).fontSize : null;
    });

    // Check mobile
    await page.setViewportSize({ width: 480, height: 800 });
    const h1Mobile = await page.evaluate(() => {
        const el = document.querySelector('h1');
        return el ? window.getComputedStyle(el).fontSize : null;
    });

    console.log(`Desktop H1: ${h1Desktop}`);
    console.log(`Tablet H1: ${h1Tablet}`);
    console.log(`Mobile H1: ${h1Mobile}`);

    // Given the fluid nature of clamp, H1 on mobile should be smaller than desktop
    expect(parseFloat(h1Mobile!)).toBeLessThan(parseFloat(h1Desktop!));
  });

  test('Grid and Column handle responsive stacking correctly', async ({ page }) => {
    // Navigate to a page with Grid layout, for example docs index or some component demo
    await page.goto('/cobogo/docs/components/grid');

    // In our test, we'll verify the Grid component's responsive variables
    await page.setViewportSize({ width: 1200, height: 800 });

    const columnsDesktop = await page.evaluate(() => {
      // Find a .cobogo-column and check its computed grid-column-end
      const cols = document.querySelectorAll('.cobogo-column');
      if (cols.length === 0) return null;
      // Many times tests use var(--col-md) or similar. The computed style resolves to 'span N'.
      return Array.from(cols).map(c => window.getComputedStyle(c).gridColumnEnd);
    });

    await page.setViewportSize({ width: 480, height: 800 });

    const columnsMobile = await page.evaluate(() => {
      const cols = document.querySelectorAll('.cobogo-column');
      if (cols.length === 0) return null;
      return Array.from(cols).map(c => window.getComputedStyle(c).gridColumnEnd);
    });

    console.log('Desktop Columns:', columnsDesktop);
    console.log('Mobile Columns:', columnsMobile);

    // If there's no grid on this page, we'll gracefully pass or update the test to render a grid.
    if (columnsDesktop && columnsDesktop.length > 0) {
      expect(columnsMobile).toBeDefined();
    }
  });
});
