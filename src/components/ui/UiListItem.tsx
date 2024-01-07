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
        'flex justify-between p-[5px] items-center cursor-pointer rounded hover:bg-gray-200',
        className
      )}
      onClick={onClick}
    >
      <div className="ml-2">{children}</div>
      <IconArrowRight className="h-5 w-3 text-gray-400" />
    </li>
  );
}
