import { expect, test } from '@playwright/test';

test('the pill gets a visible border in dark mode but not in light mode', async ({ page }) => {
  await page.goto('examples/modified/');
  const pill = page.locator('.sl-ai-label__pill').first();

  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  const darkBorder = await pill.evaluate((el) => getComputedStyle(el).borderColor);
  const darkPageBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(darkBorder).not.toBe('rgba(0, 0, 0, 0)');
  expect(darkBorder).not.toBe(darkPageBg);

  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  const lightBorder = await pill.evaluate((el) => getComputedStyle(el).borderColor);
  expect(lightBorder).toBe('rgba(0, 0, 0, 0)');
});
