import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env['CI'];

export default defineConfig({
  testDir: 'packages/demo/tests/e2e',
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  use: {
    // Trailing slash matters: it makes relative goto('examples/basic/') calls in specs
    // resolve under the base path instead of replacing it.
    baseURL: 'http://localhost:4321/starlight-ai-label/',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm run build && pnpm run preview',
    cwd: 'packages/demo',
    url: 'http://localhost:4321/starlight-ai-label',
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
});
