import React from 'react';
import { TypeToExplorer } from '../../types';
import { isOutputFieldType } from '../../utils';

type TabDescriptionProps = {
  typeToExplorer: TypeToExplorer;
};

function TabDescription({ typeToExplorer }: TabDescriptionProps) {
  if (!isOutputFieldType(typeToExplorer)) {
    return null;
  }

  return <p>{typeToExplorer.description}</p>;
}

export default TabDescription;
