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

// Recursively remove undefined values from objects/arrays to satisfy Firestore
const sanitize = (value) => {
  if (Array.isArray(value)) {
    return value.map(sanitize).filter((v) => v !== undefined);
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      const sv = sanitize(v);
      if (sv !== undefined) out[k] = sv;
    }
    return out;
  }
  // Firestore accepts null and primitives; disallow undefined only
  return value;
};

export const createOrder = async (orderData) => {
  try {
    // Normalize items to essential fields to avoid undefined properties
    const items = Array.isArray(orderData.items)
      ? orderData.items.map((it) => ({
          id: it.id,
          name: it.name,
          price: it.price,
          quantity: it.quantity,
          image: it.image,
          totalPrice: it.totalPrice,
        }))
      : [];

    const payloadRaw = {
      ...orderData,
      userId: orderData.userId || 'guest',
      items,
      createdAt: new Date().toISOString(),
      status: orderData.status || 'pending',
    };

    const payload = sanitize(payloadRaw);

    const docRef = await addDoc(collection(db, 'orders'), payload);
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
