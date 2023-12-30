import React from 'react';
import { GraphQLField } from 'graphql';
import { UiListItem } from '../ui/UiListItem';
import { TypeToDisplay } from './types';
import { SectionTitle } from './ui/SectionTitle';
import { TypeInfo } from './ui/TypeInfo';

type QueriesTabProps = {
  queries: GraphQLField<unknown, unknown, unknown>[];
  setOpenedTypes: React.Dispatch<React.SetStateAction<TypeToDisplay[]>>;
};

export function QueriesTab({ queries, setOpenedTypes }: QueriesTabProps) {
  function handleClickEndpoint(field: GraphQLField<unknown, unknown, unknown>) {
    setOpenedTypes([field]);
  }

  return (
    <div className="relative flex flex-col gap-4 w-80 overflow-y-scroll shrink-0 p-2 text-left bg-schema-gradient">
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
      <div className="absolute -z-10 top-0 left-0 h-full w-full opacity-25 bg-schema-pattern" />
    </div>
  );
}
