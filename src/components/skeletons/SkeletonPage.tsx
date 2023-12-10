import Skeleton from './Skeleton';
import PageWrapper from '../ui/PageWrapper';

function SkeletonPage() {
  return (
    <PageWrapper>
      <Skeleton classes="h-12 w-1/6 mb-8" />
      <Skeleton classes="h-8 w-1/3 mb-4" />
      <Skeleton classes="h-8 w-1/3 mb-4" />
      <Skeleton classes="h-8 w-1/3 mb-4" />
      <Skeleton classes="h-8 w-1/3 mb-4" />
      <Skeleton classes="h-8 w-1/3 mb-4" />
    </PageWrapper>
  );
}

export default SkeletonPage;
