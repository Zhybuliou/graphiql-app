/* eslint-disable no-console */
const baseEndPoint = 'https://rickandmortyapi.com/graphql';
const baseQuery = `
query allCharacters {
  characters {
    results {
      name,
      id
    }
  }
}
`;

export const tempFetch = (
  endpoint: string,
  query: string,
  variables1: string
) => {
  const finalEndpoint = endpoint === '' ? baseEndPoint : endpoint;
  const finalQuery = query === '' ? baseQuery : query;
  fetch(finalEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: finalQuery,
      variables: JSON.parse(variables1),
    }),
  })
    .then((res) => res.json())
    .then((result) => console.log(result.data.characters));
};
