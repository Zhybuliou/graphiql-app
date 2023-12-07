import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from '../../firebase/firebase';
import RoutePaths from '../../types/enums/routePaths';
import './SignUpPage.css';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, loading, error] = useAuthState(auth);
  const register = () => {
    if (!name) return;
    registerWithEmailAndPassword(name, email, password);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate(RoutePaths.SIGNIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <div className="register">
      <h1>Sign Up, please</h1>
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="button" className="register__btn" onClick={register}>
          Register
        </button>
        <div>
          Already have an account? <Link to={RoutePaths.SIGNIN}>Sign in</Link>{' '}
          now.
        </div>
      </div>
    </div>
  );
}
export default SignUpPage;
