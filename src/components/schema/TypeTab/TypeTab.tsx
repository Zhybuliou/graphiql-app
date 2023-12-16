import React from 'react';
import { isInputType } from 'graphql/type';
import { GraphQLSchema } from 'graphql';
import TabDetails from './TabDetails/TabDetails';
import { TypeToExplorer } from '../types';
import TabArguments from './TabArguments/TabArguments';

type TypeTabProps = {
  typeToExplorer: TypeToExplorer;
  tabIndex: number;
  setOpenTypes: React.Dispatch<React.SetStateAction<TypeToExplorer[]>>;
  clientSchema: GraphQLSchema;
};

function TypeTab({
  typeToExplorer,
  tabIndex,
  setOpenTypes,
  clientSchema,
}: TypeTabProps) {
  if (isInputType(typeToExplorer)) {
    return (
      <div className="w-80 p-2">
        <p>isInputType</p>
      </div>
    );
  }

  return (
    <div className="w-80 p-2">
      {/* <TabHeader typeToExplorer={typeToExplorer} /> */}

      {/* <p className="my-7">{typeToExplorer.description}</p> */}

      <TabDetails
        typeToExplorer={typeToExplorer}
        tabIndex={tabIndex}
        setOpenTypes={setOpenTypes}
        clientSchema={clientSchema}
      />

      <TabArguments
        typeToExplorer={typeToExplorer}
        tabIndex={tabIndex}
        setOpenTypes={setOpenTypes}
      />
      {/*  typeToExplorer={typeToExplorer} */}
      {/*  typeIndex={typeIndex} */}
      {/*  setOpenTypes={setOpenTypes} */}
      {/* /> */}
    </div>
  );
}

export default TypeTab;
