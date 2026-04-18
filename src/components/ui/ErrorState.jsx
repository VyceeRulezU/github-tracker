import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({ message, onRetry, className }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-10 text-center space-y-4 rounded-2xl border-2 border-dashed border-destructive/20 bg-destructive/5 ${className}`}>
      <div className="p-3 bg-destructive/10 rounded-full">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-destructive">Something went wrong</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          {message || 'We encountered an error while fetching the data. Please check your connection and try again.'}
        </p>
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="mt-2"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try again
        </Button>
      )}
    </div>
  );
};
