import { useEffect, useState } from 'react';
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLSchema,
} from 'graphql';
import { createHeadersOfRequest } from '../../utils/createHeadersOfRequest';
import { createBodyOfRequest } from '../../utils/createBodyOfRequest';
import { makeRequest } from '../../services/makeRequest';
import { AppStateActions, useAppState } from '../../context/appState';

export function usePlayground() {
  const { state, dispatch } = useAppState();
  const { headers, variables, endpoint, queryString } = state;

  const [error, setError] = useState<Error | null>(null);
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);

  function handleError(caughtError: unknown, errorTitle: string) {
    const errorMessage =
      caughtError instanceof Error ? caughtError.message : '';
    const fullErrorMessage = JSON.stringify(`${errorTitle} - ${errorMessage}`);
    setError(new Error(fullErrorMessage));
  }

  useEffect(() => {
    const getSchema = async () => {
      setError(null);
      const requestHeaders = createHeadersOfRequest('');
      const query = getIntrospectionQuery();
      const requestBody = createBodyOfRequest('', query);

      try {
        const schemaData = await makeRequest(
          endpoint,
          requestHeaders,
          requestBody
        );
        const clientSchema = buildClientSchema(schemaData.data);
        setSchema(clientSchema);
      } catch (caughtError) {
        handleError(caughtError, "Error. We can't get the schema.");
      }
    };

    getSchema();
  }, [endpoint]);

  function changeEndpointUrl(newUrl: string) {
    dispatch({
      type: AppStateActions.SET_ENDPOINT,
      payload: newUrl,
    });
  }

  function prettify() {
    dispatch({
      type: AppStateActions.PRETTIFY,
      payload: '',
    });
  }

  function setQueryString(query: string) {
    dispatch({
      type: AppStateActions.SET_QUERY_STRING,
      payload: query,
    });
  }

  async function getGraphQlResponse() {
    try {
      setError(null);
      const requestHeaders = createHeadersOfRequest(headers);
      const requestBody = createBodyOfRequest(variables, queryString);
      const data = await makeRequest(endpoint, requestHeaders, requestBody);

      dispatch({
        type: AppStateActions.SET_RESPONSE,
        payload: JSON.stringify(data),
      });
    } catch (caughtError) {
      handleError(caughtError, "Error. We can't get data");
    }
  }

  return {
    getGraphQlResponse,
    changeEndpointUrl,
    setQueryString,
    prettify,
    ...state,
    schema,
    error,
    dispatch,
  };
}
