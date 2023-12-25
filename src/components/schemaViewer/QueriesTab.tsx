import React from 'react';
import { GraphQLField } from 'graphql';
import UiListItem from '../ui/UiListItem';
import { TypeToDisplay } from './types';
import SectionTitle from './ui/SectionTitle';
import TabWrapper from './ui/TabWrapper';
import TypeInfo from './ui/TypeInfo';

type QueriesTabProps = {
  queries: GraphQLField<unknown, unknown, unknown>[];
  setOpenTypes: React.Dispatch<React.SetStateAction<TypeToDisplay[]>>;
};

function QueriesTab({ queries, setOpenTypes }: QueriesTabProps) {
  function handleClickEndpoint(field: GraphQLField<unknown, unknown, unknown>) {
    setOpenTypes([field]);
  }

  return (
    <TabWrapper>
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
    </TabWrapper>
  );
}

export default QueriesTab;
