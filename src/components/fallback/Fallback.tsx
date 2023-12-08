import React from 'react';

type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="page-wrapper">
      <h1>Something went wrong</h1>
      <pre style={{ color: 'red', marginBottom: '1rem' }}>{error.message}</pre>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}

export default Fallback;
