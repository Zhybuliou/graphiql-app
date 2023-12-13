/* eslint-disable no-console */

import React, { useEffect, useState } from 'react';
import { buildClientSchema, GraphQLSchema, printType } from 'graphql';

import Button from '../ui/Button';
import SCHEMA_QUERY from './schemaQuery';

const API_URL = 'https://rickandmortyapi.com/graphql';

function Schema() {
  const [apiUrl, setApiUrl] = useState<string>(API_URL);
  const [apiRequest, setApiRequest] = useState<string>(SCHEMA_QUERY);
  const [result, setResult] = useState<string>('');
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
    // console.log(schema.data);
    setClientSchema(buildClientSchema(schema.data));
  }

  useEffect(() => {
    if (!clientSchema) {
      setResult('!clientSchema');
      return;
    }
    const query = clientSchema.getQueryType();
    if (!query) {
      setResult('!query');
      return;
    }
    setResult(() => printType(query));
  }, [clientSchema]);

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
        <div>
          {Object.values(clientSchema.getTypeMap()).map((type) => {
            return (
              <Button
                key={type.name}
                onClick={() => setResult(printType(type))}
              >
                {type.name}
              </Button>
            );
          })}
        </div>
      )}
      {clientSchema && (
        <textarea
          className="border-2 border-black"
          rows={10}
          value={result}
          readOnly
        />
      )}
    </div>
  );
}

export default Schema;
