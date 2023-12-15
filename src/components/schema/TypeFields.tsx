import React from 'react';
import { GraphQLField, GraphQLList, isObjectType } from 'graphql';
import ListItem from '../ui/ListItem';
import FieldInfo from './FieldInfo';

type TypeFieldsProps = {
  field: GraphQLField<unknown, unknown, unknown>;
  index: number;
  setOpenTypes: React.Dispatch<
    React.SetStateAction<GraphQLField<unknown, unknown, unknown>[]>
  >;
};

function TypeFields({ field, index, setOpenTypes }: TypeFieldsProps) {
  console.log(field instanceof GraphQLList);

  if (!isObjectType(field.type)) {
    console.log('!isObjectType(field.type)', field.type);
    return null;
  }

  const fields = Object.values(field.type.getFields());
  console.log(fields);
  if (fields.length === 0) {
    console.log('fields.length===0');
    return null;
  }

  function handleAddNewType(newField: GraphQLField<unknown, unknown, unknown>) {
    setOpenTypes((prevOpenTypes) => {
      const dd = prevOpenTypes.slice(0, index + 1);
      return [...dd, newField];
    });
  }

  return (
    <div className="text-left">
      <p>Type Details</p>
      <p>
        <span className="text-blue-600">type</span>{' '}
        <span className="text-red-700">{field.type.toString()}</span>
        {'{'}
      </p>
      <ul>
        {fields.map((typeField) => {
          return (
            <ListItem
              onClick={() => handleAddNewType(typeField)}
              key={field.name}
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

export default TypeFields;
