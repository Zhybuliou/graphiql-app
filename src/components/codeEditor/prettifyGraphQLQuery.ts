function prettifyGraphQLQuery(query: string) {
  let newQuery = query;
  let prettyQuery = '';
  let indentLevel = 0;
  let bracketCheck = true;
  newQuery = newQuery.replaceAll('\n', '');
  newQuery = newQuery.replaceAll(' ', '');

  for (let i = 0; i < newQuery.length; i += 1) {
    const char = newQuery[i];
    if (char === '(') {
      bracketCheck = false;
    }
    if (char === ')') {
      bracketCheck = true;
    }

    if (char === '{' && bracketCheck) {
      prettyQuery += ` ${char} \n`;
      indentLevel += 1;
      prettyQuery += ' '.repeat(indentLevel * 2);
    } else if (char === '}' && bracketCheck) {
      prettyQuery += `\n${' '.repeat((indentLevel - 1) * 2)}${char} `;
      indentLevel -= 1;
    } else if (char === ',') {
      prettyQuery += ', ';
    } else if (char === ':') {
      prettyQuery += ': ';
    } else {
      prettyQuery += char;
    }
  }

  return prettyQuery;
}

export default prettifyGraphQLQuery;
