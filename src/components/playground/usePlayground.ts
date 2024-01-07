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
import { useLocale } from '../../context/local';

export function usePlayground() {
  const [state, dispatch] = useReducer(
    playgroundReducer,
    initialPlaygroundState
  );
  const { headers, variables, endpoint, queryString } = state;

  const { state: locale } = useLocale();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [schema, setSchema] = useState<GraphQLSchema | undefined>();
  const [isOpenSchema, setIsOpenSchema] = useState<boolean>(false);

  interface IMessage {
    message: string;
  }

  const handleErrorCallback = useCallback(
    (caughtError: unknown, errorTitle: string) => {
      function hasMessage(obj: unknown): obj is IMessage {
        return (obj as IMessage)?.message !== undefined;
      }

      const errorMessage = hasMessage(caughtError)
        ? caughtError.message
        : JSON.stringify(caughtError, null, 2);
      const fullErrorMessage = `${errorTitle} \n\n ${errorMessage}`;
      setIsLoading(false);
      setError(new Error(fullErrorMessage));
    },
    []
  );

  function clearResponseData() {
    dispatch({
      type: PlaygroundActions.SET_RESPONSE,
      payload: '',
    });
  }

  useEffect(() => {
    async function getSchema() {
      setError(null);
      setSchema(undefined);
      clearResponseData();
      setIsLoading(true);
      const requestHeaders = createHeadersOfRequest('');
      const query = getIntrospectionQuery();
      const requestBody = createBodyOfRequest('', query);

      try {
        const schemaData = await makeRequest(
          endpoint,
          requestHeaders,
          requestBody
        );
        setIsLoading(false);
        const clientSchema = buildClientSchema(schemaData.data);
        setSchema(clientSchema);
      } catch (caughtError) {
        handleErrorCallback(
          caughtError,
          locale.strings.playgroundErrorCantGetSchema
        );
      }
    }
    getSchema();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, handleErrorCallback]);

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
      setIsLoading(true);
      clearResponseData();
      const requestHeaders = createHeadersOfRequest(headers);
      const requestBody = createBodyOfRequest(variables, queryString);
      const data = await makeRequest(endpoint, requestHeaders, requestBody);
      setIsLoading(false);

      if (data.errors) {
        handleErrorCallback(data, locale.strings.playgroundErrorBadRequest);
      }

      dispatch({
        type: PlaygroundActions.SET_RESPONSE,
        payload: JSON.stringify(data),
      });
    } catch (caughtError) {
      handleErrorCallback(caughtError, locale.strings.playgroundErrorHTTP);
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
    isOpenSchema,
    ...state,
    schema,
    error,
    isLoading,
    setIsOpenSchema,
  };
}
