import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import React from 'react';

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
  return (
    <label htmlFor={name} className="relative w-80 mb-6">
      <input
        type={type}
        id={name}
        className="p-4 text-base w-full"
        {...register(name, { required })}
        placeholder={placeholder}
      />
      {error && (
        <div className="absolute -bottom-5 text-red-700 select-none">
          {error}
        </div>
      )}
    </label>
  );
}

export default UIFormInput;
