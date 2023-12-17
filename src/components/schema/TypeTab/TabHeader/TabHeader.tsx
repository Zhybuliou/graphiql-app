import React from 'react';
import { TypeToExplorer } from '../../types';
import { isOutputFieldType, isScalarFieldType } from '../../utils';
import FieldInfo from '../../ui/FieldInfo';

type TabHeaderProps = {
  typeToExplorer: TypeToExplorer;
};

function TabHeader({ typeToExplorer }: TabHeaderProps) {
  if (
    isScalarFieldType(typeToExplorer) ||
    !isOutputFieldType(typeToExplorer) ||
    typeToExplorer.args.length === 0
  ) {
    return (
      <FieldInfo
        name={typeToExplorer.name}
        type={typeToExplorer.type.toString()}
      />
    );
  }

  return (
    <div className="text-left">
      <p>
        <span className="text-red-700">{`${typeToExplorer.name}`}</span>(
      </p>
      {typeToExplorer.args.map((argument) => {
        return (
          <FieldInfo
            key={argument.name}
            name={argument.name}
            type={argument.type.toString()}
          />
        );
      })}
      <p>
        ):{' '}
        <span className="text-amber-600">{typeToExplorer.type.toString()}</span>
      </p>
    </div>
  );
}

export default TabHeader;
