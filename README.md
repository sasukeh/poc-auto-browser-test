# Agent Auto Browser Test

## Description

Agent が自動でブラウザテストを実施するためのリポジトリです。
最小単位の MVP として実装しています。色々とアレンジしてみてください。

## skill

- frontend
  - Next.js を Azure Static Web Apps で hosting
- server
  - python の FastAPI 上で brower-use を使用し、Azure Web Apps で hosting

## Architecture

![](https://storage.googleapis.com/zenn-user-upload/09a17db8f880-20250129.png)

## 動作

1. User が Static Web Apps にアクセス
2. テスト実行を依頼
3. Azure App Service に hosting されている browser-use が指定したブラウザのテストを実行
4. テスト結果を Azure CosmosDB へ保存
5. Static Web Apps よりテスト結果を確認

## Deploy

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FSatakeYusuke19920527%2Fpoc-auto-browser-test%2Fmain%2Fazuredeploy.json)
