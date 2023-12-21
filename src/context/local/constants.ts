import enString from '../../lang/en.json';
import ruString from '../../lang/ru.json';

export const REGIONS = {
  RU: 'RU',
  EN: 'EN',
};

export const LOCALE_STRINGS = {
  [REGIONS.RU]: ruString,
  [REGIONS.EN]: enString,
};

export const BASE_QUERY_STRING = `query ($filter: FilterCharacter) {
  characters(filter: $filter) {
    results {
      name
    }
  }
}
`;

export const BASE_ENDPOINT = 'https://rickandmortyapi.com/graphql';
