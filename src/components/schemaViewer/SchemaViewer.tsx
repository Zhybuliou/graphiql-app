/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { GraphQLSchema } from 'graphql';

import QueriesTab from './QueriesTab';
import { TypeToDisplay } from './types';
import TypeTab from './TypeTab/TypeTab';
import { useSchemaViewer } from './useSchemaViewer';

function SchemaViewer({ schema }: { schema: GraphQLSchema }) {
  const { queries } = useSchemaViewer(schema);
  const [openedTypes, setOpenedTypes] = useState<TypeToDisplay[]>([]);

  if (!schema) return null;

  return (
    <div className="absolute z-20 flex h-full right-0 top-0 bg-white shadow">
      <QueriesTab queries={queries} setOpenTypes={setOpenedTypes} />

      {openedTypes.map((typeToDisplay, index) => {
        return (
          <TypeTab
            key={index}
            typeToDisplay={typeToDisplay}
            tabIndex={index}
            setOpenedTypes={setOpenedTypes}
          />
        );
      })}
    </div>
  );
}

export default SchemaViewer;
