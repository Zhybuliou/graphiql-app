import { GraphQLNamedType, isListType, isNonNullType } from 'graphql';
import { GraphQLOutputType } from 'graphql/type/definition';

export default function getPureType(
  type: GraphQLNamedType | GraphQLOutputType
) {
  const typeWithoutNonNull = isNonNullType(type) ? type.ofType : type;
  return isListType(typeWithoutNonNull)
    ? typeWithoutNonNull.ofType
    : typeWithoutNonNull;
}
