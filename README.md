# jtc-hackathon-20240727
## playwright
暫定的な動かし方です。クソなのでどうにか直したいけど多分時間ない。

```bash
# ホスト側での処理
## APP_ROOT/playwright/.devcontainerに移動
cd playwright/.devcontainer
## docker-composeコマンドの実行
docker-compose up -d playwright
## dockerコンテナ内に移動
docker exec -it playwright-container bash

## コンテナの中
cd /usr/src/playwright
## 基本1回だけの実行で大丈夫
npm install
## playwright実行
npx playwright test

```
