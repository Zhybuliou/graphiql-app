import React, { useEffect, useState } from 'react';
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLSchema,
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
  const [apiRequest, setApiRequest] = useState<string>(() =>
    getIntrospectionQuery()
  );
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
    setResult(printType(query));
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
