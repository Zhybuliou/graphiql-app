import React from 'react';
import { GraphQLSchema } from 'graphql';
import ListItem from '../ui/ListItem';
import EndpointDescription from '../endpointDescription/EndpointDescription';

type SchemaProps = {
  clientSchema: GraphQLSchema;
};

function Queries({ clientSchema }: SchemaProps) {
  const queryType = clientSchema.getQueryType();

  if (!queryType) {
    return <h2>!queryType</h2>;
  }

  const endpoints = Object.values(queryType.getFields());

  return (
    <>
      <p>QUERIES</p>
      <ul>
        {endpoints.map((field) => {
          return (
            <ListItem onClick={() => {}} key={field.name}>
              <EndpointDescription field={field} />
            </ListItem>
          );
        })}
      </ul>
    </>
  );
}

export default Queries;
