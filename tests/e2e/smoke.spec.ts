import { test, expect } from '@playwright/test';

test('dashboard route responds', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByText('Advisor Dashboard')).toBeVisible();
});

test('leads route renders at least one row in demo mode', async ({ page }) => {
  await page.goto('/leads');
  await expect(page.getByRole('heading', { name: 'Lead Explorer' })).toBeVisible();
  await expect(page.locator('tbody tr').first()).toBeVisible();
});
