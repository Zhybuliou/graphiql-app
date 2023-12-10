import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth, logInWithEmailAndPassword } from '../firebase/firebase';
import RoutePaths from '../types/enums/routePaths';
import { useLocale } from '../context/local';
import PageWrapper from '../components/ui/PageWrapper';
import FormWrapper from '../components/ui/FormWrapper';
import Button from '../components/ui/Button';
import FormInput from '../components/ui/FormInput';
import { signInValidationSchemes } from '../utils/validationSchemes';
import ISignInForm from '../types/interfaces/ISignInForm';

function SignInPage() {
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

  const logInUser: SubmitHandler<ISignInForm> = ({ email, password }): void => {
    logInWithEmailAndPassword(email, password).catch(onError);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignInForm>({
    resolver: yupResolver(signInValidationSchemes),
    mode: 'onChange',
  });

  return (
    <PageWrapper>
      <h1>{state.strings.signInPlease}</h1>
      <form onSubmit={handleSubmit(logInUser)}>
        <FormWrapper>
          <FormInput
            type="text"
            name="email"
            register={register}
            placeholder={state.strings.eMailAddress}
            error={errors.email?.message}
            required
          />
          <FormInput
            type="password"
            name="password"
            register={register}
            placeholder={state.strings.password}
            error={errors.password?.message}
            required
          />
          <Button type="submit" disabled={!isValid}>
            {state.strings.login}
          </Button>
          <div className="mt-2">
            {state.strings.dontHaveAccount}
            <Link to={RoutePaths.SIGNUP}>{state.strings.register}</Link>
          </div>
        </FormWrapper>
      </form>
    </PageWrapper>
  );
}
export default SignInPage;
