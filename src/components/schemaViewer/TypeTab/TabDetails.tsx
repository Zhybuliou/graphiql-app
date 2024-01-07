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
import { SectionTitle } from '../ui/SectionTitle';
import { useLocale } from '../../../context/local';

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
  const { state } = useLocale();
  const pureType = getPureType(typeToDisplay);

  if (isScalarType(pureType)) {
    return (
      <div>
        <SectionTitle>{state.strings.schemaTabTypeDetailsTitle}</SectionTitle>
        <p className="my-2">{pureType.description}</p>
        <FieldInfo name="scalar" type={pureType.name} />
      </div>
    );
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
    <div>
      <SectionTitle>{state.strings.schemaTabTypeDetailsTitle}</SectionTitle>
      <p>
        <span className="text-blue-600">
          {state.strings.schemaTabTypeDetailsType}
        </span>{' '}
        <span className="text-red-700">{pureType.toString()}</span>
        {'{'}
      </p>
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
      {'}'}
    </div>
  );
}
