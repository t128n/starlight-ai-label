import { expect, test } from '@playwright/test';

test('static badge images load and each SVG is reachable directly', async ({ page, request }) => {
  await page.goto('examples/badges/');

  const images = page.locator('main img');
  await expect(images).toHaveCount(3);

  for (const src of ['badges/ai-basic.svg', 'badges/ai-generated.svg', 'badges/ai-modified.svg']) {
    const response = await request.get(src);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/svg+xml');
  }
});
