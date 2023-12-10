function Skeleton({ classes }: { classes: string }) {
  return (
    <div
      className={`h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse ${classes}`}
    />
  );
}
export default Skeleton;
