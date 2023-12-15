import React from 'react';
import { GraphQLField } from 'graphql';
import TypeHeader from './TypeHeader';
import TypeFields from './TypeFields';
import TypeArguments from './TypeArguments';

type TypeExplorerProps = {
  field: GraphQLField<unknown, unknown, unknown>;
  index: number;
  setOpenTypes: React.Dispatch<
    React.SetStateAction<GraphQLField<unknown, unknown, unknown>[]>
  >;
};

function TypeExplorer({ field, index, setOpenTypes }: TypeExplorerProps) {
  return (
    <div className="w-80 p-2">
      <TypeHeader field={field} />
      <p className="my-7">{field.description}</p>
      <TypeFields field={field} index={index} setOpenTypes={setOpenTypes} />
      <TypeArguments field={field} index={index} setOpenTypes={setOpenTypes} />
    </div>
  );
}

export default TypeExplorer;
