import React from 'react';

import { GraphQLArgument } from 'graphql/type';
import { TypeToDisplay } from '../../types';
import ListItem from '../../../ui/ListItem';
import FieldInfo from '../../ui/FieldInfo';
import { isOutputFieldType, isScalarFieldType } from '../../utils';
import SectionTitle from '../../ui/SectionTitle';

type TabArgumentsProps = {
  typeToDisplay: TypeToDisplay;
  tabIndex: number;
  setOpenedTypes: React.Dispatch<React.SetStateAction<TypeToDisplay[]>>;
};

function TabArguments({
  typeToDisplay,
  tabIndex,
  setOpenedTypes,
}: TabArgumentsProps) {
  if (!isOutputFieldType(typeToDisplay)) {
    return null;
  }

  if (isScalarFieldType(typeToDisplay)) {
    return null;
  }

  if (typeToDisplay.args.length === 0) {
    return null;
  }

  function handleAddNewType(argument: GraphQLArgument) {
    setOpenedTypes((prevOpenedTypes) => {
      const arrFront = prevOpenedTypes.slice(0, tabIndex + 1);
      return [...arrFront, argument];
    });
  }

  return (
    <div>
      <SectionTitle>Type Arguments</SectionTitle>
      <ul>
        {typeToDisplay.args.map((argument) => {
          const { name, type } = argument;
          return (
            <ListItem key={name} onClick={() => handleAddNewType(argument)}>
              <FieldInfo name={name} type={type.toString()} />
            </ListItem>
          );
        })}
      </ul>
    </div>
  );
}

export default TabArguments;
