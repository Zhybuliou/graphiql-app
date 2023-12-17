import React from 'react';

import { GraphQLArgument } from 'graphql/type';
import { TypeToExplorer } from '../../types';
import ListItem from '../../../ui/ListItem';
import FieldInfo from '../../ui/FieldInfo';
import { isOutputFieldType, isScalarFieldType } from '../../utils';
import SectionTitle from '../../ui/SectionTitle';

type TabArgumentsProps = {
  typeToExplorer: TypeToExplorer;
  tabIndex: number;
  setOpenTypes: React.Dispatch<React.SetStateAction<TypeToExplorer[]>>;
};

function TabArguments({
  typeToExplorer,
  tabIndex,
  setOpenTypes,
}: TabArgumentsProps) {
  if (!isOutputFieldType(typeToExplorer)) {
    return null;
  }

  if (isScalarFieldType(typeToExplorer)) {
    return null;
  }

  if (typeToExplorer.args.length === 0) {
    return null;
  }

  function handleAddNewType(argument: GraphQLArgument) {
    setOpenTypes((prevOpenTypes) => {
      const arrFront = prevOpenTypes.slice(0, tabIndex + 1);
      return [...arrFront, argument];
    });
  }

  return (
    <div>
      <SectionTitle>Type Arguments</SectionTitle>
      <ul>
        {typeToExplorer.args.map((argument) => {
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
