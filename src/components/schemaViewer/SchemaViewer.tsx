/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { GraphQLSchema } from 'graphql';
import { QueriesTab } from './QueriesTab';
import { TypeTabLayout } from './TypeTab/TypeTabLayout';
import { SchemaViewerLayout } from './SchemaViewerLayout';
import { UiButton } from '../ui/UiButton';
import { TabHeader } from './TypeTab/TabHeader';
import { TabDescription } from './TypeTab/TabDescription';
import { TabDetails } from './TypeTab/TabDetails';
import { TabArguments } from './TypeTab/TabArguments';
import { IconSparkles } from '../ui/icons/IconSparkles';
import { TypeToDisplay } from './types';

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
      buttonOpen={
        <UiButton
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className="p-1 text-sm tracking-widest rounded-none rounded-l-lg"
        >
          <IconSparkles className="w-4 h-4" />
        </UiButton>
      }
      queriesTab={
        <QueriesTab queries={queries} setOpenedTypes={setOpenedTypes} />
      }
      openedTypeTabs={openedTypes.map((typeToDisplay, index) => {
        return (
          <TypeTabLayout
            key={index}
            tabHeader={<TabHeader typeToDisplay={typeToDisplay} />}
            tabDescription={<TabDescription typeToDisplay={typeToDisplay} />}
            tabDetails={
              <TabDetails
                typeToDisplay={typeToDisplay}
                tabIndex={index}
                setOpenedTypes={setOpenedTypes}
              />
            }
            tabArguments={
              <TabArguments
                typeToDisplay={typeToDisplay}
                tabIndex={index}
                setOpenedTypes={setOpenedTypes}
              />
            }
          />
        );
      })}
    />
  );
}
