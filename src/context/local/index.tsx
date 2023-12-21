import {
  ReactElement,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {
  BASE_ENDPOINT,
  BASE_QUERY_STRING,
  LOCALE_STRINGS,
  REGIONS,
} from './constants';

const localLangState = {
  strings: LOCALE_STRINGS[REGIONS.EN],
  endpoint: BASE_ENDPOINT,
  queryString: BASE_QUERY_STRING,
  outputQueryData: '',
};
type LocalLangState = {
  strings: {
    [key: string]: string;
  };
  endpoint: string;
  queryString: string;
  outputQueryData: string;
};

const reducer = (
  state: LocalLangState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case 'CHANGE_LOCALE': {
      return {
        ...state,
        strings: LOCALE_STRINGS[action.payload],
      };
    }
    case 'RESET_LOCALE': {
      return {
        ...state,
        strings: LOCALE_STRINGS[REGIONS.EN],
      };
    }
    case 'SET_ENDPOINT': {
      return {
        ...state,
        endpoint: action.payload,
      };
    }
    case 'SET_QUERY_STRING': {
      return {
        ...state,
        queryString: action.payload,
      };
    }
    case 'SET_QUERY_DATA': {
      return {
        ...state,
        outputQueryData: action.payload,
      };
    }
    default:
      return state;
  }
};

type Context = {
  state: LocalLangState;
  dispatch: React.Dispatch<{
    type: string;
    payload: string;
  }>;
};
const LocaleContext = createContext<Context>({} as Context);
export function LocaleProvider({ children }: { children: ReactElement }) {
  const [state, dispatch] = useReducer(reducer, localLangState);
  const memoContext = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <LocaleContext.Provider value={memoContext}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
