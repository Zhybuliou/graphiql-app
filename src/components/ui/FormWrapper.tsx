import React from 'react';
import { PropsWithChildren } from '../../types/utilityTypes';

export function FormWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center text-center">{children}</div>
  );
}
