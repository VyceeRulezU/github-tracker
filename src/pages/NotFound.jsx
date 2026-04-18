import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 animate-fade-in">
      <div className="relative">
        <h1 className="text-9xl font-black text-primary/5">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <AlertCircle size={80} className="text-primary/20" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you are looking for might have been moved, deleted, or never existed in the first place.
        </p>
      </div>

      <Link to="/">
        <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
          <Home size={18} className="mr-2" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
};
