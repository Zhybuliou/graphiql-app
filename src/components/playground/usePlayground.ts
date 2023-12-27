import { useCallback, useEffect, useReducer, useState } from 'react';
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLSchema,
} from 'graphql';
import { createHeadersOfRequest } from '../../utils/createHeadersOfRequest';
import { createBodyOfRequest } from '../../utils/createBodyOfRequest';
import { makeRequest } from '../../services/makeRequest';
import {
  initialPlaygroundState,
  PlaygroundActions,
  playgroundReducer,
} from '../reducers/playground';

export function usePlayground() {
  const [state, dispatch] = useReducer(
    playgroundReducer,
    initialPlaygroundState
  );
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
    async function getSchema() {
      setError(null);
      setSchema(null);
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
    }

    getSchema();
  }, [endpoint]);

  const setEndpoint = useCallback((newUrl: string) => {
    dispatch({
      type: PlaygroundActions.SET_ENDPOINT,
      payload: newUrl,
    });
  }, []);

  function prettify() {
    dispatch({
      type: PlaygroundActions.PRETTIFY,
      payload: '',
    });
  }

  function setQueryString(query: string) {
    dispatch({
      type: PlaygroundActions.SET_QUERY_STRING,
      payload: query,
    });
  }

  async function executeQuery() {
    try {
      setError(null);
      const requestHeaders = createHeadersOfRequest(headers);
      const requestBody = createBodyOfRequest(variables, queryString);
      const data = await makeRequest(endpoint, requestHeaders, requestBody);

      dispatch({
        type: PlaygroundActions.SET_RESPONSE,
        payload: JSON.stringify(data),
      });
    } catch (caughtError) {
      handleError(caughtError, "Error. We can't get data");
    }
  }

  function setVariables(newVariables: string) {
    dispatch({ type: PlaygroundActions.SET_VARIABLES, payload: newVariables });
  }

  function setHeaders(newHeaders: string) {
    dispatch({ type: PlaygroundActions.SET_HEADERS, payload: newHeaders });
  }

  return {
    executeQuery,
    setEndpoint,
    setVariables,
    setHeaders,
    setQueryString,
    prettify,
    ...state,
    schema,
    error,
    dispatch,
  };
}
