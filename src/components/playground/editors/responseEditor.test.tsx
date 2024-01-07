import { render } from '@testing-library/react';
import { ResponseEditor } from './ResponseEditor';
import { LocaleProvider } from '../../../context/local';

test('CodeMirror should display our text', () => {
  const textToDisplay = Date.now().toString();
  const { queryByText } = render(
    <LocaleProvider>
      <ResponseEditor value={textToDisplay} error={null} isLoading={false} />
    </LocaleProvider>
  );
  expect(queryByText(textToDisplay)).toBeInTheDocument();
});

test('CodeMirror should display loading status', () => {
  const textToDisplay = Date.now().toString();
  const { queryByTestId } = render(
    <LocaleProvider>
      <ResponseEditor value={textToDisplay} error={null} isLoading />
    </LocaleProvider>
  );
  expect(queryByTestId('skeleton-editor')).toBeInTheDocument();
});

test('CodeMirror should display loading status', () => {
  const textToDisplay = Date.now().toString();
  const errorMessage = 'This is error message';
  const { queryByText } = render(
    <LocaleProvider>
      <ResponseEditor
        value={textToDisplay}
        error={new Error(errorMessage)}
        isLoading={false}
      />
    </LocaleProvider>
  );
  expect(queryByText(errorMessage)).toBeInTheDocument();
});

test('CodeMirror should display warning message - no data', () => {
  const textToDisplay = '';

  const { queryByTestId } = render(
    <LocaleProvider>
      <ResponseEditor value={textToDisplay} error={null} isLoading={false} />
    </LocaleProvider>
  );
  expect(queryByTestId('no-data')).toBeInTheDocument();
});
