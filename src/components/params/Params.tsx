import React, { useState } from 'react';
import ParamsEditor from './ParamsEditor';
import TabButton from './TabButton';
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
    event: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) {
    if (!(event.target as Element).closest('[data-id=tab-button]')) {
      setIsOpen((o) => !o);
    }
  }

  return (
    <div className="w-full">
      <div className="text-sm font-medium text-center text-gray-500 ">
        <ul
          className={cn('flex cursor-row-resize', {
            'cursor-s-resize': isOpen,
          })}
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
      {isOpen && <ParamsEditor value={value} onChange={onChange} />}
    </div>
  );
}

export default Params;
