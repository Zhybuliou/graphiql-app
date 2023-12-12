/* eslint-disable no-console */

import React, { useState } from 'react';
import Button from '../ui/Button';
import SCHEMA_QUERY from './schemaQuery';

const API_URL = 'https://rickandmortyapi.com/graphql';

function Schema() {
  const [apiUrl, setApiUrl] = useState<string>(API_URL);
  const [apiResponse, setApiResponse] = useState<string>('');
  const [apiRequest, setApiRequest] = useState<string>(SCHEMA_QUERY);

  async function makeRequest(query: string) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept-Encoding': 'gzip',
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    setApiResponse(JSON.stringify(data, null, 2));
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
        Send request
      </Button>
      <textarea
        key="apiResponse"
        rows={10}
        className="border-2 border-black"
        defaultValue={apiResponse}
      />
    </div>
  );
}

export default Schema;
