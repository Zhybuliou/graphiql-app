import { GraphQLField, GraphQLArgument } from 'graphql';

export type TypeToExplorer =
  | GraphQLField<unknown, unknown, unknown>
  | GraphQLArgument;
