import React, {
  ReactElement,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { BASE_ENDPOINT, BASE_QUERY_STRING, BASE_VARIABLES } from './constants';
import prettifyGraphQLQuery from '../../utils/prettifyGraphQLQuery';

export enum AppStateActions {
  SET_ENDPOINT,
  SET_QUERY_STRING,
  SET_QUERY_DATA,
  SET_VARIABLES,
  SET_HEADERS,
  PRETTIFY,
}

type AppState = {
  endpoint: string;
  queryString: string;
  outputQueryData: string;
  variables: string;
  headers: string;
};

const reducer = (
  state: AppState,
  action: { type: AppStateActions; payload: string }
) => {
  switch (action.type) {
    case AppStateActions.SET_ENDPOINT: {
      return {
        ...state,
        endpoint: action.payload,
      };
    }
    case AppStateActions.SET_QUERY_STRING: {
      return {
        ...state,
        queryString: action.payload,
      };
    }
    case AppStateActions.SET_QUERY_DATA: {
      return {
        ...state,
        outputQueryData: action.payload,
      };
    }
    case AppStateActions.SET_VARIABLES: {
      return {
        ...state,
        variables: action.payload,
      };
    }
    case AppStateActions.SET_HEADERS: {
      return {
        ...state,
        headers: action.payload,
      };
    }
    case AppStateActions.PRETTIFY: {
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

type Context = {
  state: AppState;
  dispatch: React.Dispatch<{
    type: AppStateActions;
    payload: string;
  }>;
};
const AppStateContext = createContext<Context>({} as Context);

const initialAppState: AppState = {
  endpoint: BASE_ENDPOINT,
  queryString: BASE_QUERY_STRING,
  outputQueryData: '',
  variables: BASE_VARIABLES,
  headers: '',
};

export function AppStateProvider({ children }: { children: ReactElement }) {
  const [state, dispatch] = useReducer(reducer, initialAppState);
  const memoContext = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <AppStateContext.Provider value={memoContext}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => useContext(AppStateContext);
