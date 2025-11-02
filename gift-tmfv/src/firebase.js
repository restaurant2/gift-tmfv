import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, getDoc, setDoc, getDocs, addDoc, serverTimestamp, deleteDoc, query, where } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// ضع إعدادات مشروعك هنا (انسخ من Firebase Console)
export const firebaseConfig = {
  apiKey: 'ضع_API_KEY',
  authDomain: 'gift-tmfv.firebaseapp.com',
  projectId: 'gift-tmfv',
  storageBucket: 'gift-tmfv.firebasestorage.app',
  messagingSenderId: 'ضع_SENDER_ID',
  appId: 'ضع_APP_ID',
  measurementId: 'ضع_MEASUREMENT_ID'
}
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export { collection, doc, getDoc, setDoc, getDocs, addDoc, serverTimestamp, deleteDoc, query, where }