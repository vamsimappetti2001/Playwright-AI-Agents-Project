import { test, expect } from '@playwright/test';

test.describe('OrangeHRM dashboard', () => {
  test('should load the dashboard for an authenticated admin user', async ({ page }) => {
    // Step 1: Open the OrangeHRM login page in a fresh browser context.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // Step 2: Enter the demo credentials Admin and admin123 into the login form.
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');

    // Step 3: Submit the login form.
    await page.locator('button[type="submit"]').click();
    await page.waitForURL('**/web/index.php/dashboard/index');

    // Step 4: Verify the dashboard shell is loaded, including the left navigation and top banner.
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'PIM' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();

    // Step 5: Check that the main dashboard widgets are present.
    await expect(page.getByText('Time at Work')).toBeVisible();
    await expect(page.getByText('My Actions')).toBeVisible();
    await expect(page.getByText('Quick Launch')).toBeVisible();
    await expect(page.getByText('Buzz Latest Posts')).toBeVisible();

    // Step 6: Verify the authenticated user profile area is visible.
    await expect(page.locator('img[alt="profile picture"]').first()).toBeVisible();
  });

  test('should show an error for invalid login credentials', async ({ page }) => {
    // Step 1: Open the OrangeHRM login page in a fresh browser context.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();

    // Step 2: Enter invalid credentials.
    await page.locator('input[name="username"]').fill('wronguser');
    await page.locator('input[name="password"]').fill('wrongpass');

    // Step 3: Submit the login form.
    await page.locator('button[type="submit"]').click();

    // Step 4: Verify the login error message is displayed.
    await expect(page.getByText('Invalid credentials')).toBeVisible();
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });
});
