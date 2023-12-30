import React from 'react';
import { TabDetails } from './TabDetails/TabDetails';
import { TypeToDisplay } from '../types';
import { TabArguments } from './TabArguments/TabArguments';
import { TabHeader } from './TabHeader/TabHeader';
import { TabDescription } from './TabDescription/TabDescription';

type TypeTabProps = {
  typeToDisplay: TypeToDisplay;
  tabIndex: number;
  setOpenedTypes: React.Dispatch<React.SetStateAction<TypeToDisplay[]>>;
};

export function TypeTab({
  typeToDisplay,
  tabIndex,
  setOpenedTypes,
}: TypeTabProps) {
  return (
    <div className="relative flex flex-col gap-4 w-80 shrink-0 overflow-y-scroll p-2 text-left bg-schema-gradient">
      <TabHeader typeToDisplay={typeToDisplay} />
      <TabDescription typeToDisplay={typeToDisplay} />
      <TabDetails
        typeToDisplay={typeToDisplay}
        tabIndex={tabIndex}
        setOpenedTypes={setOpenedTypes}
      />
      <TabArguments
        typeToDisplay={typeToDisplay}
        tabIndex={tabIndex}
        setOpenedTypes={setOpenedTypes}
      />
      <div className="absolute -z-10 top-0 left-0 h-full w-full opacity-25 bg-schema-pattern" />
    </div>
  );
}
