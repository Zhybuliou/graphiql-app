import { Skeleton } from './Skeleton';

export function SkeletonEditor() {
  return (
    <div data-testid="skeleton-editor" className="flex flex-col p-4">
      <Skeleton className="h-4 w-1/3 mb-4" />
      <Skeleton className="h-4 w-1/3" />
      <div className="flex flex-col p-4">
        <Skeleton className="h-4 w-1/3 mb-4" />
        <Skeleton className="h-4 w-1/3 mb-4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className="h-4 w-1/3 mb-4" />
      <Skeleton className="h-4 w-1/3 mb-4" />
      <Skeleton className="h-4 w-1/3 mb-4" />
    </div>
  );
}
