import React from 'react';
import { GraphQLField, GraphQLSchema } from 'graphql';
import ListItem from '../ui/ListItem';
import { TypeToExplorer } from './types';
import SectionTitle from './ui/SectionTitle';
import TabWrapper from './ui/TabWrapper';
import TypeInfo from './ui/TypeInfo';

type QueriesTabProps = {
  clientSchema: GraphQLSchema;
  setOpenTypes: React.Dispatch<React.SetStateAction<TypeToExplorer[]>>;
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
            <ListItem
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
            </ListItem>
          );
        })}
      </ul>
    </TabWrapper>
  );
}

export default QueriesTab;
