import { fireEvent, render, waitFor } from '@testing-library/react';

import { buildClientSchema, getIntrospectionQuery } from 'graphql/index';
import { vitest } from 'vitest';
import { Playground } from '../playground/Playground';
import { BASE_ENDPOINT } from '../reducers/playground/constants';

import { createHeadersOfRequest } from '../../utils/createHeadersOfRequest';
import { createBodyOfRequest } from '../../utils/createBodyOfRequest';
import { makeRequest } from '../../services/makeRequest';
import SchemaViewer from './SchemaViewer';
import { LocaleProvider } from '../../context/local';

test('Show schema viewer when click button to open aside', () => {
  const screen = render(
    <LocaleProvider>
      <Playground />
    </LocaleProvider>
  );
  const schemaButton = screen.getByTestId('schema-button');
  fireEvent.click(schemaButton);
  waitFor(() => {
    expect(screen.getByText(/QUERIES/i)).toBeInTheDocument();
  });
});

test('Show queries of schema', async () => {
  const requestHeaders = createHeadersOfRequest('');
  const query = getIntrospectionQuery();
  const requestBody = createBodyOfRequest('', query);
  const schemaData = await makeRequest(
    BASE_ENDPOINT,
    requestHeaders,
    requestBody
  );
  const schema = buildClientSchema(schemaData.data);
  const setIsOpenMock = vitest.fn();
  const { getByText, getAllByRole } = render(
    <LocaleProvider>
      <SchemaViewer schema={schema} setIsOpen={setIsOpenMock} isOpen />
    </LocaleProvider>
  );
  expect(getByText(/QUERIES/i)).toBeInTheDocument();
  expect(getAllByRole('listitem').length).toBe(9);
});
