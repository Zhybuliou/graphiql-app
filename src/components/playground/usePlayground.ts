import { useEffect, useState } from 'react';
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLSchema,
} from 'graphql/index';
import { createHeadersOfRequest } from '../../utils/createHeadersOfRequest';
import { createBodyOfRequest } from '../../utils/createBodyOfRequest';
import { makeRequest } from '../../services/makeRequest';
import { AppStateActions, useAppState } from '../../context/appState';

export function usePlayground() {
  const { state, dispatch } = useAppState();
  const { headers, variables, endpoint, queryString } = state;

  const [error, setError] = useState<Error | null>(null);
  const [schema, setSchema] = useState<GraphQLSchema>();

  useEffect(() => {
    const getSchema = async () => {
      const requestHeaders = createHeadersOfRequest('');
      const query = getIntrospectionQuery();
      const requestBody = createBodyOfRequest('', query);

      const schemaData = await makeRequest(
        endpoint,
        requestHeaders,
        requestBody
      );

      const clientSchema = buildClientSchema(schemaData.data);
      setSchema(clientSchema);
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

  async function getGraphQlResponse() {
    try {
      setError(null);
      const requestHeaders = createHeadersOfRequest(headers);
      const requestBody = createBodyOfRequest(variables, queryString);
      const data = await makeRequest(endpoint, requestHeaders, requestBody);

      dispatch({
        type: AppStateActions.SET_QUERY_DATA,
        payload: JSON.stringify(data),
      });
    } catch (err) {
      if (err instanceof Error) {
        const newErrorMsg = `Error ${err.message}`;
        setError(new Error(newErrorMsg));
        dispatch({
          type: AppStateActions.SET_QUERY_DATA,
          payload: JSON.stringify(newErrorMsg),
        });
      }
    }
  }

  return {
    getGraphQlResponse,
    changeEndpointUrl,
    prettify,
    ...state,
    schema,
    error,
    dispatch,
  };
}
