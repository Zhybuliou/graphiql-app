export function prettifyGraphQLQuery(query: string) {
  let newQuery = query;
  let prettyQuery = '';
  let indentLevel = 0;
  let bracketCheck = true;
  newQuery = newQuery.replaceAll(' ', '\n');
  newQuery = newQuery.replace(/\n+/g, '\n');
  newQuery = newQuery.replace(/\(([^)]*)\)/g, (match) => {
    return match.replace(/\n/g, '');
  });

  for (let i = 0; i < newQuery.length; i += 1) {
    const char = newQuery[i];
    if (char === '(') {
      bracketCheck = false;
    }
    if (char === ')') {
      i = newQuery[i + 1] === '\n' ? i + 1 : i;
      bracketCheck = true;
    }

    if (char === '{' && bracketCheck) {
      i = newQuery[i + 1] === '\n' ? i + 1 : i;
      prettyQuery += ` ${char} \n`;
      indentLevel += 1;
      prettyQuery += ' '.repeat(indentLevel * 2);
    } else if (char === '}' && bracketCheck) {
      const newChar = newQuery[i - 1] === '\n' ? '' : '\n';
      prettyQuery += `${newChar}${' '.repeat((indentLevel - 1) * 2)}${char} `;
      indentLevel -= 1;
    } else if (char === ',') {
      prettyQuery += ', ';
    } else if (char === "'") {
      prettyQuery += '"';
    } else if (char === ':') {
      i = newQuery[i + 1] === '\n' ? i + 1 : i;
      prettyQuery += ': ';
    } else if (char === '\n') {
      if (newQuery[i + 1] !== '(') {
        prettyQuery += char;
        prettyQuery += ' '.repeat(indentLevel * 2);
      }
    } else {
      prettyQuery += char;
    }
  }

  return prettyQuery;
}
