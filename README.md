# Agent Auto Browser Test

## Description

Agent が自動でブラウザテストを実施するためのリポジトリです。
最小単位の MVP として実装しています。色々とアレンジしてみてください。

## skill

- frontend
  - Next.js を Azure Static Web Apps で hosting
  - 状態管理は Redux Toolkit を使用
  - css は tailwindcss を使用
- backend
  - python の FastAPI 上で brower-use を使用し、Azure Container Apps で hosting
  - browser-use で取得した結果を Azure OpenAI Service で要約
  - 要約した文書を CosmosDB に保存

## Architecture

![](https://storage.googleapis.com/zenn-user-upload/378da8e72ac9-20250130.png)

## 動作

1. User が Azure Static Web Apps にアクセス
2. テスト実行を依頼
3. Azure Container Apps に hosting されている browser-use が指定したブラウザのテストを実行
4. テスト結果を Azure CosmosDB へ保存
5. Azure Static Web Apps よりテスト結果を確認

## Deploy

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FSatakeYusuke19920527%2Fpoc-auto-browser-test%2Frefs%2Fheads%2Fmain%2Fazuredeploy.json)
