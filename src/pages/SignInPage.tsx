import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { auth, logInWithEmailAndPassword } from '../firebase/firebase';
import RoutePaths from '../types/enums/routePaths';
import { useLocale } from '../context/local';
import PageWrapper from '../components/ui/pageWrapper/PageWrapper';
import FormWrapper from '../components/ui/FormWrapper';
import Button from '../components/ui/button/Button';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);

  const { state } = useLocale();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate(RoutePaths.MAIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const onError = (err: Error) => {
    toast.error(err.message, {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const handleSubmit = (): void => {
    logInWithEmailAndPassword(email, password).catch(onError);
  };

  return (
    <PageWrapper>
      <h1>{state.strings.signInPlease}</h1>
      <FormWrapper>
        <input
          type="text"
          className="p-4 text-base mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={state.strings.eMailAddress}
        />
        <input
          type="password"
          className="p-4 text-base mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={state.strings.password}
        />
        <Button type="button" onClick={handleSubmit}>
          {state.strings.login}
        </Button>
        <div className="mt-2">
          {state.strings.dontHaveAccount}
          <Link to={RoutePaths.SIGNUP}>{state.strings.register}</Link>
        </div>
      </FormWrapper>
    </PageWrapper>
  );
}
export default SignInPage;
