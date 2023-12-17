import React from 'react';
import { isObjectType, GraphQLField, isScalarType } from 'graphql';
import ListItem from '../../../ui/ListItem';
import FieldInfo from '../../ui/FieldInfo';
import { TypeToExplorer } from '../../types';
import { getPureType } from '../../utils';
import TabDetailsWrapper from './TabDetailsWrapper';
import TabDetailsScalar from './TabDetailsScalar';

type TabDetailsProps = {
  typeToExplorer: TypeToExplorer;
  tabIndex: number;
  setOpenTypes: React.Dispatch<React.SetStateAction<TypeToExplorer[]>>;
};

export default function TabDetails({
  typeToExplorer,
  tabIndex,
  setOpenTypes,
}: TabDetailsProps) {
  const pureType = getPureType(typeToExplorer);
  if (isScalarType(pureType)) {
    return <TabDetailsScalar type={pureType} />;
  }

  if (!isObjectType(pureType)) {
    return <p>!isObjectType</p>;
  }

  const fields = Object.values(pureType.getFields());

  if (fields.length === 0) {
    return <p>fields.length===0</p>;
  }

  function handleAddNewType(newField: GraphQLField<unknown, unknown, unknown>) {
    setOpenTypes((prevOpenTypes) => {
      const arrFront = prevOpenTypes.slice(0, tabIndex + 1);
      return [...arrFront, newField];
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
