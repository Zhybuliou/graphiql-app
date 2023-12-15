import React from 'react';
import { GraphQLField } from 'graphql';
import ListItem from '../ui/ListItem';
import FieldInfo from './FieldInfo';

type TypeFieldsProps = {
  field: GraphQLField<unknown, unknown, unknown>;
  // index: number;
  // setOpenTypes: React.Dispatch<
  //   React.SetStateAction<GraphQLField<unknown, unknown, unknown>[]>
  // >;
};

function TypeFields({ field /* , index, setOpenTypes */ }: TypeFieldsProps) {
  if (field.args.length === 0) {
    return null;
  }

  // function handleAddNewType(newField: GraphQLInputType) {
  //   console.log(newField);
  //   setOpenTypes((prevOpenTypes) => {
  //     const dd = prevOpenTypes.slice(0, index + 1);
  //     return [...dd, newField];
  //   });
  // }

  return (
    <div className="text-left">
      <p>Type Arguments</p>
      <ul>
        {field.args.map((argument) => {
          return (
            <ListItem
              key={argument.name}
              onClick={() => /* handleAddNewType(argument.type) */ {}}
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
