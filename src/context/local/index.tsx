import React, {
  ReactElement,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { LOCALE_STRINGS, REGIONS } from './constants';

export enum LocaleActions {
  CHANGE_LOCALE,
  RESET_LOCALE,
}

type LocaleState = {
  strings: {
    [key: string]: string;
  };
};

const reducer = (
  state: LocaleState,
  action: { type: LocaleActions; payload: string }
) => {
  switch (action.type) {
    case LocaleActions.CHANGE_LOCALE: {
      return {
        ...state,
        strings: LOCALE_STRINGS[action.payload],
      };
    }
    case LocaleActions.RESET_LOCALE: {
      return {
        ...state,
        strings: LOCALE_STRINGS[REGIONS.EN],
      };
    }
    default: {
      return state;
    }
  }
};

type Context = {
  state: LocaleState;
  dispatch: React.Dispatch<{
    type: LocaleActions;
    payload: string;
  }>;
};

const LocaleContext = createContext<Context>({} as Context);

const initialLocaleState: LocaleState = {
  strings: LOCALE_STRINGS[REGIONS.EN],
};

export function LocaleProvider({ children }: { children: ReactElement }) {
  const [state, dispatch] = useReducer(reducer, initialLocaleState);
  const memoContext = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <LocaleContext.Provider value={memoContext}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
