import './skeleton.css';

type SkeletonProps = {
  classes: string;
};

function Skeleton({ classes }: SkeletonProps) {
  const classNames = `skeleton ${classes} animate-pulse`;
  return <div className={classNames} />;
}
export default Skeleton;
