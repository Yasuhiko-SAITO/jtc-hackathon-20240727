import { test, expect } from '@playwright/test';
import { login } from './util/login';

test("loginが成功すること", async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL('https://todo-app-qajp.vercel.app/todo');
});
