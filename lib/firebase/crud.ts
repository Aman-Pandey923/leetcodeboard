import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, getDoc, doc, setDoc, collection } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

// Define the Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize the Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Define the types for userId, problemId, and data
type UserId = string;
type ProblemId = string;

interface DocumentData {
  content: string;
}

// Function to get document data from Firestore
export async function getDocumentData(userId: UserId, problemId: ProblemId): Promise<DocumentData | null> {
  try {
    const docRef = doc(db, `users/${userId}/drawings/${problemId}`);
    const documentSnapshot = await getDoc(docRef);

    if (documentSnapshot.exists()) {
      return documentSnapshot.data() as DocumentData;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

// Function to set document data to Firestore
export async function setDocumentData(userId: UserId, problemId: ProblemId, data: DocumentData): Promise<void> {
  try {
    const docRef = doc(db, `users/${userId}/drawings/${problemId}`);
    await setDoc(docRef, data);
  } catch (error) {
    throw error;
  }
}

export { app, auth };
