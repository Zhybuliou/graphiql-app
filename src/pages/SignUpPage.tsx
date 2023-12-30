import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from 'react-toastify';
import { auth, registerWithEmailAndPassword } from '../firebase/firebase';
import { useLocale } from '../context/local';
import { RoutePaths } from '../types/enums/routePaths';
import { ISignUpForm } from '../types/interfaces/ISignUpForm';
import { signUpValidationSchema } from '../utils/validationSchemes';
import { PageWrapper } from '../components/ui/PageWrapper';
import { FormWrapper } from '../components/ui/FormWrapper';
import { UIFormInput } from '../components/ui/UIFormInput';
import { UiButton } from '../components/ui/UiButton';

function SignUpPage() {
  const { state } = useLocale();
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate(RoutePaths.SIGNIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignUpForm>({
    resolver: yupResolver(signUpValidationSchema),
    mode: 'onChange',
  });

  const onError = (err: Error) => {
    toast.error(err.message, {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const registerUser: SubmitHandler<ISignUpForm> = ({
    name,
    email,
    password,
  }) => {
    registerWithEmailAndPassword(name, email, password).catch(onError);
  };

  return (
    <PageWrapper>
      <h1>{state.strings.signUpPlease}</h1>
      <form onSubmit={handleSubmit(registerUser)}>
        <FormWrapper>
          <UIFormInput
            type="text"
            name="name"
            register={register}
            placeholder={state.strings.name}
            error={errors.name?.message}
            required
          />
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
          <UIFormInput
            type="password"
            name="confirmPassword"
            register={register}
            placeholder={state.strings.confirmPassword}
            error={errors.confirmPassword?.message}
            required
          />
          <UiButton type="submit" disabled={!isValid}>
            {state.strings.signUp}
          </UiButton>
          <div className="mt-4">
            {state.strings.haveAccount}
            <Link to={RoutePaths.SIGNIN}>{state.strings.signIn}</Link>
          </div>
        </FormWrapper>
      </form>
    </PageWrapper>
  );
}
export default SignUpPage;
