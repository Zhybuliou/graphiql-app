import React from 'react';

import { GraphQLArgument } from 'graphql/type';
import { TypeToExplorer } from '../../types';
import TabArgumentsWrapper from './TabArgumentsWrapper';
import ListItem from '../../../ui/ListItem';
import FieldInfo from '../../ui/FieldInfo';
import { isOutputFieldType, isScalarFieldType } from '../../utils';

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
      const dd = prevOpenTypes.slice(0, tabIndex + 1);
      return [...dd, argument];
    });
  }

  return (
    <TabArgumentsWrapper>
      {typeToExplorer.args.map((argument) => {
        return (
          <ListItem
            key={argument.name}
            onClick={() => handleAddNewType(argument)}
          >
            <FieldInfo name={argument.name} type={argument.type.toString()} />
          </ListItem>
        );
      })}
    </TabArgumentsWrapper>
  );
}

export default TabArguments;
