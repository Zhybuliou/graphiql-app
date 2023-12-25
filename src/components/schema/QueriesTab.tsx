import React from 'react';
import { GraphQLField, GraphQLSchema } from 'graphql';
import UiListItem from '../ui/UiListItem';
import { TypeToDisplay } from './types';
import SectionTitle from './ui/SectionTitle';
import TabWrapper from './ui/TabWrapper';
import TypeInfo from './ui/TypeInfo';

type QueriesTabProps = {
  clientSchema: GraphQLSchema;
  setOpenTypes: React.Dispatch<React.SetStateAction<TypeToDisplay[]>>;
};

function QueriesTab({ clientSchema, setOpenTypes }: QueriesTabProps) {
  const queryType = clientSchema.getQueryType();

  if (!queryType) {
    return <TabWrapper>!queryType</TabWrapper>;
  }

  const endpoints = Object.values(queryType.getFields());

  function handleClickEndpoint(field: GraphQLField<unknown, unknown, unknown>) {
    setOpenTypes([field]);
  }

  return (
    <TabWrapper>
      <SectionTitle>Queries</SectionTitle>
      <ul>
        {endpoints.map((field) => {
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
