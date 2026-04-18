import { Search, Bell, User } from 'lucide-react';

export const Header = ({ title }) => {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-background/80 backdrop-blur-md sticky top-0 z-30 transition-all duration-300">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-1.5 bg-accent/50 rounded-full text-sm border-none focus:ring-2 focus:ring-primary/20 transition-all w-64"
          />
        </div>
        
        <button className="p-2 text-muted-foreground hover:bg-accent rounded-full transition-all">
          <Bell size={18} />
        </button>
        
        <div className="flex items-center space-x-2 pl-2 border-l border-border">
          <div className="w-8 h-8 rounded-lg bg-accent overflow-hidden shadow-sm border border-border/10 transition-transform hover:scale-110 duration-300">
            <img 
              src="https://github.com/VyceeRulezU.png" 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-semibold hidden sm:inline-block text-foreground">Vycee</span>
        </div>

      </div>
    </header>
  );
};
