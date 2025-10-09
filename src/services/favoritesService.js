import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export const getAllFavorites = async () => {
  const q = query(collection(db, 'favorites'), orderBy('name'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};
