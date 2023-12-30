import React from 'react';
import { GraphQLScalarType } from 'graphql/type';
import { SectionTitle } from '../../ui/SectionTitle';
import { FieldInfo } from '../../ui/FieldInfo';

export function TabDetailsScalar({
  scalarType,
}: {
  scalarType: GraphQLScalarType;
}) {
  return (
    <div>
      <SectionTitle>Type Details</SectionTitle>
      <p className="my-2">{scalarType.description}</p>
      <FieldInfo name="scalar" type={scalarType.name} />
    </div>
  );
}
