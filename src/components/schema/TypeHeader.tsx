import React from 'react';
import { GraphQLField } from 'graphql';
import FieldInfo from './FieldInfo';

type TypeHeaderProps = {
  field: GraphQLField<unknown, unknown, unknown>;
};

function TypeHeader({ field }: TypeHeaderProps) {
  if (field.args.length === 0) {
    return <FieldInfo name={field.name} type={field.type.toString()} />;
  }

  return (
    <div className="text-left">
      <p>
        <span className="text-red-700">{`${field.name}`}</span>(
      </p>
      {field.args.map((argument) => {
        return (
          <FieldInfo
            key={argument.name}
            name={argument.name}
            type={argument.type.toString()}
          />
        );
      })}
      <p>
        ): <span className="text-amber-600">{field.type.toString()}</span>
      </p>
    </div>
  );
}

export default TypeHeader;
