/* eslint-disable react/no-array-index-key */

import React from 'react';
import { GraphQLSchema } from 'graphql';
import { QueriesTab } from './QueriesTab';
import { TypeTabLayout } from './TypeTab/TypeTabLayout';
import { useSchemaViewer } from './useSchemaViewer';
import { SchemaViewerLayout } from './SchemaViewerLayout';
import { UiButton } from '../ui/UiButton';
import { TabHeader } from './TypeTab/TabHeader';
import { TabDescription } from './TypeTab/TabDescription';
import { TabDetails } from './TypeTab/TabDetails';
import { TabArguments } from './TypeTab/TabArguments';

export function SchemaViewer({ schema }: { schema: GraphQLSchema }) {
  const { isOpen, setIsOpen, queries, openedTypes, setOpenedTypes } =
    useSchemaViewer(schema);

  return (
    <SchemaViewerLayout
      isOpen={isOpen}
      buttonOpen={
        <UiButton
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className="p-1 text-sm tracking-widest rounded-none rounded-t-lg"
        >
          Schema
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
