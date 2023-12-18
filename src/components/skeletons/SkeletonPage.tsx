import Skeleton from './Skeleton';
import PageWrapper from '../ui/PageWrapper';

function SkeletonPage() {
  return (
    <PageWrapper>
      <Skeleton className="h-12 w-1/6 mb-8" />
      <Skeleton className="h-8 w-1/3 mb-4" />
      <Skeleton className="h-8 w-1/3 mb-4" />
      <Skeleton className="h-8 w-1/3 mb-4" />
      <Skeleton className="h-8 w-1/3 mb-4" />
      <Skeleton className="h-8 w-1/3 mb-4" />
    </PageWrapper>
  );
}

export default SkeletonPage;
