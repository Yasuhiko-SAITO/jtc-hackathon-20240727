import { test, expect } from '@playwright/test';

test('アカウント作成とログインして、TODO作成するテスト', async ({ page }) => {
    // ランダムなメールアドレスを生成
    const randomEmail = `testuser_${Math.random().toString(36).substring(2, 10)}_${Date.now()}@example.com`;
    const password = 'Test@1234';

    // 登録したメールアドレスをログに出力
    console.log(`Generated email: ${randomEmail}`);

    // 登録ページに移動
    await page.goto('https://todo-app-qajp.vercel.app/register');

    // Email入力フィールドにランダムなメールアドレスを入力
    await page.fill('input[name="email"]', randomEmail);

    // Password入力フィールドにパスワードを入力
    await page.fill('input[name="password"]', password);

    // 「Sign up」ボタンをクリック
    await page.click('button[type="submit"]');

    // サインアップが成功したことを確認
    await expect(page).toHaveURL('https://todo-app-qajp.vercel.app/todo');

    // ログインページに移動
    await page.goto('https://todo-app-qajp.vercel.app/login');

    // EmailとPasswordを入力
    await page.fill('input[name="email"]', randomEmail);
    await page.fill('input[name="password"]', password);

    // 「Login」ボタンをクリック
    await page.click('button[type="submit"]');

    // ログインが成功したことを確認
    await expect(page).toHaveURL('https://todo-app-qajp.vercel.app/todo');

    // 空の状態でのメッセージを確認
    const emptyMessage = await page.textContent('td.text-foreground-400.align-middle.text-center.h-40');
    expect(emptyMessage).toBe('This display appears because either you have no tasks, or we couldn\'t find what you\'re looking for.');

    // "Add New" ボタンをクリック
    await page.click('button:has-text("Add New")');

    // モーダル内のタイトルフィールドに値を入力
    await page.fill('input[name="title"]', 'Test Article Title');

    // モーダル内のディスクリプションフィールドに値を入力
    await page.fill('textarea[name="description"]', 'This is a test article description.');

    // Due Date選択ボタンをクリックして日付ピッカーを開く
    await page.click('button:has-text("Pick a date")');

    // 特定の日付を選択（"July 27th, 2024"）
    await page.click('button:has-text("July 27th, 2024")');

    // "Create" ボタンをクリックして記事を作成
    await page.click('button:has-text("Create")');

    const article = await page.locator('text=Test Article Title');
    await expect(article).toBeVisible();
});
