import {
  ReactElement,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { LOCALE_STRINGS, REGIONS } from './constants';

const localState = {
  strings: LOCALE_STRINGS[REGIONS.EN],
  errorMsg: '',
};
type LocalState = {
  strings: {
    [key: string]: string;
  };
  errorMsg: string;
};

const reducer = (
  state: LocalState,
  action: { type: string; payload: { value: string } }
) => {
  switch (action.type) {
    case 'CHANGE_LOCALE': {
      return { ...state, strings: LOCALE_STRINGS[action.payload.value] };
    }
    case 'RESET_LOCALE': {
      return { ...state, strings: LOCALE_STRINGS[REGIONS.EN] };
    }
    case 'SET_ERROR': {
      return { ...state, errorMsg: action.payload.value };
    }
    case 'CLEAR_ERROR': {
      return { ...state, errorMsg: '' };
    }
    default:
      return state;
  }
};

type Context = {
  state: LocalState;
  dispatch: React.Dispatch<{
    type: string;
    payload: {
      value: string;
    };
  }>;
};
const LocaleContext = createContext<Context>({} as Context);
export function LocaleProvider({ children }: { children: ReactElement }) {
  const [state, dispatch] = useReducer(reducer, localState);
  const memoContext = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <LocaleContext.Provider value={memoContext}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
