# gift-tmfv 🎁
- React + Vite + Tailwind + Firebase (Firestore + Storage)
- Arabic UI, blue-gold theme, music toggle, loader
- Username/password stored in Firestore (collection: `users`)
- Recordings stored in Storage and listed in Firestore (`recordings`)

## إعداد Firebase
1) افتح `src/firebase.js` وضع إعدادات مشروعك (apiKey, appId, ...).
2) في Firestore rules و Storage rules ابدأ بوضع اختبار (test mode) أثناء التطوير.
3) عند أول تشغيل، سيتم زرع حسابات الطلاب تلقائياً في مجموعة `users`.

## تشغيل محلي
```bash
npm install
npm run dev
```
افتح: http://localhost:5173

## نشر على Vercel
- Framework: Vite
- Build Command: npm run build
- Output Directory: dist
