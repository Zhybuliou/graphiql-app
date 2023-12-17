import React from 'react';
import TabDetails from './TabDetails/TabDetails';
import { TypeToExplorer } from '../types';
import TabArguments from './TabArguments/TabArguments';
import TabHeader from './TabHeader/TabHeader';
import TabWrapper from '../ui/TabWrapper';
import TabDescription from './TabDescription/TabDescription';

type TypeTabProps = {
  typeToExplorer: TypeToExplorer;
  tabIndex: number;
  setOpenTypes: React.Dispatch<React.SetStateAction<TypeToExplorer[]>>;
};

function TypeTab({ typeToExplorer, tabIndex, setOpenTypes }: TypeTabProps) {
  return (
    <TabWrapper>
      <TabHeader typeToExplorer={typeToExplorer} />
      <TabDescription typeToExplorer={typeToExplorer} />
      <TabDetails
        typeToExplorer={typeToExplorer}
        tabIndex={tabIndex}
        setOpenTypes={setOpenTypes}
      />
      <TabArguments
        typeToExplorer={typeToExplorer}
        tabIndex={tabIndex}
        setOpenTypes={setOpenTypes}
      />
    </TabWrapper>
  );
}

export default TypeTab;
