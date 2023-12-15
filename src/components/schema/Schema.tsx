import React from 'react';
import { GraphQLSchema } from 'graphql';

import Queries from './Queries';

type SchemaProps = {
  clientSchema: GraphQLSchema | null;
};

function Schema({ clientSchema }: SchemaProps) {
  if (!clientSchema) return null;

  return (
    <div className="fixed w-80 h-full right-0 bg-white shadow">
      <Queries clientSchema={clientSchema} />
    </div>
  );
}

export default Schema;
