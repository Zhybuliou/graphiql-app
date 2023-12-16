import React from 'react';

import { TypeToExplorer } from '../../types';

type TabArgumentsProps = {
  typeToExplorer: TypeToExplorer;
  tabIndex: number;
  setOpenTypes: React.Dispatch<React.SetStateAction<TypeToExplorer[]>>;
};

function TabArguments({ typeToExplorer }: TabArgumentsProps) {
  const { type } = typeToExplorer;

  console.log(type);
  return null;

  // if (typeToExplorer.args.length === 0) {
  //   return null;
  // }
  //
  // function handleAddNewType(newField: TypeToExplorer) {
  //   setOpenTypes((prevOpenTypes) => {
  //     const dd = prevOpenTypes.slice(0, typeIndex + 1);
  //     return [...dd, newField];
  //   });
  // }
  //
  // return (
  //   <TabArgumentsWrapper>
  //     {typeToExplorer.args.map((argument) => {
  //       return (
  //         <ListItem
  //           key={argument.name}
  //           onClick={() => handleAddNewType(argument.type)}
  //         >
  //           <FieldInfo name={argument.name} type={argument.type.toString()} />
  //         </ListItem>
  //       );
  //     })}
  //   </TabArgumentsWrapper>
  // );
}

export default TabArguments;
