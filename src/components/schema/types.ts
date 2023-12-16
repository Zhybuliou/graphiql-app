import { GraphQLNamedType } from 'graphql';

export type TypeToExplorer = {
  name: string;
  description: string;
  type: GraphQLNamedType;
};
