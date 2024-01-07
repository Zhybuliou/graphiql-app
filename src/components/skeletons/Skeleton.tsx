import { cn } from '../../utils/cn';

export function Skeleton({ className }: { className: string }) {
  return (
    <div
      className={cn(
        'h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse',
        className
      )}
    />
  );
}
