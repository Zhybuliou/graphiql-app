import React from 'react';
import {
  isObjectType,
  GraphQLField,
  isScalarType,
  GraphQLSchema,
} from 'graphql';
import ListItem from '../../../ui/ListItem';
import FieldInfo from '../../ui/FieldInfo';
import { TypeToExplorer } from '../../types';
import getPureType from '../../utils';
import TabDetailsWrapper from './TabDetailsWrapper';
import TabDetailsScalar from './TabDetailsScalar';

type TabDetailsProps = {
  typeToExplorer: TypeToExplorer;
  tabIndex: number;
  setOpenTypes: React.Dispatch<React.SetStateAction<TypeToExplorer[]>>;
  clientSchema: GraphQLSchema;
};

export default function TabDetails({
  typeToExplorer,
  tabIndex,
  setOpenTypes,
  clientSchema,
}: TabDetailsProps) {
  const { type } = typeToExplorer;

  if (isScalarType(type)) {
    return <TabDetailsScalar type={type} />;
  }

  if (!isObjectType(type)) {
    return <p>!isObjectType</p>;
  }

  const fields = Object.values(type.getFields());

  if (fields.length === 0) {
    return <p>fields.length===0</p>;
  }

  function handleAddNewType(newField: GraphQLField<unknown, unknown, unknown>) {
    setOpenTypes((prevOpenTypes) => {
      const arrFront = prevOpenTypes.slice(0, tabIndex + 1);

      const pureNewType = getPureType(newField.type);
      const schemaType = clientSchema.getType(pureNewType.toString());

      if (!schemaType) {
        console.log('!schemaType');
        return prevOpenTypes;
      }

      return [
        ...arrFront,
        {
          name: pureNewType.toString(),
          description: newField.name,
          type: schemaType,
        },
      ];
    });
  }

  return (
    <TabDetailsWrapper typeName={typeToExplorer.name}>
      {fields.map((typeField) => {
        return (
          <ListItem
            onClick={() => handleAddNewType(typeField)}
            key={`${typeField.name}`}
          >
            <FieldInfo name={typeField.name} type={typeField.type.toString()} />
          </ListItem>
        );
      })}
    </TabDetailsWrapper>
  );
}
