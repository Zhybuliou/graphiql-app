import { Extension } from '@codemirror/state';
import { BasicSetupOptions } from '@uiw/codemirror-extensions-basic-setup';

type BasicSetup = boolean | BasicSetupOptions;

export type EditorConfigs = {
  value: string;
  className?: string;
  basicSetup: BasicSetup;
  onChange?: (newValue: string) => void;
  theme?: 'light' | 'dark' | 'none' | Extension;
  width?: string;
  height?: string;
  extensions?: Extension[];
  minHeight?: string;
};

type TypesOfEditor = 'request' | 'response' | 'params';

type BasicSetups = { [K in TypesOfEditor]: BasicSetup };

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
