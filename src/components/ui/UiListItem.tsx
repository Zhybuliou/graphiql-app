import React from 'react';
import { PropsWithChildren } from '../../types/utilityTypes';
import { cn } from '../../utils/cn';
import { IconArrowRight } from './icons/IconArrowRight';

type UiListItemProps = {
  onClick: () => void;
  className?: string;
};

export function UiListItem({
  children,
  onClick,
  className = '',
}: PropsWithChildren<UiListItemProps>) {
  return (
    <li
      className={cn(
        'flex justify-between p-1 items-center cursor-pointer rounded-[10px] hover:bg-blue-li-hover',
        className
      )}
      onClick={onClick}
    >
      <div className="ml-2">{children}</div>
      <IconArrowRight className="h-[18px] w-2.5 text-white" />
    </li>
  );
}
