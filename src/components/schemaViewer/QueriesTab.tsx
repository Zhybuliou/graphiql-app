import React from 'react';
import { GraphQLField } from 'graphql';
import { UiListItem } from '../ui/UiListItem';
import { TypeToDisplay } from './types';
import { SectionTitle } from './ui/SectionTitle';
import { TypeInfo } from './ui/TypeInfo';
import { TabLayout } from './TabLayout';

type QueriesTabProps = {
  queries: GraphQLField<unknown, unknown, unknown>[];
  setOpenedTypes: React.Dispatch<React.SetStateAction<TypeToDisplay[]>>;
};

export function QueriesTab({ queries, setOpenedTypes }: QueriesTabProps) {
  function handleClickEndpoint(field: GraphQLField<unknown, unknown, unknown>) {
    setOpenedTypes([field]);
  }

  return (
    <TabLayout>
      <SectionTitle>Queries</SectionTitle>
      <ul>
        {queries.map((field) => {
          return (
            <UiListItem
              onClick={() => {
                handleClickEndpoint(field);
              }}
              key={field.name}
            >
              <TypeInfo
                name={field.name}
                type={field.type.toString()}
                split="(...): "
              />
            </UiListItem>
          );
        })}
      </ul>
    </TabLayout>
  );
}
