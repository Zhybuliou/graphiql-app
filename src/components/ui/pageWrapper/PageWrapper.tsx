import React from 'react';
import { PropsWithChildren } from '../../../types/utilityTypes';

function PageWrapper({ children }: PropsWithChildren) {
  return <div className="container m-auto text-center">{children}</div>;
}

export default PageWrapper;
