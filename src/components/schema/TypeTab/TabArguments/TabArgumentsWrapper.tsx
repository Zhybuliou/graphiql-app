import React from 'react';
import { PropsWithChildren } from '../../../../types/utilityTypes';
import SectionTitle from '../../ui/SectionTitle';

export default function TabArgumentsWrapper({ children }: PropsWithChildren) {
  return (
    <>
      <SectionTitle>Type Arguments</SectionTitle>
      <ul>{children}</ul>
    </>
  );
}
