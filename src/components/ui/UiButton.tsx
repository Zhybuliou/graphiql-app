import React from 'react';
import { PropsWithChildren } from '../../types/utilityTypes';
import cn from '../../utils/cn';

function UiButton({
  children,
  type = 'button',
  className = '',
  disabled = false,
  ...attributes
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={cn(
        `text-white text-lg py-2 px-4 rounded-xl bg-blue-500 hover:bg-blue-500 ${
          type === 'submit' ? 'w-full' : ''
        }`,
        className,
        { 'bg-slate-300 select-none pointer-events-none': disabled }
      )}
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
      {...attributes}
    >
      {children}
    </button>
  );
}

export default UiButton;
