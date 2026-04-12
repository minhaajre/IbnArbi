import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  type Auth,
  type User,
} from "firebase/auth";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

export const isConfigured = !!(apiKey && projectId && appId);

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _provider: GoogleAuthProvider | null = null;

if (isConfigured) {
  _app = initializeApp({
    apiKey,
    authDomain: `${projectId}.firebaseapp.com`,
    projectId,
    storageBucket: `${projectId}.firebasestorage.app`,
    appId,
  });
  _auth = getAuth(_app);
  _provider = new GoogleAuthProvider();
  setPersistence(_auth, browserLocalPersistence).catch((err) => {
    console.error("Firebase persistence error:", err);
  });
}

export { _auth as auth, _provider as provider };

export function loginWithGoogle(): Promise<void> {
  if (!_auth || !_provider) {
    console.warn("Firebase not configured — sign-in unavailable");
    return Promise.resolve();
  }
  return signInWithPopup(_auth, _provider).then(() => {});
}

export function logout(): Promise<void> {
  if (!_auth) return Promise.resolve();
  return signOut(_auth);
}

export function onAuthChange(callback: (user: User | null) => void): () => void {
  if (!_auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(_auth, callback);
}
