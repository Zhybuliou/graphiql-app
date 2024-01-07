import { render } from '@testing-library/react';
import { vitest, vi } from 'vitest';

import { GraphQLSchema } from 'graphql';
import { EditorView } from '@uiw/react-codemirror';
import { RequestEditor } from './RequestEditor';

vitest.mock('cm6-graphql', () => ({
  graphql: vi.fn().mockReturnValue(EditorView.lineWrapping),
}));

test('CodeMirror should display our text', () => {
  const onChangeMock = vitest.fn();
  const textToDisplay = Date.now().toString();
  const schemaMock = new GraphQLSchema({});

  const { queryByText } = render(
    <RequestEditor
      schema={schemaMock}
      queryString={textToDisplay}
      setQueryString={onChangeMock}
      params={<p>Params</p>}
    />
  );
  expect(queryByText(textToDisplay)).toBeInTheDocument();
});

test('CodeMirror should display params component', () => {
  const onChangeMock = vitest.fn();
  const textToDisplay = Date.now().toString();
  const paramsText = 'this is text in Params component';
  const schemaMock = new GraphQLSchema({});

  const { queryByText } = render(
    <RequestEditor
      schema={schemaMock}
      queryString={textToDisplay}
      setQueryString={onChangeMock}
      params={<p>{paramsText}</p>}
    />
  );
  expect(queryByText(paramsText)).toBeInTheDocument();
});
