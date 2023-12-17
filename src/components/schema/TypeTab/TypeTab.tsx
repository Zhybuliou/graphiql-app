import React from 'react';
import TabDetails from './TabDetails/TabDetails';
import { TypeToExplorer } from '../types';
import TabArguments from './TabArguments/TabArguments';
import TabHeader from './TabHeader/TabHeader';

type TypeTabProps = {
  typeToExplorer: TypeToExplorer;
  tabIndex: number;
  setOpenTypes: React.Dispatch<React.SetStateAction<TypeToExplorer[]>>;
};

function TypeTab({ typeToExplorer, tabIndex, setOpenTypes }: TypeTabProps) {
  return (
    <div className="w-80 p-2">
      <TabHeader typeToExplorer={typeToExplorer} />

      {/* <p className="my-7">{typeToExplorer.description}</p> */}

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
    </div>
  );
}

export default TypeTab;
