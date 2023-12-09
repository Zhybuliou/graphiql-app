import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { auth, registerWithEmailAndPassword } from '../../firebase/firebase';
import { useLocale } from '../../context/local';
import RoutePaths from '../../types/enums/routePaths';
import IForm from '../../types/interfaces/IForm';
import validationSchema from '../../utils/validationSchema';
import './SignUpPage.css';

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
  } = useForm<IForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IForm> = (data) => {
    registerUser(data.name, data.email, data.password);
  };

  return (
    <div className="register">
      <h1>{state.strings.signUpPlease}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="register__container">
        <input
          type="text"
          {...register('name')}
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          placeholder={state.strings.name}
        />
        <div className="invalid-feedback">{errors.name?.message}</div>
        <input
          type="text"
          {...register('email')}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          placeholder={state.strings.eMailAddress}
        />
        <div className="invalid-feedback">{errors.email?.message}</div>
        <input
          type="password"
          {...register('password')}
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          placeholder={state.strings.password}
        />
        <div className="invalid-feedback">{errors.password?.message}</div>

        <input
          type="password"
          {...register('confirmPassword')}
          className={`form-control ${
            errors.confirmPassword ? 'is-invalid' : ''
          }`}
          placeholder={state.strings.confirmPassword}
        />
        <div className="invalid-feedback">
          {errors.confirmPassword?.message}
        </div>
        <button type="submit" className="register__btn" disabled={!isValid}>
          {state.strings.signUp}
        </button>
        <div className="about-account">
          {state.strings.haveAccount}
          <Link to={RoutePaths.SIGNIN}>{state.strings.signIn}</Link>
        </div>
      </form>
    </div>
  );
}
export default SignUpPage;
