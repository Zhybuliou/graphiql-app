import { render } from '@testing-library/react';
import { vitest } from 'vitest';
// import { json } from '@codemirror/lang-json';
// import { EditorView } from '@uiw/react-codemirror';
import { EditorConfigs } from './types';
import { THEMES } from './themes';
import { BASIC_SETUPS } from './basicSetups';
import { Editor } from './Editor';

test('CodeMirror should display our text', () => {
  const handleUpdate = vitest.fn();
  const textToDisplay = Date.now().toString();
  const editorConfigs: EditorConfigs = {
    value: textToDisplay,
    onChange: handleUpdate,
    theme: THEMES.params,
    basicSetup: BASIC_SETUPS.params,
    className: 'text-balance',
    // extensions: [json(), EditorView.lineWrapping],
    height: '1px',
    minHeight: '100px',
  };

  const { queryByText } = render(<Editor configs={editorConfigs} />);

  expect(queryByText(textToDisplay)).toBeInTheDocument();
});
