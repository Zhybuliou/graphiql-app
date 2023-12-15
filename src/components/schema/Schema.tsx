import React, { useState } from 'react';
import { GraphQLField, GraphQLSchema } from 'graphql';

import Queries from './Queries';
import TypeExplorer from './TypeExplorer';

type SchemaProps = {
  clientSchema: GraphQLSchema | null;
};

function Schema({ clientSchema }: SchemaProps) {
  const [openTypes, setOpenTypes] = useState<
    GraphQLField<unknown, unknown, unknown>[]
  >([]);

  if (!clientSchema) return null;

  return (
    <div className="absolute flex h-full right-0 bg-white shadow">
      <Queries clientSchema={clientSchema} setOpenTypes={setOpenTypes} />
      {openTypes.map((type, index) => {
        return (
          <TypeExplorer
            key={`${type.toString()}`}
            field={type}
            index={index}
            setOpenTypes={setOpenTypes}
          />
        );
      })}
    </div>
  );
}

export default Schema;
