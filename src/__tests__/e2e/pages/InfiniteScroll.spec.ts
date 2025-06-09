import { test, expect } from '@playwright/test';

test('Infinite Scroll - load more images with scroll', async ({ page }) => {
  await page.goto('/');

  const imgSelector = 'img';

  await page.waitForSelector(imgSelector);
  const initialImages = await page.locator(imgSelector).count();
  expect(initialImages).toBeGreaterThan(0);

  await page.mouse.wheel(0, 3000);
  await page.waitForTimeout(1500);
  await page.mouse.wheel(0, 3000);
  await page.waitForTimeout(1500);

  const newImageCount = await page.locator(imgSelector).count();

  expect(newImageCount).toBeGreaterThanOrEqual(initialImages);
  expect(newImageCount).not.toBe(initialImages - 1);
});
