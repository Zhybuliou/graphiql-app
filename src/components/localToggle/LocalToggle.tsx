import React from 'react';
import { LocaleActions, useLocale } from '../../context/local';
import { REGIONS } from '../../context/local/constants';

export function LocalToggle() {
  const { state, dispatch } = useLocale();

  const handleRegionChange = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const check = event.currentTarget.checked ? REGIONS.RU : REGIONS.EN;
    const action = {
      type: LocaleActions.CHANGE_LOCALE,
      payload: check,
    };
    dispatch(action);
  };

  return (
    <div className="flex items-center justify-center gap-1.5">
      <p className="text-xs uppercase font-semibold sm:text-lg">
        {state.strings.en}
      </p>
      <label
        className="relative inline-flex items-center cursor-pointer"
        htmlFor="localToggle"
      >
        <input
          data-testid="localToggle"
          type="checkbox"
          value=""
          className="sr-only peer"
          onClick={handleRegionChange}
          id="localToggle"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
      </label>
      <p className="text-xs uppercase font-semibold sm:text-lg">
        {state.strings.ru}
      </p>
    </div>
  );
}
