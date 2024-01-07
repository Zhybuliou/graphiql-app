import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD7RD1b614RR6hInm_OXziBsKooSF1kd7U',
  authDomain: 'graphiql-2023-12.firebaseapp.com',
  projectId: 'graphiql-2023-12',
  storageBucket: 'graphiql-2023-12.appspot.com',
  messagingSenderId: '901804055351',
  appId: '1:901804055351:web:ce8f237094e307ff1658b2',
  measurementId: 'G-V490YL1L8J',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }
};
const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = res;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const useUser = () => {
  const [user] = useAuthState(auth);
  return user;
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  useUser,
};
