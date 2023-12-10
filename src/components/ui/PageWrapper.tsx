import React from 'react';
import { PropsWithChildren } from '../../types/utilityTypes';

function PageWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center text-center p-5">{children}</div>
  );
}

export default PageWrapper;
