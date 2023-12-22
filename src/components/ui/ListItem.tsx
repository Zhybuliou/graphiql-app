import React from 'react';
import { PropsWithChildren } from '../../types/utilityTypes';
import cn from '../../utils/cn';

type ListItemProps = {
  onClick: () => void;
  className?: string;
};

function ListItem({
  children,
  onClick,
  className = '',
}: PropsWithChildren<ListItemProps>) {
  return (
    <li
      className={cn(
        'flex justify-between p-1 items-center cursor-pointer hover:bg-blue-100',
        className
      )}
      onClick={onClick}
    >
      <div className="ml-2">{children}</div>
      <span className="text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18">
          <path
            fill="currentColor"
            d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z"
          />
        </svg>
      </span>
    </li>
  );
}

export default ListItem;
