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
      className={`flex justify-between ml-2 p-1 items-center cursor-pointer ${
        classNames || ''
      }`}
      onClick={onClick}
    >
      {children}
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 640 640"
        >
          <path d="M0 320c0-77.316 62.67-139.998 139.998-139.998 77.304 0 139.998 62.682 139.998 139.998 0 77.304-62.694 139.998-139.998 139.998C62.67 459.998 0 397.304 0 320zm360.004 0c0-77.316 62.694-139.998 139.998-139.998C577.33 180.002 640 242.684 640 320c0 77.304-62.67 139.998-139.998 139.998-77.304 0-139.998-62.694-139.998-139.998z" />
        </svg>
      </span>
    </li>
  );
}

export default ListItem;
