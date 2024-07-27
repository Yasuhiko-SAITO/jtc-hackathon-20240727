import { test, expect } from '@playwright/test';

test('キーワードでToDo項目を検索およびフィルター', async ({ page }) => {
    // ログインページに移動
    await page.goto('https://todo-app-qajp.vercel.app/login');

    // EmailとPasswordを入力
    await page.getByPlaceholder("name@example.com").fill("test@hackaton.com");
    await page.locator("#password").fill("test123!");

    // 「Login」ボタンをクリック
    await page.click('button[type="submit"]');

    // ログインが成功したことを確認
    await expect(page).toHaveURL('https://todo-app-qajp.vercel.app/todo');

    // 特定のキーワードでタスクを検索
    await page.getByPlaceholder('Search by title...').click();
    await page.getByPlaceholder('Search by title...').fill('db4d930d-b00d-40dd-9983-5112b278a634');

    // 検索結果に特定のタスクが含まれていることを確認
    await expect(page.getByRole('rowheader')).toContainText('db4d930d-b00d-40dd-9983-5112b278a634');

    // 検索フィールドをクリアして別のキーワードで検索
    await page.getByPlaceholder('Search by title...').click();
    await page.getByPlaceholder('Search by title...').press('ControlOrMeta+a');
    await page.getByPlaceholder('Search by title...').fill('あああああ');
    await page.getByPlaceholder('Search by title...').press('Enter');

    // 検索結果が見つからない場合のメッセージを確認
    await expect(page.getByRole('gridcell')).toContainText('This display appears because either you have no tasks, or we couldn\'t find what you\'re looking for.');
});
