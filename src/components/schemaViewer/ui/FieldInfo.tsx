import React from 'react';

type FieldInfoProps = {
  name: string;
  type: string;
  className?: string;
};

export function FieldInfo({ name, type, className = '' }: FieldInfoProps) {
  return (
    <p className={className}>
      <span className="text-blue-600">{name}</span>
      {': '}
      <span className="text-amber-600">{type}</span>
    </p>
  );
}

FieldInfo.defaultProps = {
  className: '',
};
