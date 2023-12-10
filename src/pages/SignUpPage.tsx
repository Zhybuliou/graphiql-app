import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { auth, registerWithEmailAndPassword } from '../firebase/firebase';
import { useLocale } from '../context/local';
import RoutePaths from '../types/enums/routePaths';
import ISignUpForm from '../types/interfaces/ISignUpForm';
import validationSchema from '../utils/validationSchema';
import PageWrapper from '../components/ui/pageWrapper/PageWrapper';
import FormWrapper from '../components/ui/FormWrapper';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/button/Button';

function SignUpPage() {
  const { state } = useLocale();
  const [user, loading] = useAuthState(auth);

  const registerUser = (name: string, email: string, password: string) => {
    if (!name) return;
    registerWithEmailAndPassword(name, email, password);
  };

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
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ISignUpForm> = (data) => {
    registerUser(data.name, data.email, data.password);
  };

  return (
    <PageWrapper>
      <h1>{state.strings.signUpPlease}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <FormInput
            type="text"
            name="name"
            register={register}
            placeholder={state.strings.name}
            error={errors.name?.message}
            required
          />
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
          <FormInput
            type="password"
            name="confirmPassword"
            register={register}
            placeholder={state.strings.confirmPassword}
            error={errors.confirmPassword?.message}
            required
          />
          <Button type="submit" disabled={!isValid}>
            {state.strings.signUp}
          </Button>
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
