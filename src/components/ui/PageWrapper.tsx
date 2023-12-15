import React from 'react';
import { PropsWithChildren } from '../../types/utilityTypes';

function PageWrapper({
  classNames,
  children,
}: PropsWithChildren<{ classNames?: string }>) {
  return (
    <div
      className={`flex flex-col items-center text-center ${classNames || ''}`}
    >
      {children}
    </div>
  );
}

export default PageWrapper;
