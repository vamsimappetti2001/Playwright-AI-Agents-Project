import { test, expect } from '@playwright/test';

test('sample agent smoke test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
  await expect(page.locator('h1')).toContainText('Example Domain');
});
