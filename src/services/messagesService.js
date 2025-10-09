import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export const addMessage = async (data) => {
  const payload = {
    ...data,
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  const ref = await addDoc(collection(db, 'messages'), payload);
  return { id: ref.id, ...payload };
};

export const getAllMessages = async () => {
  const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};
