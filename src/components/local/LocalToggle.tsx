import React from 'react';
import { useLocale } from '../../context/local';
import { REGIONS } from '../../context/local/constants';

export default function LocalToggle() {
  const { state, dispatch } = useLocale();

  const handleRegionChange = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const check = event.currentTarget.checked ? REGIONS.RU : REGIONS.EN;
    const action = {
      type: 'CHANGE_LOCALE',
      payload: check,
    };
    dispatch(action);
  };

  return (
    <div className="flex w-44 items-center justify-center">
      <p className="m-1.5 text-lg uppercase font-semibold">
        {state.strings.en}
      </p>
      <label
        className="relative inline-flex items-center cursor-pointer"
        htmlFor="localToggle"
      >
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onClick={handleRegionChange}
          id="localToggle"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
      </label>
      <p className="m-1.5 text-lg uppercase font-semibold">
        {state.strings.ru}
      </p>
    </div>
  );
}
