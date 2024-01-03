import React from 'react';
import { PropsWithChildren } from '../../types/utilityTypes';

function FormWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center text-center">{children}</div>
  );
}

export default FormWrapper;
