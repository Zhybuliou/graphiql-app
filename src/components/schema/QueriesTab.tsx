import React from 'react';
import { GraphQLField, GraphQLSchema } from 'graphql';
import ListItem from '../ui/ListItem';
import { TypeToExplorer } from './types';
import FieldInfo from './ui/FieldInfo';

type QueriesTabProps = {
  clientSchema: GraphQLSchema;
  setOpenTypes: React.Dispatch<React.SetStateAction<TypeToExplorer[]>>;
};

function QueriesTab({ clientSchema, setOpenTypes }: QueriesTabProps) {
  const queryType = clientSchema.getQueryType();

  if (!queryType) {
    return <h2>!queryType</h2>;
  }

  const endpoints = Object.values(queryType.getFields());

  function handleClickEndpoint(field: GraphQLField<unknown, unknown, unknown>) {
    setOpenTypes([field]);
  }

  return (
    <div className="w-80">
      <p>QUERIES</p>
      <ul>
        {endpoints.map((field) => {
          return (
            <ListItem
              onClick={() => {
                handleClickEndpoint(field);
              }}
              key={field.name}
            >
              <FieldInfo
                name={field.name}
                type={field.type.toString()}
                split="(...): "
              />
            </ListItem>
          );
        })}
      </ul>
    </div>
  );
}

export default QueriesTab;
