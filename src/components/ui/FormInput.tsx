import { Path, UseFormRegister } from 'react-hook-form';
import React from 'react';
import ISignUpForm from '../../types/interfaces/ISignUpForm';

type FormInputProps = {
  type: React.HTMLInputTypeAttribute;
  name: Path<ISignUpForm>;
  register: UseFormRegister<ISignUpForm>;
  required: boolean;
  placeholder: string;
  error: string | undefined;
};

function FormInput({
  type,
  name,
  register,
  required,
  placeholder,
  error = '',
}: FormInputProps) {
  return (
    <label htmlFor={name} className="relative w-72 mb-6">
      <input
        type={type}
        id={name}
        className="p-4 text-base w-full"
        {...register(name, { required })}
        placeholder={placeholder}
      />
      {error && <div className="absolute -bottom-5 text-red-700">{error}</div>}
    </label>
  );
}

export default FormInput;
