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
  const typeWithoutList = isListType(typeWithoutNonNull)
    ? typeWithoutNonNull.ofType
    : typeWithoutNonNull;
  return isNonNullType(typeWithoutList)
    ? typeWithoutList.ofType
    : typeWithoutList;
}

export function isOutputFieldType(
  typeToExplorer: TypeToExplorer
): typeToExplorer is GraphQLField<unknown, unknown, unknown> {
  return isOutputType(getPureType(typeToExplorer));
}

export function isScalarFieldType(typeToExplorer: TypeToExplorer) {
  return isScalarType(getPureType(typeToExplorer));
}
