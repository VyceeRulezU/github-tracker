import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={twMerge(
        'bg-card text-card-foreground rounded-2xl border border-border shadow-premium transition-all duration-300 hover:shadow-premium-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }) => (
  <div className={twMerge('flex flex-col space-y-1.5 p-6', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className, ...props }) => (
  <h3 className={twMerge('text-xl font-semibold leading-none tracking-tight', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className, ...props }) => (
  <p className={twMerge('text-sm text-muted-foreground', className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className, ...props }) => (
  <div className={twMerge('p-6 pt-0', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className, ...props }) => (
  <div className={twMerge('flex items-center p-6 pt-0', className)} {...props}>
    {children}
  </div>
);
