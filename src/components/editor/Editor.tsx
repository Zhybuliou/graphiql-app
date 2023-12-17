/* eslint-disable no-console */

import React, { useEffect, useState } from 'react';
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLField,
  GraphQLSchema,
  isObjectType,
  printType,
} from 'graphql';

import Button from '../ui/Button';

const API_URL = 'https://rickandmortyapi.com/graphql';

type EditorProps = {
  clientSchema: GraphQLSchema | null;
  setClientSchema: React.Dispatch<React.SetStateAction<GraphQLSchema | null>>;
};

function Editor({ clientSchema, setClientSchema }: EditorProps) {
  const [apiUrl, setApiUrl] = useState<string>(API_URL);
  const [apiRequest, setApiRequest] = useState<string>(getIntrospectionQuery());
  const [result, setResult] = useState<string>('');

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

  function getTypeInfo(name: string, typeName: string) {
    if (!clientSchema) return '!clientSchema';
    const type = clientSchema.getType(typeName);
    if (!type) return '!type';
    return `${name} :: ${type.name} `;
  }

  function handleGetTypeInfo(field: GraphQLField<unknown, unknown>) {
    if (!isObjectType(field.type)) {
      setResult('!isObjectType(field.type)');
      return;
    }

    const fieldsInside = field.type.getFields();
    const res = Object.values(fieldsInside)
      .map((fieldInside) =>
        getTypeInfo(fieldInside.name, fieldInside.type.toString())
      )
      .join('\n');

    setResult(
      `${field.name}( \n  \n ${
        field.description
      } \n ${field.type.toString()}\n${res}`
    );
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
        <div>
          {Object.values(clientSchema.getQueryType()!.getFields()).map(
            (endpoint) => {
              return (
                <Button
                  key={endpoint.name}
                  onClick={() => handleGetTypeInfo(endpoint)}
                >
                  {`${endpoint.name}(...): ${endpoint.type.toString()}`}
                </Button>
              );
            }
          )}
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

export default Editor;
