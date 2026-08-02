import { expect, test } from '@playwright/test';

test('the basic variant is a plain, non-interactive pill with no note', async ({ page }) => {
  await page.goto('examples/basic/');

  const label = page.locator('.sl-ai-label');
  await expect(label.locator('.sl-ai-label__pill')).toHaveText('AI');
  await expect(label.locator('details')).toHaveCount(0);
  await expect(label.locator('.sl-ai-label__note')).toHaveCount(0);
});

test('the generated variant shows a note but stays non-interactive', async ({ page }) => {
  await page.goto('examples/generated/');

  const label = page.locator('.sl-ai-label');
  await expect(label.locator('.sl-ai-label__pill')).toHaveText('AI Generated');
  await expect(label.locator('details')).toHaveCount(0);
  await expect(label.locator('.sl-ai-label__note')).toHaveText(
    'Drafted end-to-end by an LLM from a bullet-point outline.',
  );
});

test('the modified variant is a disclosure that expands to a scope table', async ({ page }) => {
  await page.goto('examples/modified/');

  const disclosure = page.locator('.sl-ai-label__disclosure');
  await expect(disclosure).toHaveCount(1);
  await expect(disclosure).not.toHaveAttribute('open');
  await expect(disclosure.locator('.sl-ai-label__panel')).not.toBeVisible();

  await disclosure.locator('summary').click();
  await expect(disclosure).toHaveAttribute('open');
  await expect(disclosure.locator('.sl-ai-label__panel')).toBeVisible();

  await expect(disclosure.locator('.sl-ai-label__scope tr')).toHaveCount(3);
  const firstRow = disclosure.locator('.sl-ai-label__scope tr').first();
  await expect(firstRow.locator('td').nth(0)).toHaveText('Copy editing');
  await expect(firstRow.locator('td').nth(1)).toHaveText('Grammar and tone pass with Claude');
});

test('manual pages get inline badges instead of a title badge', async ({ page }) => {
  await page.goto('examples/manual/');

  // No auto-rendered badge under the title, since this page has no `aiLabel` frontmatter.
  await expect(page.locator('h1 + .sl-ai-label')).toHaveCount(0);

  const inlineBadges = page.locator('main .sl-ai-label');
  await expect(inlineBadges).toHaveCount(2);
  await expect(inlineBadges.nth(0).locator('.sl-ai-label__pill')).toHaveText('AI Generated');
  await expect(inlineBadges.nth(1).locator('.sl-ai-label__pill')).toHaveText('AI Modified');
});
