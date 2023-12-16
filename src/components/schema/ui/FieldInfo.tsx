import React from 'react';

type FieldInfoProps = {
  name: string;
  type: string;
  split?: string;
};

function FieldInfo({ name, type, split = ': ' }: FieldInfoProps) {
  return (
    <p>
      <span className="text-blue-600">{name}</span>
      <span>{split}</span>
      <span className="text-amber-600">{type}</span>
    </p>
  );
}

FieldInfo.defaultProps = {
  split: ': ',
};

export default FieldInfo;
