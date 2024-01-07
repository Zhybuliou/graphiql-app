import { Extension } from '@codemirror/state';
import { BasicSetupOptions } from '@uiw/codemirror-extensions-basic-setup';

export type BasicSetup = boolean | BasicSetupOptions;

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

export type TypesOfEditor = 'request' | 'response' | 'params';

export type EditorThemes = { [K in TypesOfEditor]: Extension };
export type BasicSetups = { [K in TypesOfEditor]: BasicSetup };
