import React from 'react';
import { isInputType } from 'graphql/type';
import ListItem from '../ui/ListItem';
import FieldInfo from './FieldInfo';
import { TypeToExplorer } from './types';

type TypeFieldsProps = {
  typeToExplorer: TypeToExplorer;
  typeIndex: number;
  setOpenTypes: React.Dispatch<React.SetStateAction<TypeToExplorer[]>>;
};

function TypeFields({
  typeToExplorer,
  typeIndex,
  setOpenTypes,
}: TypeFieldsProps) {
  if (isInputType(typeToExplorer)) {
    return <p>Input Type</p>;
  }

  if (typeToExplorer.args.length === 0) {
    return null;
  }

  function handleAddNewType(newField: TypeToExplorer) {
    setOpenTypes((prevOpenTypes) => {
      const dd = prevOpenTypes.slice(0, typeIndex + 1);
      return [...dd, newField];
    });
  }

  return (
    <div className="text-left">
      <p>Type Arguments</p>
      <ul>
        {typeToExplorer.args.map((argument) => {
          return (
            <ListItem
              key={argument.name}
              onClick={() => handleAddNewType(argument.type)}
            >
              <FieldInfo name={argument.name} type={argument.type.toString()} />
            </ListItem>
          );
        })}
      </ul>
    </div>
  );
}

export default TypeFields;
