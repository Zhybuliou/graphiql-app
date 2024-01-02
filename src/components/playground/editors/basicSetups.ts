import { BasicSetup, BasicSetups } from './types';

const editableBasicSetup: BasicSetup = {
  highlightActiveLine: true,
  autocompletion: true,
  foldGutter: true,
  dropCursor: true,
  allowMultipleSelections: true,
  indentOnInput: true,
  bracketMatching: true,
  closeBrackets: true,
  lintKeymap: true,
};

const readonlyBasicSetup: BasicSetup = {
  autocompletion: false,
  foldGutter: false,
  lineNumbers: false,
  bracketMatching: true,
  highlightActiveLine: false,
};

export const BASIC_SETUPS: BasicSetups = {
  request: editableBasicSetup,
  response: readonlyBasicSetup,
  params: editableBasicSetup,
};
