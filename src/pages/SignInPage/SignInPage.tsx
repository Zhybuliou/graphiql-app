import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword } from '../../firebase/firebase';
import RoutePaths from '../../types/enums/routePaths';
import { useLocale } from '../../context/local';
import './SignInPage.css';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);

  const { state, dispatch } = useLocale();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate(RoutePaths.MAIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const onError = (err: Error) => {
    const action = {
      type: 'SET_ERROR',
      payload: {
        value: err.message,
      },
    };
    dispatch(action);
  };

  const handleSubmit = (): void => {
    logInWithEmailAndPassword(email, password).catch(onError);
  };

  return (
    <div className="login">
      <h1>{state.strings.signInPlease}</h1>
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={state.strings.eMailAddress}
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={state.strings.password}
        />
        <button
          type="button"
          className="login__btn"
          onClick={() => handleSubmit()}
        >
          {state.strings.login}
        </button>

        <div className="about-account">
          {state.strings.dontHaveAccount}
          <Link to={RoutePaths.SIGNUP}>{state.strings.register}</Link>
        </div>
      </div>
    </div>
  );
}
export default SignInPage;
