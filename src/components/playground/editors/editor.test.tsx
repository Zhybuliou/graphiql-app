import { render } from '@testing-library/react';
import { vitest } from 'vitest';
import { EditorView } from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { noctisLilac } from '@uiw/codemirror-theme-noctis-lilac';
import { EditorConfigs } from './types';
import { BASIC_SETUPS } from './basicSetups';
import { Editor } from './Editor';

test('CodeMirror should display our text', () => {
  const handleUpdate = vitest.fn();
  const textToDisplay = Date.now().toString();
  const editorConfigs: EditorConfigs = {
    value: textToDisplay,
    onChange: handleUpdate,
    theme: noctisLilac,
    basicSetup: BASIC_SETUPS.params,
    className: 'text-balance',
    extensions: [langs.json(), EditorView.lineWrapping],
    height: '1px',
    minHeight: '100px',
  };

  const { queryByText } = render(<Editor configs={editorConfigs} />);

  expect(queryByText(textToDisplay)).toBeInTheDocument();
});
