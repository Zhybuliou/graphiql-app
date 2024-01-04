import { expect } from 'vitest';
import { BASE_QUERY_STRING, BASE_VARIABLES } from '../context/local/constants';
import { prettifyGraphQLQuery } from './prettifyGraphQLQuery';

describe('Check render prettifyGraphQLQuery', () => {
  it('check work prettify query', () => {
    const stringQuery = prettifyGraphQLQuery(BASE_QUERY_STRING);
    const expectString = `query($filter: FilterCharacter) { characters(filter:$filter) { results { name } } } `;
    expect(stringQuery).toEqual(prettifyGraphQLQuery(expectString));
  });
  it('check work prettify variables', () => {
    const stringQuery = prettifyGraphQLQuery(BASE_VARIABLES);
    const expectString = `{ "filter":  { 'name': "black" } }`;
    expect(stringQuery).toEqual(prettifyGraphQLQuery(expectString));
  });
  it('check work prettify ,', () => {
    const stringQuery = prettifyGraphQLQuery('{"filter","black"}');
    const expectString = ' { \n  "filter", "black"\n} ';
    expect(stringQuery).toEqual(expectString);
  });
});
