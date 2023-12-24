import React, { useState } from 'react';
import ParamsEditor from './ParamsEditor';
import TabButton from './TabButton';
import cn from '../../utils/cn';

enum TabsParams {
  headers = 'headers html',
  variables = 'query variables',
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

  const editor = {
    [TabsParams.variables]: (
      <ParamsEditor value={headers} onChange={setHeaders} />
    ),
    [TabsParams.headers]: (
      <ParamsEditor value={variables} onChange={setVariables} />
    ),
  }[activeTab];

  function handleChangeTab(newTab: TabsParams) {
    if (!isOpen) {
      setIsOpen((o) => !o);
    }
    setActiveTab(newTab);
  }

  function handleClickHeader(
    event: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) {
    if (!(event.target as Element).closest('[data-id=tab-button]')) {
      setIsOpen((o) => !o);
    }
  }

  return (
    <div className="w-full">
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul
          className={cn(
            'flex',
            { 'cursor-s-resize': isOpen },
            { 'cursor-row-resize': !isOpen }
          )}
          onClick={handleClickHeader}
        >
          {Object.entries(TabsParams).map(([, tabParams]) => {
            return (
              <TabButton
                key={tabParams}
                onClick={() => handleChangeTab(tabParams)}
                text={tabParams}
                isActive={activeTab === tabParams}
              />
            );
          })}
        </ul>
      </div>
      {isOpen && editor}
    </div>
  );
}

export default Params;
