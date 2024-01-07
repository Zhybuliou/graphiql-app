import { render } from '@testing-library/react';
import { vitest } from 'vitest';

import { ParamsEditor } from './ParamsEditor';

test('CodeMirror should display our text', () => {
  const onChangeMock = vitest.fn();
  const textToDisplay = Date.now().toString();
  const { queryByText } = render(
    <ParamsEditor value={textToDisplay} onChange={onChangeMock} />
  );
  expect(queryByText(textToDisplay)).toBeInTheDocument();
});
