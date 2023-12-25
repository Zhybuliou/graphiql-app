import React from 'react';
import TabDetails from './TabDetails/TabDetails';
import { TypeToDisplay } from '../types';
import TabArguments from './TabArguments/TabArguments';
import TabHeader from './TabHeader/TabHeader';
import TabWrapper from '../ui/TabWrapper';
import TabDescription from './TabDescription/TabDescription';

type TypeTabProps = {
  typeToDisplay: TypeToDisplay;
  tabIndex: number;
  setOpenedTypes: React.Dispatch<React.SetStateAction<TypeToDisplay[]>>;
};

function TypeTab({ typeToDisplay, tabIndex, setOpenedTypes }: TypeTabProps) {
  return (
    <TabWrapper>
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
    </TabWrapper>
  );
}

export default TypeTab;
