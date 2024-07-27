import { test, expect } from "@playwright/test";
import { login } from "./util/login";

test("新しいToDo項目を作成するテスト", async ({ page }) => {
  // ログイン
  const username = "sample@example.com";
  const password = "123456";
  login(page, username, password);

  // 「Add New」ボタンをクリック
  await page.getByRole("button", { name: "Add New" }).click();

  const test_title = "test_title2";
  const test_description = "test_description2";
  const date_num = 2;
  const test_date = `Jul ${date_num}, 2024`;

  // タイトル項目を入力
  await page.getByLabel("Title", { exact: true }).click();
  await page.getByLabel("Title", { exact: true }).fill(test_title);

  // ディスクリプション項目を入力
  await page
    .locator("div")
    .filter({ hasText: /^Description$/ })
    .nth(1)
    .click();
  await page.getByLabel("Description").fill(test_description);

  // Due Date項目を入力
  await page.getByRole("button", { name: "Pick a date" }).click();
  await page
    .getByRole("gridcell", { name: `${date_num}`, exact: true })
    .first()
    .click();
  await page.getByText("Due Date:").click();

  // 「Create」ボタンのクリック
  await page.getByRole("button", { name: "Create" }).click();

  // ToDoリストが更新されるのを待つ
  await page.waitForSelector('table[aria-label="Todo List Table"]', {
    timeout: 5000,
  });

  // "Todo List Table" の aria-label を持つ table 要素の配下の tbody 要素を取得
  const tbody = await page.$('table[aria-label="Todo List Table"] > tbody');

  let title_found = false;
  let description_found = false;
  let date_found = false;
  if (tbody) {
    // "sample" の aria-label を持つ要素を tbody の配下から取得
    const sampleElement = await tbody.$(`[aria-label=${test_title}]`);
    title_found = !!sampleElement;

    if (title_found) {
      console.log(`タイトル：${test_title}が見つかった。`);
    } else {
      console.log(`タイトル：${test_title}が見つからない。`);
    }

    // tbody 内の全ての孫要素（またはそれ以下の階層の要素）を取得
    const descendants = await tbody.$$("*");

    // 各孫要素のテキストコンテンツを確認
    for (const element of descendants) {
      const textContent = await element.textContent();
      if (textContent && textContent.trim() === test_description) {
        console.log(
          `ディスクリプション：${test_description}が見つかった。`,
          textContent.trim()
        );
        description_found = true;
        break;
      }
    }

    if (!description_found)
      console.log(`ディスクリプション：${test_description}が見つからない。`);

    // 締切日を探す
    for (const element of descendants) {
      const textContent = await element.textContent();
      if (textContent && textContent.trim() === test_date) {
        console.log(`締切日：${test_date}が見つかった。`, textContent.trim());
        date_found = true;
        break;
      }
    }

    if (!date_found) console.log(`締切日：${test_date}が見つからない。`);
  } else {
    console.log(`tbodyが見つからない。`);
  }

  // 新規追加したtodoが見つかったかを確認
  await expect(title_found && description_found && date_found).toBe(true);
});
