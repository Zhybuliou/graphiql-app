import React from 'react';
import PageWrapper from '../ui/pageWrapper/PageWrapper';
import Button from '../ui/button/Button';

type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <PageWrapper>
      <h1>Something went wrong</h1>
      <pre className="mb-4 p-4 text-red-700 bg-gray-200">{error.message}</pre>
      <Button type="button" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </PageWrapper>
  );
}

export default Fallback;
