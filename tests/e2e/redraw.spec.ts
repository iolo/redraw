import { expect, test } from '@playwright/test';

test('renders the demo surface and basic controls', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Redraw' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Tools' })).toBeVisible();
  await expect(page.getByLabel('Color swatches')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Save PNG' })).toBeVisible();
});
