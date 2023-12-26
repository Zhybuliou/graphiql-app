import React from 'react';
import cn from '../../utils/cn';

type TabButtonProps = {
  onClick: () => void;
  isActive: boolean;
  text: string;
};

function TabButton({ onClick, isActive, text }: TabButtonProps) {
  return (
    <li data-id="tab-button">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          `uppercase inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300`,
          { 'border-blue-600 text-gray-600 hover:border-blue-600': isActive }
        )}
      >
        {text}
      </button>
    </li>
  );
}

export default TabButton;
