import React from 'react';
import { PropsWithChildren } from '../../types/utilityTypes';
import cn from '../../utils/cn';
import IconArrowRight from './icons/IconArrowRight';

type UiListItemProps = {
  onClick: () => void;
  className?: string;
};

function UiListItem({
  children,
  onClick,
  className = '',
}: PropsWithChildren<UiListItemProps>) {
  return (
    <li
      className={cn(
        'flex justify-between p-1 items-center cursor-pointer hover:bg-blue-100',
        className
      )}
      onClick={onClick}
    >
      <div className="ml-2">{children}</div>
      <IconArrowRight className="h-[18px] w-2.5 text-gray-400" />
    </li>
  );
}

export default UiListItem;
