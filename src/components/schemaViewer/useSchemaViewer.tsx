import { useState } from 'react';
import { GraphQLSchema } from 'graphql';
import { TypeToDisplay } from './types';

export function useSchemaViewer(schema: GraphQLSchema) {
  const [openedTypes, setOpenedTypes] = useState<TypeToDisplay[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const queryType = schema.getQueryType();

  const queries = queryType ? Object.values(queryType.getFields()) : [];

  return { isOpen, setIsOpen, openedTypes, setOpenedTypes, queries };
}
