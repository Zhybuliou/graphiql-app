import React from 'react';
import {
  isObjectType,
  GraphQLField,
  isScalarType,
  GraphQLSchema,
} from 'graphql';
import ListItem from '../ui/ListItem';
import FieldInfo from './FieldInfo';
import { TypeToExplorer } from './types';

type TypeDetailsProps = {
  typeToExplorer: GraphQLField<unknown, unknown, unknown>;
  typeIndex: number;
  setOpenTypes: React.Dispatch<React.SetStateAction<TypeToExplorer[]>>;
  clientSchema: GraphQLSchema;
};

function TypeDetails({
  typeToExplorer,
  typeIndex,
  setOpenTypes,
  clientSchema,
}: TypeDetailsProps) {
  if (isScalarType(typeToExplorer.type)) {
    const type = clientSchema.getType(typeToExplorer.type.name);

    if (!type) return <p>Type is not found!</p>;

    return (
      <>
        <p>Type Details</p>
        <p>{type.description}</p>
        <FieldInfo name="scalar" type={type.name} />
      </>
    );
  }

  if (!isObjectType(typeToExplorer.type)) {
    console.log('!isObjectType(field.type)', typeToExplorer.type);
    return null;
  }

  const fields = Object.values(typeToExplorer.type.getFields());

  if (fields.length === 0) {
    console.log('fields.length===0');
    return null;
  }

  function handleAddNewType(newField: TypeToExplorer) {
    setOpenTypes((prevOpenTypes) => {
      const arrTail = prevOpenTypes.slice(0, typeIndex + 1);
      return [...arrTail, newField];
    });
  }

  return (
    <div className="text-left">
      <p>Type Details</p>
      <p>
        <span className="text-blue-600">type</span>{' '}
        <span className="text-red-700">{typeToExplorer.type.toString()}</span>
        {'{'}
      </p>
      <ul>
        {fields.map((typeField) => {
          return (
            <ListItem
              onClick={() => handleAddNewType(typeField)}
              key={`${typeField.name}`}
            >
              <FieldInfo
                name={typeField.name}
                type={typeField.type.toString()}
              />
            </ListItem>
          );
        })}
      </ul>
      {'}'}
    </div>
  );
}

export default TypeDetails;
