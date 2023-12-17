import React from 'react';
import { TypeToExplorer } from '../../types';
import { isOutputFieldType, isScalarFieldType } from '../../utils';
import FieldInfo from '../../ui/FieldInfo';
import TypeInfo from '../../ui/TypeInfo';

type TabHeaderProps = {
  typeToExplorer: TypeToExplorer;
};

function TabHeader({ typeToExplorer }: TabHeaderProps) {
  const typeHeaderWithoutArgs = (
    <TypeInfo
      name={typeToExplorer.name}
      type={typeToExplorer.type.toString()}
    />
  );

  if (isScalarFieldType(typeToExplorer)) {
    return typeHeaderWithoutArgs;
  }

  if (!isOutputFieldType(typeToExplorer)) {
    return typeHeaderWithoutArgs;
  }

  if (typeToExplorer.args.length === 0) {
    return typeHeaderWithoutArgs;
  }

  return (
    <div>
      <p>
        <span className="text-red-700">{`${typeToExplorer.name}`}</span>(
      </p>
      {typeToExplorer.args.map((argument) => {
        return (
          <FieldInfo
            key={argument.name}
            name={argument.name}
            type={argument.type.toString()}
            className="ml-2"
          />
        );
      })}
      <p>
        {'): '}
        <span className="text-amber-600">{typeToExplorer.type.toString()}</span>
      </p>
    </div>
  );
}

export default TabHeader;
