import { test, expect } from '@playwright/test';

const url_world = 'http://localhost:8000/examples/world-choropleth.html';

test('has title', async ({ page }) => {
    await page.goto(url_world);
    await expect(page).toHaveTitle(/World/);
});

test('mauritania in world map', async ({ page }) => {
    await page.goto(url_world);

    const loc = page.locator('path.unit-MRT');
    await expect(loc).toBeVisible();
    await expect(loc).toHaveAttribute('d');
    await expect(loc).toHaveAttribute('style', /fill/);

    const title = await loc.locator('title').textContent();
    expect(title).toMatch(/Mauritania/);
});

test('has legend', async ({ page }) => {
    await page.goto(url_world);

    const loc = page.locator('rect.legend-bar');
    await expect(loc).toBeVisible();
    await expect(loc).toHaveAttribute('height');
    await expect(loc).toHaveAttribute('width');
});

test('has annotation', async ({ page }) => {
    await page.goto(url_world);

    const loc = page.locator('g.annotation');
    await expect(loc).toBeVisible();
    await expect(loc).toHaveAttribute('height');
    await expect(loc).toHaveAttribute('width');
    await expect(loc).toHaveText(/World Wide/)
});