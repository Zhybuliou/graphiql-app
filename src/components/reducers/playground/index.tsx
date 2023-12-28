import { BASE_ENDPOINT, BASE_QUERY_STRING, BASE_VARIABLES } from './constants';

import prettifyGraphQLQuery from '../../../utils/prettifyGraphQLQuery';

export enum PlaygroundActions {
  SET_ENDPOINT,
  SET_QUERY_STRING,
  SET_RESPONSE,
  SET_VARIABLES,
  SET_HEADERS,
  PRETTIFY,
}

export const initialPlaygroundState: PlaygroundState = {
  endpoint: BASE_ENDPOINT,
  queryString: BASE_QUERY_STRING,
  response: '',
  variables: BASE_VARIABLES,
  headers: '',
};

export type PlaygroundState = {
  endpoint: string;
  queryString: string;
  response: string;
  variables: string;
  headers: string;
};

export const playgroundReducer = (
  state: PlaygroundState,
  action: { type: PlaygroundActions; payload: string }
) => {
  switch (action.type) {
    case PlaygroundActions.SET_ENDPOINT: {
      return {
        ...state,
        endpoint: action.payload,
      };
    }
    case PlaygroundActions.SET_QUERY_STRING: {
      return {
        ...state,
        queryString: action.payload,
      };
    }
    case PlaygroundActions.SET_RESPONSE: {
      return {
        ...state,
        response: action.payload
          ? JSON.stringify(JSON.parse(action.payload), null, 2)
          : '',
      };
    }
    case PlaygroundActions.SET_VARIABLES: {
      return {
        ...state,
        variables: action.payload,
      };
    }
    case PlaygroundActions.SET_HEADERS: {
      return {
        ...state,
        headers: action.payload,
      };
    }
    case PlaygroundActions.PRETTIFY: {
      return {
        ...state,
        headers: prettifyGraphQLQuery(state.headers),
        variables: prettifyGraphQLQuery(state.variables),
        queryString: prettifyGraphQLQuery(state.queryString),
      };
    }
    default:
      return state;
  }
};
