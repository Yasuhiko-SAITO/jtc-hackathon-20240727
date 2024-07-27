import { test, expect, devices } from '@playwright/test';

test('アカウント作成とログイン後、TODOを追加し、別デバイスで確認', async ({ page, browser }) => {
    // ランダムなメールアドレスを生成
    const randomEmail = `testuser_${Math.random().toString(36).substring(2, 10)}_${Date.now()}@example.com`;
    const password = 'Test@1234';

    // 登録したメールアドレスをログに出力
    // console.log(`Generated email: ${randomEmail}`);

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

    // TODOを追加
    await page.getByRole('button', { name: 'Add New' }).click();
    await page.getByLabel('Title', { exact: true }).fill('Test Article Title');
    await page.getByLabel('Description').click();
    await page.getByLabel('Description').fill('test1234');
    await page.getByRole('button', { name: 'Pick a date' }).click();
    await page.getByRole('gridcell', { name: '27' }).click();
    await page.getByLabel('Active,').click();
    await page.getByRole('button', { name: 'Create' }).click();

    // 追加したTODOが表示されていることを確認
    const articleTitle = await page.locator('text=Test Article Title');
    await expect(articleTitle).toBeVisible();
    const articleDescription = await page.locator('text=test1234');
    await expect(articleDescription).toBeVisible();

    // 新しいデバイス環境でのテスト
    const iPhone12 = devices['iPhone 12'];
    const context = await browser.newContext({
        ...iPhone12,
    });
    const newPage = await context.newPage();
    await newPage.goto('https://todo-app-qajp.vercel.app/login');
    await newPage.fill('input[name="email"]', randomEmail);
    await newPage.fill('input[name="password"]', password);
    await newPage.click('button[type="submit"]');

    // ログインが成功したことを確認
    await expect(newPage).toHaveURL('https://todo-app-qajp.vercel.app/todo');

    // 新しいデバイス環境で記事が表示されていることを確認
    const newArticleTitle = await newPage.locator('text=Test Article Title');
    await expect(newArticleTitle).toBeVisible();
    const newArticleDescription = await newPage.locator('text=test1234');
    await expect(newArticleDescription).toBeVisible();
});
