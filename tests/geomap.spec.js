import { test, expect } from '@playwright/test';

const url_world_plain = 'http://localhost:8000/examples/world-plain.html'

test('has title', async ({ page }) => {
    await page.goto(url_world_plain);
    await expect(page).toHaveTitle(/World/);
});

test('spain in world map', async ({ page }) => {
    await page.goto(url_world_plain);

    const loc = page.locator('path.unit-ESP');
    await expect(loc).toBeVisible();
    await expect(loc).toHaveAttribute('d');
    await expect(loc).toHaveText('Spain');
});

test('data array', async ({ page }) => {
    await page.goto('http://localhost:8000/examples/data-array.html');

    const loc = page.locator('path.unit-ESP');
    await expect(loc).toBeVisible();
    await expect(loc).toHaveAttribute('style', /fill/);
});

test('missing unit id', async ({ page }) => {
    await page.goto('http://localhost:8000/examples/missing-unitid.html');

    const loc = page.locator('path.unit-');
    await expect(loc).toBeVisible();
    await expect(loc).toHaveCSS('fill', 'rgb(0, 0, 0)');
});
