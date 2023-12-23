import { useState } from 'react';
import ParamsControls from './ParamsControls';
import ParamsEditor from './ParamsEditor';
import { DisplayState } from './types';

type ParamsProps = {
  headers: string;
  variables: string;
  setHeaders: (newHeaders: string) => void;
  setVariables: (newVariables: string) => void;
};

function Params({ headers, variables, setHeaders, setVariables }: ParamsProps) {
  const [displayState, setDisplayState] = useState<DisplayState>(
    DisplayState.closeAll
  );

  const editor = {
    [DisplayState.closeAll]: null,
    [DisplayState.variables]: (
      <ParamsEditor value={headers} onChange={setHeaders} />
    ),
    [DisplayState.headers]: (
      <ParamsEditor value={variables} onChange={setVariables} />
    ),
  }[displayState];

  return (
    <div className="w-full">
      <ParamsControls
        displayState={displayState}
        setDisplayState={setDisplayState}
      />
      {editor}
    </div>
  );
}

export default Params;
