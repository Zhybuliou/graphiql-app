import React from 'react';
import { GraphQLField } from 'graphql';

function EndpointDescription({
  field,
}: {
  field: GraphQLField<unknown, unknown>;
}) {
  return (
    <>
      <span className="text-red-700">{field.name}</span>
      <span>(...):</span>
      <span className="text-amber-600">{field.type.toString()}</span>
    </>
  );
}

export default EndpointDescription;
