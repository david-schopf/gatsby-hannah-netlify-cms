const { defineConfig} = require('@playwright/test');
const config = defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:8000',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run develop',
    port: 8000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});

module.exports = config;
