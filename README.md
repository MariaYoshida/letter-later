# LetterLater ✉️

**LetterLater** is a web application that allows users to write messages to their future selves, schedule delivery dates, and view message history. It is designed as a portfolio project built with React, Firebase, and modern UI/UX techniques.

> 🇯🇵 日本語版はこちら → [README.ja.md](./README.ja.md)

---

## Features

- 🔒 User authentication (Google Login)
- ✍️ Compose messages to your future self
- 📅 Schedule delivery date with date picker
- 🗃 View sent messages (history)
- 🗑 Delete past messages with confirmation dialog
- 🌐 Multi-language support (English / Japanese)
- 💅 Clean UI with animations (Framer Motion)

---

## Tech Stack

- **Frontend**: React (Vite) + TypeScript + TailwindCSS
- **Auth & DB**: Firebase Authentication, Firestore
- **UI Enhancements**: shadcn/ui, framer-motion, date-fns, react-datepicker

---

## Firebase Configuration

Firebase is initialized in `firebase.ts`:

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

Note: Firebase config keys included in this project are safe to expose, as they are not secrets. All read/write operations are strictly protected by Firebase Security Rules.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

## License

This project is for personal portfolio use only and is not intended for production delivery.

---
