import { test, expect } from '@playwright/test';

test('landing page renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('WealthSignal')).toBeVisible();
});

test('dashboard route responds', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByText('Advisor Dashboard')).toBeVisible();
});
