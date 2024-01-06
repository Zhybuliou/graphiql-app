import { http, HttpResponse } from 'msw';
import { BASE_ENDPOINT } from '../components/reducers/playground/constants';
import { SCHEMA_FROM_SERVER } from './schemaFromServer';

export const handlers = [
  http.post(`${BASE_ENDPOINT}`, () => {
    return HttpResponse.json(SCHEMA_FROM_SERVER);
  }),
];
