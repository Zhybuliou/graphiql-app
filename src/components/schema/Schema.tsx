/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { GraphQLSchema } from 'graphql';

import QueriesTab from './QueriesTab';
import { TypeToExplorer } from './types';
import TypeTab from './TypeTab/TypeTab';

type SchemaProps = {
  clientSchema: GraphQLSchema | null;
};

function Schema({ clientSchema }: SchemaProps) {
  const [openTypes, setOpenTypes] = useState<TypeToExplorer[]>([]);

  if (!clientSchema) return null;

  return (
    <div className="absolute flex h-full right-0 bg-white shadow">
      <QueriesTab clientSchema={clientSchema} setOpenTypes={setOpenTypes} />

      {openTypes.map((type, index) => {
        return (
          <TypeTab
            key={`${type.name}${index}`}
            typeToExplorer={type}
            tabIndex={index}
            setOpenTypes={setOpenTypes}
            clientSchema={clientSchema}
          />
        );
      })}
    </div>
  );
}

export default Schema;
