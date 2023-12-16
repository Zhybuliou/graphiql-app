import { GraphQLField, GraphQLInputType } from 'graphql';

export type TypeToExplorer =
  | GraphQLField<unknown, unknown, unknown>
  | GraphQLInputType;
