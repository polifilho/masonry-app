import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Search images flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('search for hawaii and the result is the expected', async ({ page }) => {
    await page.getByPlaceholder('Search Images').fill('hawaii');
    await page.getByRole('button', { name: /search/i }).click();

    await expect(page).toHaveURL(/\/search\?q=hawaii/);

    const images = page.locator('img');
    await expect(images.first()).toBeVisible();
  });

  test('do not search anything when input is empty', async ({ page }) => {
    await page.getByRole('button', { name: /search/i }).click();
    await expect(page.getByText(/please, type a term to search/i)).toBeVisible();
  });

  test('navigate to details page keeping the state', async ({ page }) => {
    await page.getByPlaceholder('Search Images').fill('beach');
    await page.getByRole('button', { name: /search/i }).click();
    await expect(page).toHaveURL(/\/search\?q=beach/);

    const firstImage = page.locator('img').first();
    await firstImage.click();

    await expect(page).toHaveURL(/\/photo\//);
    await expect(page.getByRole('button', { name: /back/i })).toBeVisible();

    await page.getByRole('button', { name: /back/i }).click();
    await expect(page).toHaveURL(/\/search\?q=beach/);
    await expect(page.locator('img').first()).toBeVisible();
  });
});
