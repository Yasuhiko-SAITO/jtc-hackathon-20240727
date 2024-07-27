import { test, expect } from '@playwright/test';

test('ダークモードとライトモードの切り替え', async ({ page }) => {
    // ログインページに移動
    await page.goto('https://todo-app-qajp.vercel.app/login');

    // EmailとPasswordを入力
    await page.getByPlaceholder("name@example.com").fill("test@hackaton.com");
    await page.locator("#password").fill("test123!");

    // 「Login」ボタンをクリック
    await page.click('button[type="submit"]');

    // ログインが成功したことを確認
    await expect(page).toHaveURL('https://todo-app-qajp.vercel.app/todo');

    // ダークモードを有効にする
    await page.locator('.px-1').first().click();

    // color-schemeが'dark'になっていることを確認
    const darkMode = await page.evaluate(() => {
        return window.getComputedStyle(document.documentElement).colorScheme;
    });
    expect(darkMode).toBe('dark');

    // ライトモードに切り替える
    await page.locator('.px-1').first().click();

    // color-schemeが'light'になっていることを確認
    const lightMode = await page.evaluate(() => {
        return window.getComputedStyle(document.documentElement).colorScheme;
    });
    expect(lightMode).toBe('light');
});
