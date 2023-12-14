import { useState } from 'react';
import Button from '../ui/Button';

function GraphQLParams() {
  const [isOpenVariables, setVariablesOpen] = useState(false);
  const [isOpenHeaders, setHeadersOpen] = useState(false);
  return (
    <div className="flex-col">
      <div className="flex space-x-4">
        <div className="flex gap-1">
          <Button
            onClick={() => {
              setVariablesOpen(!isOpenVariables);
              setHeadersOpen(false);
            }}
          >
            Variables
          </Button>
          <Button
            onClick={() => {
              setHeadersOpen(!isOpenHeaders);
              setVariablesOpen(false);
            }}
          >
            Headers
          </Button>
        </div>
      </div>
      {isOpenVariables && (
        <>
          <h2>variables</h2>
          <textarea
            className="border-4 border-cyan-400 rounded my-4 "
            name="variables-area"
            cols={40}
            rows={10}
          />
        </>
      )}
      {isOpenHeaders && (
        <>
          <h2>headers</h2>
          <textarea
            className="border-4 border-cyan-400 rounded my-4 "
            name="headersarea"
            cols={40}
            rows={10}
          />
        </>
      )}
    </div>
  );
}

export default GraphQLParams;
