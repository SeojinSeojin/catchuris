import { FirebaseApp, initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';

export const useFirebase = () => {
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | undefined>(
    undefined
  );

  useEffect(() => {
    const app = initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    });
    setFirebaseApp(app);
  }, []);

  return { firebaseApp };
};
