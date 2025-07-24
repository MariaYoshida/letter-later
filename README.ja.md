# LetterLater ✉️

**LetterLater** は、未来の自分宛に手紙を書くことができる Web アプリケーションです。メッセージの作成・送信予約・履歴確認などの機能を備えたポートフォリオ向けプロジェクトです。

> 🇬🇧 English version → [README.md](./README.md)

---

## 主な機能

- 🔒 Google アカウントでログイン
- ✍️ 自分へのメッセージ作成
- 📅 日付指定で未来に送信予約
- 🗃 過去のメッセージ履歴表示
- 🗑 モーダルで削除確認付きの削除機能
- 🌐 英語 / 日本語 の多言語対応
- 💅 Framer Motion によるアニメーション付き UI

---

## 技術スタック

- **フロントエンド**: React (Vite) + TypeScript + TailwindCSS
- **認証 & DB**: Firebase Authentication, Firestore
- **UI 拡張**: shadcn/ui, framer-motion, date-fns, react-datepicker

---

## Firebase 設定

Firebase の初期化は `firebase.ts` に記述されています：

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQUTNQvWkYWj_2RxFXUn2-UXayYiGp29A",
  authDomain: "letterlater-1495f.firebaseapp.com",
  projectId: "letterlater-1495f",
  storageBucket: "letterlater-1495f.firebasestorage.app",
  messagingSenderId: "7796274943",
  appId: "1:7796274943:web:538802acf97a2401e5feca",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

補足：本プロジェクトに含まれる Firebase の構成情報（firebase.ts 内の apiKey 等）は公開しても問題のない情報です。これらは機密情報ではなく、Firebase プロジェクトを識別するための設定項目です。

Firestore や認証に関する読み書きなどの操作は、Firebase のセキュリティルールにより厳密に制限されています。そのため、第三者がこの構成情報を使って不正にアクセスすることはできません。

ご安心ください。

---

## 開発環境での起動方法

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
```

---

## ライセンス

本プロジェクトはポートフォリオ用途のみに使用されることを想定しており、実運用は想定していません。

---
