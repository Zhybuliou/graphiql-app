/* eslint-disable no-console */

import React, { useState } from 'react';
import {
  buildClientSchema,
  // GraphQLList,
  // GraphQLObjectType,
  GraphQLSchema,
  printSchema,
} from 'graphql';
import Button from '../ui/Button';
import SCHEMA_QUERY from './schemaQuery';

const API_URL = 'https://rickandmortyapi.com/graphql';

function Schema() {
  const [apiUrl, setApiUrl] = useState<string>(API_URL);
  const [apiRequest, setApiRequest] = useState<string>(SCHEMA_QUERY);
  const [clientSchema, setClientSchema] = useState<GraphQLSchema | null>(null);

  async function makeRequest(query: string) {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept-Encoding': 'gzip',
      },
      body: JSON.stringify({ query }),
    });
    const schema = await response.json();
    console.log(schema.data);
    setClientSchema(buildClientSchema(schema.data));
  }

  function getEndpoints() {
    if (!clientSchema) return '';
    return printSchema(clientSchema);

    // const query = clientSchema.getQueryType();
    // if (!query) return '';
    // const mapOfEndpoints = query.getFields();
    // return Object.values(mapOfEndpoints).map((endpoint) => {
    //   const { name, description, type } = endpoint;
    //   let typeName = 'NO_TYPE!!!';
    //   if (type instanceof GraphQLObjectType) {
    //     typeName = type.name;
    //   }
    //   if (type instanceof GraphQLList) {
    //     typeName = type.ofType.toString();
    //   }
    //   return `${name} : ${typeName} === ${description}\n`;
    // });
  }

  return (
    <div className="flex flex-col w-full gap-3">
      <input
        type="text"
        value={apiUrl}
        className="border-2 border-black"
        onChange={(event) => setApiUrl(event.target.value)}
      />
      <textarea
        key="apiRequest"
        value={apiRequest}
        rows={10}
        className="border-2 border-black"
        onChange={(event) => setApiRequest(event.target.value)}
      />
      <Button type="button" onClick={() => makeRequest(apiRequest)}>
        Get Schema
      </Button>
      {clientSchema && (
        <textarea
          className="border-2 border-black"
          rows={10}
          defaultValue={getEndpoints()}
          readOnly
        />
      )}
    </div>
  );
}

export default Schema;
