/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { auth, db, logout } from '../../firebase/firebase';

import './Dashboard.css';

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (loading) return;
    if (user) fetchUserName();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const temp = user ? (
    <div className="dashboard__container">
      Logged in as
      <div>{name}</div>
      <div>{user?.email}</div>
      <button type="button" className="dashboard__btn" onClick={logout}>
        Logout
      </button>
    </div>
  ) : (
    <h2>no user</h2>
  );
  return <div className="dashboard">{temp}</div>;
}
export default Dashboard;
