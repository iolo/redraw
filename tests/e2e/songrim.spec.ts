import { expect, test } from '@playwright/test';

test('renders the demo surface and basic controls', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'SonGrim' })).toBeVisible();
  await expect(page.getByLabel('Stroke hex')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Save PNG' })).toBeVisible();
});
