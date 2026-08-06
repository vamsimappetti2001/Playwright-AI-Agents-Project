import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  globalTimeout: 60 * 60 * 1000,
  timeout: 2 * 60 * 1000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    trace: 'on',
    headless: false,
    slowMo: 1000,
    launchOptions: {
      slowMo: 1000,
    },
    screenshot: {
      mode: 'on',
      fullPage: true,
    },
    video: 'on',
    testIdAttribute: 'data-tab-item',
  },
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        headless: false,
      },
    },
  ],
});
