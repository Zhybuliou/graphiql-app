/* eslint-disable no-console */
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../../firebase/firebase';

import './Dashboard.css';

function Dashboard() {
  const [user] = useAuthState(auth);

  return (
    <div className="dashboard">
      <button
        disabled={Boolean(!user)}
        type="button"
        className="dashboard__btn"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
export default Dashboard;
