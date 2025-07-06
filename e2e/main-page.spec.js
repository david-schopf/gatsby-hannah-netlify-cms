import {expect, test} from '@playwright/test';

test('main page screenshot test', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('main-page.png');
});
