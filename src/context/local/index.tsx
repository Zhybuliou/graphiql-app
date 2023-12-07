import {
  ReactElement,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { LOCALE_STRINGS, REGIONS } from './constants';

const initialState = {
  strings: LOCALE_STRINGS[REGIONS.EN],
};
type InitialState = {
  strings: {
    [key: string]: string;
  };
};

const reducer = (
  state: InitialState,
  action: { type: string; payload: { region: string } }
) => {
  switch (action.type) {
    case 'CHANGE_LOCALE': {
      return {
        strings: LOCALE_STRINGS[action.payload.region],
      };
    }
    case 'RESET_LOCALE': {
      return {
        strings: LOCALE_STRINGS[REGIONS.EN],
      };
    }
    default:
      return state;
  }
};

type Context = {
  state: InitialState;
  dispatch: React.Dispatch<{
    type: string;
    payload: {
      region: string;
    };
  }>;
};
const LocaleContext = createContext<Context>({} as Context);
export function LocaleProvider({ children }: { children: ReactElement }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const memoContext = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <LocaleContext.Provider value={memoContext}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
