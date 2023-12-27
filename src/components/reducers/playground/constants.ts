export const BASE_QUERY_STRING = `query ($filter: FilterCharacter) {
  characters(filter: $filter) {
    results {
      name
    }
  }
}
`;

export const BASE_ENDPOINT = 'https://rickandmortyapi.com/graphql';

export const BASE_VARIABLES = `{ 
    "filter": {
       "name":   "black"
       }
      }`;
