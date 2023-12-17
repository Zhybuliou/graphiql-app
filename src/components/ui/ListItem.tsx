import React from 'react';
import { PropsWithChildren } from '../../types/utilityTypes';

type ListItemProps = {
  classNames?: string;
  onClick: () => void;
};

function ListItem({
  children,
  classNames,
  onClick,
}: PropsWithChildren<ListItemProps>) {
  return (
    <li
      className={`flex justify-between ml-2 p-1 items-center cursor-pointer hover:bg-blue-100 ${
        classNames || ''
      }`}
      onClick={onClick}
    >
      {children}
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18">
          <path
            fill="#999999"
            d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z"
          />
        </svg>
      </span>
    </li>
  );
}

export default ListItem;
