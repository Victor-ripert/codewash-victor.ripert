import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const title = await page.title();
  expect(title.length).toBeGreaterThan(0);
});
