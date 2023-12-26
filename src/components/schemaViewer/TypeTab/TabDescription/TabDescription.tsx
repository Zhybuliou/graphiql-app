import React from 'react';
import { TypeToDisplay } from '../../types';
import { isOutputFieldType } from '../../utils';

type TabDescriptionProps = {
  typeToDisplay: TypeToDisplay;
};

function TabDescription({ typeToDisplay }: TabDescriptionProps) {
  if (!isOutputFieldType(typeToDisplay)) {
    return null;
  }

  return <p>{typeToDisplay.description}</p>;
}

export default TabDescription;
