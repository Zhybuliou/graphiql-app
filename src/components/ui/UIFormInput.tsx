import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import React, { useState } from 'react';
import IconView from './icons/IconView';
import IconNoView from './icons/IconNoView';

type UiFormInputProps<T extends FieldValues> = {
  type: React.HTMLInputTypeAttribute;
  name: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  placeholder: string;
  error: string | undefined;
};

function UIFormInput<T extends FieldValues>({
  type,
  name,
  register,
  required,
  placeholder,
  error = '',
}: UiFormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <label htmlFor={name} className="relative w-80 mb-6 text-black">
      <input
        type={showPassword ? 'text' : type}
        id={name}
        className={`p-4 text-base w-full rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 ${
          error ? ' border-red-400' : 'border-gray-200'
        }`}
        {...register(name, { required })}
        placeholder={placeholder}
      />
      {type === 'password' && (
        <span
          aria-hidden="true"
          className="absolute top-5 right-5 cursor-pointer"
          onClick={handleTogglePassword}
        >
          {showPassword ? (
            <IconView className="w-4 h-4" />
          ) : (
            <IconNoView className="w-4 h-4" />
          )}
        </span>
      )}
      {error && <div className="text-red-400 select-none">{error}</div>}
    </label>
  );
}

export default UIFormInput;
