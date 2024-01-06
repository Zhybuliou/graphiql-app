/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { GraphQLSchema } from 'graphql';
import { QueriesTab } from './QueriesTab';
import { TabLayout } from './TabLayout';
import { SchemaViewerLayout } from './SchemaViewerLayout';
import { UiButton } from '../ui/UiButton';
import { TabHeader } from './TypeTab/TabHeader';
import { TabDescription } from './TypeTab/TabDescription';
import { TabDetails } from './TypeTab/TabDetails';
import { TabArguments } from './TypeTab/TabArguments';
import { TypeToDisplay } from './types';
import { IconClose } from '../ui/icons/IconClose';

export default function SchemaViewer({
  schema,
  isOpen,
  setIsOpen,
}: {
  schema: GraphQLSchema;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [openedTypes, setOpenedTypes] = useState<TypeToDisplay[]>([]);

  const queryType = schema.getQueryType();
  const queries = queryType ? Object.values(queryType.getFields()) : [];

  return (
    <SchemaViewerLayout
      isOpen={isOpen}
      buttonClose={
        <UiButton
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className="p-1 rounded-none rounded-l-lg"
        >
          <IconClose className="w-4 h-4 text-white" />
        </UiButton>
      }
      queriesTab={
        <QueriesTab queries={queries} setOpenedTypes={setOpenedTypes} />
      }
      openedTypeTabs={openedTypes.map((typeToDisplay, index) => {
        return (
          <TabLayout key={index}>
            <TabHeader typeToDisplay={typeToDisplay} />
            <TabDescription typeToDisplay={typeToDisplay} />
            <TabDetails
              typeToDisplay={typeToDisplay}
              tabIndex={index}
              setOpenedTypes={setOpenedTypes}
            />
            <TabArguments
              typeToDisplay={typeToDisplay}
              tabIndex={index}
              setOpenedTypes={setOpenedTypes}
            />
          </TabLayout>
        );
      })}
    />
  );
}
