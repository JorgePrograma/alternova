import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

class FirebaseService {
  private static instance: FirebaseService;
  private app: FirebaseApp;
  private auth: Auth;
  private firestore: Firestore;

  private constructor() {
    const firebaseConfig = {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
    };

    if (getApps().length === 0) {
      this.app = initializeApp(firebaseConfig);
      this.auth = initializeAuth(this.app, {
        persistence: getReactNativePersistence(AsyncStorage)
      });
      this.firestore = getFirestore(this.app);
    } else {
      this.app = getApps()[0];
      this.auth = getAuth(this.app);
      this.firestore = getFirestore(this.app);
    }
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  public getAuth(): Auth {
    return this.auth;
  }

  public getFirestore(): Firestore {
    return this.firestore;
  }
}

export default FirebaseService;
