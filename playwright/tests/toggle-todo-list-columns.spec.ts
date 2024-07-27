import {test, expect} from '@playwright/test';

test('ToDoリストビューで特定の列を非表示/表示', async ({page}) => {
    // ログインページに移動
    await page.goto('https://todo-app-qajp.vercel.app/login');

    // EmailとPasswordを入力
    await page.getByPlaceholder("name@example.com").fill("test@hackaton.com");
    await page.locator("#password").fill("test123!");

    // 「Login」ボタンをクリック
    await page.click('button[type="submit"]');

    // ログインが成功したことを確認
    await expect(page).toHaveURL('https://todo-app-qajp.vercel.app/todo');

    // Columnsボタンをクリックして、ドロップダウンを開く
    await page.click('button:has-text("Columns")');

    // "Title" 列の表示/非表示を切り替えるためのチェックボックスをクリック
    await page.locator('[role="menuitemcheckbox"][data-key="title"]').click();

    // ドロップダウンが閉じるのを待つ
    await page.waitForTimeout(1000);

    // TODO // "Title" 列が非表示になっていることを確認
    // "Title" 列が表示されていないことを確認
    // const titleColumn = page.locator('th:has-text("TITLE")');
    // await expect(titleColumn).toHaveCount(0);
});