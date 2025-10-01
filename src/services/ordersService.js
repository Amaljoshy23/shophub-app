import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

export const createOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'pending',
    });
    return { id: docRef.id, ...orderData };
  } catch (error) {
    throw error;
  }
};

export const getUserOrders = async (userId) => {
  try {
    const ordersCol = collection(db, 'orders');
    const q = query(
      ordersCol,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const orderSnapshot = await getDocs(q);
    const orderList = orderSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return orderList;
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const orderDoc = await getDoc(doc(db, 'orders', orderId));
    if (orderDoc.exists()) {
      return { id: orderDoc.id, ...orderDoc.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status,
      updatedAt: new Date().toISOString(),
    });
    return { id: orderId, status };
  } catch (error) {
    throw error;
  }
};

export const getAllOrders = async () => {
  try {
    const ordersCol = collection(db, 'orders');
    const q = query(ordersCol, orderBy('createdAt', 'desc'));
    const orderSnapshot = await getDocs(q);
    const orderList = orderSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return orderList;
  } catch (error) {
    throw error;
  }
};
