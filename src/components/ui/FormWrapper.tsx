import React from 'react';
import { PropsWithChildren } from '../../types/utilityTypes';

function FormWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center p-10 text-center bg-gray-400 rounded-lg">
      {children}
    </div>
  );
}

export default FormWrapper;
