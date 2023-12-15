import React from 'react';
import { GraphQLSchema, GraphQLField } from 'graphql';
import ListItem from '../ui/ListItem';
import EndpointDescription from '../endpointDescription/EndpointDescription';

type SchemaProps = {
  clientSchema: GraphQLSchema;
  setOpenTypes: React.Dispatch<
    React.SetStateAction<GraphQLField<unknown, unknown, unknown>[]>
  >;
};

function Queries({ clientSchema, setOpenTypes }: SchemaProps) {
  const queryType = clientSchema.getQueryType();

  if (!queryType) {
    return <h2>!queryType</h2>;
  }

  const endpoints = Object.values(queryType.getFields());

  return (
    <div className="w-80">
      <p>QUERIES</p>
      <ul>
        {endpoints.map((field) => {
          return (
            <ListItem
              onClick={() => {
                setOpenTypes([field]);
              }}
              key={field.name}
            >
              <EndpointDescription field={field} />
            </ListItem>
          );
        })}
      </ul>
    </div>
  );
}

export default Queries;
