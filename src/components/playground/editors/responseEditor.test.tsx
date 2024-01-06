import { render } from '@testing-library/react';
import { ResponseEditor } from './ResponseEditor';

test('CodeMirror should display our text', () => {
  const textToDisplay = Date.now().toString();
  const { queryByText } = render(
    <ResponseEditor value={textToDisplay} error={null} isLoading={false} />
  );
  expect(queryByText(textToDisplay)).toBeInTheDocument();
});

test('CodeMirror should display loading status', () => {
  const textToDisplay = Date.now().toString();
  const { queryByTestId } = render(
    <ResponseEditor value={textToDisplay} error={null} isLoading />
  );
  expect(queryByTestId('skeleton-editor')).toBeInTheDocument();
});

test('CodeMirror should display loading status', () => {
  const textToDisplay = Date.now().toString();
  const errorMessage = 'This is error message';
  const { queryByText } = render(
    <ResponseEditor
      value={textToDisplay}
      error={new Error(errorMessage)}
      isLoading={false}
    />
  );
  expect(queryByText(errorMessage)).toBeInTheDocument();
});

test('CodeMirror should display warning message - no data', () => {
  const textToDisplay = '';

  const { queryByText } = render(
    <ResponseEditor value={textToDisplay} error={null} isLoading={false} />
  );
  expect(queryByText(/No data! Make a request!/)).toBeInTheDocument();
});
