export async function login(page: Page, username: string, password: string) {
  if (!(username && password)) {
    // `default_user.yml` からユーザー情報を取得
    const fs = require('fs');
    const yaml = require('js-yaml');
    try {
      const fileContents = fs.readFileSync('./tests/util/default_user.yml', 'utf8');
      const data = yaml.load(fileContents);
      username = data.username;
      password = data.password;
    } catch (e) {
      console.log(e);
    }
  }
  await page.goto('https://todo-app-qajp.vercel.app/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByPlaceholder('name@example.com').fill(username);
  await page.locator('#password').fill(password);
  await page.getByRole('button', { name: 'Log in with Email' }).click();
}
