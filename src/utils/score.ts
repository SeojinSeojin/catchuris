import { FirebaseApp } from 'firebase/app';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from 'firebase/firestore';

export const saveScore =
  (score: number, name: string) => (app: FirebaseApp) => {
    const db = getFirestore(app);
    return addDoc(collection(db, 'scores'), {
      score,
      name,
    });
  };

export const getScores = () => (app: FirebaseApp) => {
  const db = getFirestore(app);
  const collectionRef = collection(db, 'scores');
  return getDocs(query(collectionRef, orderBy('score', 'desc'))).then(
    (document) =>
      document.docs.map((doc) => doc.data() as { score: number; name: string })
  );
};
