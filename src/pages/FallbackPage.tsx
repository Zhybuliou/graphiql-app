import React from 'react';
import { PageWrapper } from '../components/ui/PageWrapper';
import { UiButton } from '../components/ui/UiButton';

type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export function FallbackPage({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <PageWrapper>
      <h1>Something went wrong</h1>
      <pre className="mb-4 p-4 text-red-700 bg-gray-200">{error.message}</pre>
      <UiButton type="button" onClick={resetErrorBoundary}>
        Go to Main
      </UiButton>
    </PageWrapper>
  );
}
