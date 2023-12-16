import React from 'react';
import { isInputType } from 'graphql/type';
import { GraphQLSchema } from 'graphql';
import TypeHeader from './TypeHeader';
import TypeDetails from './TypeDetails';
import TypeArguments from './TypeArguments';
import { TypeToExplorer } from './types';

type TypeExplorerProps = {
  typeToExplorer: TypeToExplorer;
  typeIndex: number;
  setOpenTypes: React.Dispatch<React.SetStateAction<TypeToExplorer[]>>;
  clientSchema: GraphQLSchema;
};

function TypeExplorer({
  typeToExplorer,
  typeIndex,
  setOpenTypes,
  clientSchema,
}: TypeExplorerProps) {
  if (isInputType(typeToExplorer)) {
    return (
      <div className="w-80 p-2">
        <p>isInputType</p>
      </div>
    );
  }

  return (
    <div className="w-80 p-2">
      <TypeHeader typeToExplorer={typeToExplorer} />

      <p className="my-7">{typeToExplorer.description}</p>

      <TypeDetails
        typeToExplorer={typeToExplorer}
        typeIndex={typeIndex}
        setOpenTypes={setOpenTypes}
        clientSchema={clientSchema}
      />
      <TypeArguments
        typeToExplorer={typeToExplorer}
        typeIndex={typeIndex}
        setOpenTypes={setOpenTypes}
      />
    </div>
  );
}

export default TypeExplorer;
