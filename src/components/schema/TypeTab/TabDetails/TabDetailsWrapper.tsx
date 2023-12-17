import React from 'react';
import { PropsWithChildren } from '../../../../types/utilityTypes';
import SectionTitle from '../../ui/SectionTitle';

export default function TabDetailsWrapper({
  children,
  typeName,
}: PropsWithChildren<{ typeName: string }>) {
  return (
    <div>
      <SectionTitle>Type Details</SectionTitle>
      <p>
        <span className="text-blue-600">type</span>{' '}
        <span className="text-red-700">{typeName}</span>
        {'{'}
      </p>
      {children}
      {'}'}
    </div>
  );
}
