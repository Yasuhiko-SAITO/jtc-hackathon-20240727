import { test, expect } from '@playwright/test';

test('ToDoタスクを削除', async ({ page }) => {
    // ログインページに移動
    await page.goto('https://todo-app-qajp.vercel.app/login');

    // EmailとPasswordを入力
    await page.getByPlaceholder("name@example.com").fill("test@hackaton.com");
    await page.locator("#password").fill("test123!");

    // 「Login」ボタンをクリック
    await page.click('button[type="submit"]');

    // ログインが成功したことを確認
    await expect(page).toHaveURL('https://todo-app-qajp.vercel.app/todo');

    // TODOを追加
    await page.getByRole('button', { name: 'Add New' }).click();
    await page.getByLabel('Title', { exact: true }).fill('Test Article Title');
    await page.getByLabel('Description').click();
    await page.getByLabel('Description').fill('test1234');
    await page.getByRole('button', { name: 'Pick a date' }).click();
    await page.getByRole('gridcell', { name: '27' }).click();
    await page.getByLabel('Active,').click();
    await page.getByRole('button', { name: 'Create' }).click();

    // TODOを削除
    
});