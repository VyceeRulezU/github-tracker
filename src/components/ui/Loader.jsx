import { twMerge } from 'tailwind-merge';

export const Loader = ({ className }) => {
  return (
    <div className={twMerge("flex items-center justify-center py-10", className)}>
      <div className="relative">
        <div className="h-10 w-10 rounded-full border-4 border-muted"></div>
        <div className="absolute top-0 h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    </div>
  );
};

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={twMerge("animate-pulse rounded-xl bg-muted/60", className)}
      {...props}
    />
  );
};
