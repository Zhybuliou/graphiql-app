/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { PropsWithChildren } from '../../../types/utilityTypes';

function Button({
  children,
  type,
  ...attributes
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type={type === 'submit' ? 'submit' : 'button'}
      {...attributes}
    >
      {children}
    </button>
  );
}

export default Button;
