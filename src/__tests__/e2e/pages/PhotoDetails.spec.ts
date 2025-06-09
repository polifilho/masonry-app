import { test, expect } from '@playwright/test';

test.describe('Photo Details Page', () => {
  test('go to details page and display content and image', async ({ page }) => {
    await page.goto('/');
    const firstImage = page.getByRole('img').first();
    await firstImage.click();

    await expect(page.getByRole('heading')).toContainText(/beach/i);
    await expect(page.getByRole('link', { name: /open .* profile/i })).toBeVisible();
  });

  test('return to home/galery after click buton to back', async ({ page }) => {
    await page.goto('/');
    const firstImage = page.getByRole('img').first();
    await firstImage.click();
    await page.getByRole('button', { name: /back/i }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('textbox')).toBeVisible();
  });

  test('open a new tab when click in the photographer name', async ({ page }) => {
    await page.goto('/');
    const firstImage = page.getByRole('img').first();
    await firstImage.click();

    const link = await page.getByRole('link', { name: /open .* profile/i });
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
  });
});
