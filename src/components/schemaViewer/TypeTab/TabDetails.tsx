import React from 'react';
import {
  isObjectType,
  GraphQLField,
  isScalarType,
  isInputObjectType,
} from 'graphql';
import { UiListItem } from '../../ui/UiListItem';
import { FieldInfo } from '../ui/FieldInfo';
import { TypeToDisplay } from '../types';
import { getPureType } from '../utils';
import { TabDetailsWrapper } from './TabDetailsWrapper';
import { TabDetailsScalar } from './TabDetailsScalar';

type TabDetailsProps = {
  typeToDisplay: TypeToDisplay;
  tabIndex: number;
  setOpenedTypes: React.Dispatch<React.SetStateAction<TypeToDisplay[]>>;
};

export function TabDetails({
  typeToDisplay,
  tabIndex,
  setOpenedTypes,
}: TabDetailsProps) {
  const pureType = getPureType(typeToDisplay);

  if (isScalarType(pureType)) {
    return <TabDetailsScalar scalarType={pureType} />;
  }

  if (!isObjectType(pureType) && !isInputObjectType(pureType)) {
    throw new Error('!isObjectType');
  }

  const fields = Object.values(pureType.getFields());

  if (fields.length === 0) {
    throw new Error('fields.length === 0');
  }

  function handleAddNewType(newField: GraphQLField<unknown, unknown, unknown>) {
    setOpenedTypes((prevOpenedTypes) => {
      const arrFront = prevOpenedTypes.slice(0, tabIndex + 1);
      return [...arrFront, newField];
    });
  }

  return (
    <TabDetailsWrapper typeName={pureType.toString()}>
      <ul>
        {fields.map((field) => {
          const { name, type } = field;
          return (
            <UiListItem onClick={() => handleAddNewType(field)} key={name}>
              <FieldInfo name={name} type={type.toString()} />
            </UiListItem>
          );
        })}
      </ul>
    </TabDetailsWrapper>
  );
}
