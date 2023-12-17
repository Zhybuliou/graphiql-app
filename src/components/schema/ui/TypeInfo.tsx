import React from 'react';

type FieldInfoProps = {
  name: string;
  type: string;
  className?: string;
  split?: string;
};

function TypeInfo({
  name,
  type,
  className = '',
  split = ': ',
}: FieldInfoProps) {
  return (
    <p className={className || ''}>
      <span className="text-red-700">{name}</span>
      <span>{split}</span>
      <span className="text-amber-600">{type}</span>
    </p>
  );
}

TypeInfo.defaultProps = {
  split: ': ',
  className: '',
};

export default TypeInfo;
