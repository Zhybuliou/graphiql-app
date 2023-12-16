import React from 'react';
import { GraphQLScalarType } from 'graphql/type';
import SectionTitle from '../../ui/SectionTitle';
import FieldInfo from '../../ui/FieldInfo';

export default function TabDetailsScalar({
  type,
}: {
  type: GraphQLScalarType;
}) {
  return (
    <>
      <SectionTitle>Type Details</SectionTitle>
      <p>{type.description}</p>
      <FieldInfo name="scalar" type={type.name} />
    </>
  );
}
