/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { GraphQLSchema } from 'graphql';

import { isInputType } from 'graphql/type';
import Queries from './Queries';
import { TypeToExplorer } from './types';
import TypeExplorer from './TypeExplorer';

type SchemaProps = {
  clientSchema: GraphQLSchema | null;
};

function Schema({ clientSchema }: SchemaProps) {
  const [openTypes, setOpenTypes] = useState<TypeToExplorer[]>([]);

  if (!clientSchema) return null;

  return (
    <div className="absolute flex h-full right-0 bg-white shadow">
      <Queries clientSchema={clientSchema} setOpenTypes={setOpenTypes} />

      {openTypes.map((typeToExplorer, index) => {
        const key = isInputType(typeToExplorer)
          ? typeToExplorer.toString()
          : typeToExplorer.name;
        return (
          <TypeExplorer
            key={`${key}${index}`}
            typeToExplorer={typeToExplorer}
            typeIndex={index}
            setOpenTypes={setOpenTypes}
            clientSchema={clientSchema}
          />
        );
      })}
    </div>
  );
}

export default Schema;
