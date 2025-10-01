import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

export const getAllProducts = async () => {
  try {
    const productsCol = collection(db, 'products');
    const productSnapshot = await getDocs(productsCol);
    const productList = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return productList;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const productDoc = await getDoc(doc(db, 'products', id));
    if (productDoc.exists()) {
      return { id: productDoc.id, ...productDoc.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const productsCol = collection(db, 'products');
    const q = query(productsCol, where('category', '==', category));
    const productSnapshot = await getDocs(q);
    const productList = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return productList;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...productData,
      createdAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...productData };
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, {
      ...productData,
      updatedAt: new Date().toISOString(),
    });
    return { id, ...productData };
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, 'products', id));
    return id;
  } catch (error) {
    throw error;
  }
};
