import { test, expect } from "@playwright/test";

test("既存ユーザーでログインして、サインアウトするテスト", async ({ page }) => {
  // トップページにアクセス
  await page.goto("https://todo-app-qajp.vercel.app/");

  // 「get start new」ボタンをクリック
  await page.getByRole("button", { name: "Get start now" }).click();

  // メールアドレス項目に既存ユーザーのメールアドレスを入力
  await page.getByPlaceholder("name@example.com").click();
  await page.getByPlaceholder("name@example.com").fill("test@hackaton.com");

  // パスワード項目に既存ユーザーのパスワードを入力
  await page.locator("#password").click();
  await page.locator("#password").fill("test123!");

  // ログインボタンクリック
  await page.getByRole("button", { name: "Log in with Email" }).click();

  // タイトルロゴボタンをクリック
  await page.getByRole("menuitem", { name: "Todos" }).click();

  // サインアウトをクリック
  await page.getByRole("menuitem", { name: "Signout ⌘Q" }).click();

  // ログインページに戻っていることを確認
  await expect(page).toHaveTitle("Todos App | Ultimate Task Management Solution");
});
