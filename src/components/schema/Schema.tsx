/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { GraphQLSchema } from 'graphql';

import QueriesTab from './QueriesTab';
import { TypeToDisplay } from './types';
import TypeTab from './TypeTab/TypeTab';

type SchemaProps = {
  clientSchema: GraphQLSchema | null;
};

function Schema({ clientSchema }: SchemaProps) {
  const [openedTypes, setOpenedTypes] = useState<TypeToDisplay[]>([]);

  if (!clientSchema) return null;

  return (
    <div className="absolute flex h-full right-0 bg-white shadow">
      <QueriesTab clientSchema={clientSchema} setOpenTypes={setOpenedTypes} />

      {openedTypes.map((typeToDisplay, index) => {
        return (
          <TypeTab
            key={`${typeToDisplay.name}${index}`}
            typeToDisplay={typeToDisplay}
            tabIndex={index}
            setOpenedTypes={setOpenedTypes}
          />
        );
      })}
    </div>
  );
}

export default Schema;
