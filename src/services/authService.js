import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile
    await updateProfile(user, { displayName });

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      role: 'customer',
      createdAt: new Date().toISOString(),
      orderHistory: [],
    });

    return {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      role: 'customer',
    };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: userData?.role || 'customer',
    };
  } catch (error) {
    throw error;
  }
};

// Sign in with Google
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Ensure a Firestore user doc exists
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        role: 'customer',
        createdAt: new Date().toISOString(),
        orderHistory: [],
      });
    }

    const userData = (await getDoc(ref)).data();

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || userData?.displayName || '',
      role: userData?.role || 'customer',
    };
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      callback({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: userData?.role || 'customer',
      });
    } else {
      callback(null);
    }
  });
};
