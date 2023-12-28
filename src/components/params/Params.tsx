import React, { useState } from 'react';
import ParamsEditor from './ParamsEditor';
import cn from '../../utils/cn';

enum TabsParams {
  variables = 'query variables',
  headers = 'headers html',
}

type ParamsProps = {
  headers: string;
  variables: string;
  setHeaders: (newHeaders: string) => void;
  setVariables: (newVariables: string) => void;
};

function Params({ headers, variables, setHeaders, setVariables }: ParamsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabsParams>(TabsParams.variables);

  const { value, onChange } = {
    [TabsParams.headers]: { value: headers, onChange: setHeaders },
    [TabsParams.variables]: { value: variables, onChange: setVariables },
  }[activeTab];

  function handleChangeTab(newTab: TabsParams) {
    if (!isOpen) {
      setIsOpen(true);
    }
    setActiveTab(newTab);
  }

  function handleClickHeader(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (!(event.target as Element).closest('[data-id=tab-button]')) {
      setIsOpen((o) => !o);
    }
  }

  return (
    <div className="w-full bg-sky-950">
      <div className="text-sm font-medium text-center text-gray-500 ">
        <div
          className={cn('flex cursor-row-resize', {
            'cursor-s-resize': isOpen,
          })}
          onClick={handleClickHeader}
        >
          {Object.entries(TabsParams).map(([, tabParams]) => {
            return (
              <button
                key={tabParams}
                data-id="tab-button"
                type="button"
                onClick={() => handleChangeTab(tabParams)}
                className={cn(
                  `uppercase inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300`,
                  {
                    'border-blue-600 text-gray-600 hover:border-blue-600':
                      activeTab === tabParams,
                  }
                )}
              >
                {tabParams}
              </button>
            );
          })}
        </div>
      </div>
      {isOpen && <ParamsEditor value={value} onChange={onChange} />}
    </div>
  );
}

export default Params;
