/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
import {
  isListType,
  isNonNullType,
  GraphQLField,
  isOutputType,
  isScalarType,
} from 'graphql';
import { TypeToExplorer } from './types';

export function getPureType(typeToExplorer: TypeToExplorer) {
  let currentType = typeToExplorer.type;

  while (true) {
    const typeWithoutNonNull = isNonNullType(currentType)
      ? currentType.ofType
      : currentType;

    if (isListType(typeWithoutNonNull)) {
      currentType = typeWithoutNonNull.ofType;
    } else {
      return typeWithoutNonNull;
    }
  }
}

export function isOutputFieldType(
  typeToExplorer: TypeToExplorer
): typeToExplorer is GraphQLField<unknown, unknown, unknown> {
  return isOutputType(getPureType(typeToExplorer));
}

export function isScalarFieldType(typeToExplorer: TypeToExplorer) {
  return isScalarType(getPureType(typeToExplorer));
}
