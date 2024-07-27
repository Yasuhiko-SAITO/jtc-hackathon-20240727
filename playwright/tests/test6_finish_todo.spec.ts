import { test, expect } from '@playwright/test';
import { login } from './util/login';

test("login後、タスクを作って、completeに更新する", async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'Add New' }).click();
  const now = new Date();
  const formattedDate = now.toISOString();
  await page.getByLabel('Title', { exact: true }).fill(`ssmt-test6-${formattedDate}`);
  await page.getByLabel('Description').fill('e2e test for test6');
  await page.getByRole('button', { name: 'Pick a date' }).click();
  await page.getByRole('gridcell', { name: '28' }).click();
  await page.getByText('Due Date:').click();
  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByPlaceholder('Search by title...').fill(`ssmt-test6-${formattedDate}`);
  await page.getByPlaceholder('Search by title...').press('Tab');
  // ここから先、debugモードでしか動かないため、コメントアウト。
  // await page.getByLabel('Edit Todo').click();
  // await page.getByLabel('Active,').click();
  // await page.getByLabel('Completed', { exact: true }).click();
  // await page.getByRole('button', { name: 'Update' }).click();

});
