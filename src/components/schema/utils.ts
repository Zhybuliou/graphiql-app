import {
  isListType,
  isNonNullType,
  GraphQLField,
  isOutputType,
  isScalarType,
} from 'graphql';
import { TypeToExplorer } from './types';

export function getPureType(typeToExplorer: TypeToExplorer) {
  const typeWithoutNonNull = isNonNullType(typeToExplorer.type)
    ? typeToExplorer.type.ofType
    : typeToExplorer.type;
  return isListType(typeWithoutNonNull)
    ? typeWithoutNonNull.ofType
    : typeWithoutNonNull;
}

export function isOutputFieldType(
  typeToExplorer: TypeToExplorer
): typeToExplorer is GraphQLField<unknown, unknown, unknown> {
  return isOutputType(getPureType(typeToExplorer));
}

export function isScalarFieldType(typeToExplorer: TypeToExplorer) {
  return isScalarType(getPureType(typeToExplorer));
}
