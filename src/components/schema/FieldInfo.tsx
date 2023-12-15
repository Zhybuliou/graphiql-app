import React from 'react';

type FieldInfoProps = {
  name: string;
  type: string;
};

function FieldInfo({ name, type }: FieldInfoProps) {
  return (
    <p>
      <span className="text-blue-600">{name}</span>
      {': '}
      <span className="text-amber-600">{type}</span>
    </p>
  );
}

export default FieldInfo;
