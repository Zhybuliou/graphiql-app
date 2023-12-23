import React from 'react';
import Button from '../ui/Button';
import cn from '../../utils/cn';
import { DisplayState } from './types';

type ParamsControlsProps = {
  displayState: DisplayState;
  setDisplayState: React.Dispatch<React.SetStateAction<DisplayState>>;
};

function ParamsControls({
  displayState,
  setDisplayState,
}: ParamsControlsProps) {
  return (
    <div className="flex justify-center gap-2.5 bg-indigo-900 p-4 text-white">
      <Button
        className={cn({
          'bg-sky-500/50 text-slate-400':
            displayState === DisplayState.variables,
        })}
        onClick={() => {
          setDisplayState((prevDisplayState) => {
            return prevDisplayState === DisplayState.variables
              ? DisplayState.closeAll
              : DisplayState.variables;
          });
        }}
      >
        Variables
      </Button>
      <Button
        className={cn({
          'bg-sky-500/50 text-slate-400': displayState === DisplayState.headers,
        })}
        onClick={() => {
          setDisplayState((prevDisplayState) => {
            return prevDisplayState === DisplayState.headers
              ? DisplayState.closeAll
              : DisplayState.headers;
          });
        }}
      >
        Headers
      </Button>
    </div>
  );
}

export default ParamsControls;
