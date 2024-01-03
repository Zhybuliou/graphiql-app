import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth, logInWithEmailAndPassword } from '../firebase/firebase';
import { RoutePaths } from '../types/enums/routePaths';
import { useLocale } from '../context/local';
import { PageWrapper } from '../components/ui/PageWrapper';
import { FormWrapper } from '../components/ui/FormWrapper';
import { UiButton } from '../components/ui/UiButton';
import { UIFormInput } from '../components/ui/UIFormInput';
import { signInValidationSchema } from '../utils/validationSchemes';
import { ISignInForm } from '../types/interfaces/ISignInForm';

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

  const onError = () => {
    toast.error('Firebase: Error, autoization invalid', {
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
    resolver: yupResolver(signInValidationSchema),
    mode: 'onChange',
  });

  return (
    <PageWrapper>
      <h1 className="text-black font-inter text-xl font-medium">
        {state.strings.signInPlease}
      </h1>
      <form onSubmit={handleSubmit(logInUser)}>
        <FormWrapper>
          <UIFormInput
            type="text"
            name="email"
            register={register}
            placeholder={state.strings.eMailAddress}
            error={errors.email?.message}
            required
          />
          <UIFormInput
            type="password"
            name="password"
            register={register}
            placeholder={state.strings.password}
            error={errors.password?.message}
            required
          />
          <UiButton type="submit" disabled={!isValid}>
            {state.strings.login}
          </UiButton>
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
