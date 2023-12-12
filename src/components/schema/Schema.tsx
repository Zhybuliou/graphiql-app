/* eslint-disable no-console */

import React, { useState } from 'react';
import { buildClientSchema, GraphQLSchema } from 'graphql';
import { GraphQLObjectType } from 'graphql/type/definition';
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
    setClientSchema(buildClientSchema(schema.data));
  }

  function getEndpoints() {
    const query = clientSchema?.getTypeMap().Query as GraphQLObjectType;
    const mapOfEndpoints = query.getFields();
    return Object.keys(mapOfEndpoints).join('\n');
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
        Get Endpoints
      </Button>
      {clientSchema && (
        <textarea
          className="border-2 border-black"
          rows={10}
          defaultValue={getEndpoints()}
        />
      )}
    </div>
  );
}

export default Schema;
