import React from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import Button from '../components/ui/Button';

type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

function FallbackPage({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <PageWrapper>
      <h1>Something went wrong</h1>
      <pre className="mb-4 p-4 text-red-700 bg-gray-200">{error.message}</pre>
      <Button type="button" onClick={resetErrorBoundary}>
        Go to Main
      </Button>
    </PageWrapper>
  );
}

export default FallbackPage;
