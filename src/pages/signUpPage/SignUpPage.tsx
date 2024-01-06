import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from 'react-toastify';
import { auth, registerWithEmailAndPassword } from '../../firebase/firebase';
import { useLocale } from '../../context/local';
import { RoutePaths } from '../../types/enums/routePaths';
import { signUpValidationSchema } from '../../utils/validationSchemes';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { FormWrapper } from '../../components/ui/FormWrapper';
import { UIFormInput } from '../../components/ui/UIFormInput';
import { UiButton } from '../../components/ui/UiButton';

interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

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

  const onError = () => {
    toast.error(state.strings.signUpPageFirebaseError, {
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
      <h1 className="text-black font-inter text-xl font-medium">
        {state.strings.signUpPageTitle}
      </h1>
      <form onSubmit={handleSubmit(registerUser)}>
        <FormWrapper>
          <UIFormInput
            type="text"
            name="name"
            register={register}
            placeholder={state.strings.name}
            error={
              errors.name?.message ? state.strings[errors.name.message] : null
            }
            required
          />
          <UIFormInput
            type="text"
            name="email"
            register={register}
            placeholder={state.strings.eMailAddress}
            error={
              errors.email?.message ? state.strings[errors.email.message] : null
            }
            required
          />
          <UIFormInput
            type="password"
            name="password"
            register={register}
            placeholder={state.strings.password}
            error={
              errors.password?.message
                ? state.strings[errors.password.message]
                : null
            }
            required
          />
          <UIFormInput
            type="password"
            name="confirmPassword"
            register={register}
            placeholder={state.strings.confirmPassword}
            error={
              errors.confirmPassword?.message
                ? state.strings[errors.confirmPassword.message]
                : null
            }
            required
          />
          <UiButton
            type="submit"
            disabled={!isValid}
            data-testid="button-signUp"
          >
            {state.strings.signUp}
          </UiButton>
          <div className="mt-4 mb-4">
            {state.strings.signUpPageHaveAccount}
            <Link to={RoutePaths.SIGNIN}>{state.strings.signIn}</Link>
          </div>
        </FormWrapper>
      </form>
    </PageWrapper>
  );
}
export default SignUpPage;
