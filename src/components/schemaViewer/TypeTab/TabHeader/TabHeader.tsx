import React from 'react';
import { TypeToDisplay } from '../../types';
import { isOutputFieldType, isScalarFieldType } from '../../utils';
import FieldInfo from '../../ui/FieldInfo';
import TypeInfo from '../../ui/TypeInfo';

type TabHeaderProps = {
  typeToDisplay: TypeToDisplay;
};

function TabHeader({ typeToDisplay }: TabHeaderProps) {
  const tabHeaderWithoutArgs = (
    <TypeInfo name={typeToDisplay.name} type={typeToDisplay.type.toString()} />
  );

  if (isScalarFieldType(typeToDisplay)) {
    return tabHeaderWithoutArgs;
  }

  if (!isOutputFieldType(typeToDisplay)) {
    return tabHeaderWithoutArgs;
  }

  if (typeToDisplay.args.length === 0) {
    return tabHeaderWithoutArgs;
  }

  return (
    <div>
      <p>
        <span className="text-red-700">{`${typeToDisplay.name}`}</span>(
      </p>
      {typeToDisplay.args.map((argument) => {
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
        <span className="text-amber-600">{typeToDisplay.type.toString()}</span>
      </p>
    </div>
  );
}

export default TabHeader;
