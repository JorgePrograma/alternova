import { getApps, initializeApp } from 'firebase/app';
import { Auth, initializeAuth } from 'firebase/auth';

let auth: Auth;

export async function initializeFirebase() {
  const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
  };

  if (getApps().length === 0) {
    const app = initializeApp(firebaseConfig);
    auth = initializeAuth(app);
  }
}


export function getFirebaseAuth() {
  if (!auth) {
    throw new Error('Firebase Auth has not been initialized. Call initializeFirebase() first.');
  }
  return auth;
}
