/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
import {
  isListType,
  isNonNullType,
  GraphQLField,
  isOutputType,
  isScalarType,
} from 'graphql';
import { TypeToDisplay } from './types';

export function getPureType(typeToDisplay: TypeToDisplay) {
  let currentType = typeToDisplay.type;

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
  typeToDisplay: TypeToDisplay
): typeToDisplay is GraphQLField<unknown, unknown, unknown> {
  return isOutputType(getPureType(typeToDisplay));
}

export function isScalarFieldType(typeToDisplay: TypeToDisplay) {
  return isScalarType(getPureType(typeToDisplay));
}
