import { buildClientSchema, getIntrospectionQuery } from 'graphql';

async function createGraphQlSchema(endpoint: string) {
  const query = getIntrospectionQuery();
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept-Encoding': 'gzip',
    },
    body: JSON.stringify({ query }),
  });
  const schema = await response.json();
  const result = await buildClientSchema(schema.data);
  return result;
}

export default createGraphQlSchema;
