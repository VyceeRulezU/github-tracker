export const Logo = ({ className }) => {
  return (
    <div className={`flex items-center space-x-3 group ${className}`}>
      <div className="relative w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-border/50 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
        <svg viewBox="0 0 100 100" className="w-full h-full p-1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>
          {/* Main ribbon shape */}
          <path 
            d="M15 45L40 70L85 25" 
            stroke="url(#logo-gradient)" 
            strokeWidth="12" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Digital trail pieces */}
          <rect x="75" y="15" width="6" height="6" rx="1" fill="#F97316" className="animate-pulse" />
          <rect x="65" y="5" width="4" height="4" rx="1" fill="#F97316" opacity="0.6" />
          <rect x="85" y="5" width="5" height="5" rx="1" fill="#F97316" opacity="0.4" />
          <rect x="90" y="20" width="4" height="4" rx="1" fill="#F97316" opacity="0.8" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-extrabold tracking-tight leading-none text-foreground">GITHUB</span>
        <span className="text-[10px] font-black tracking-[0.2em] text-orange-500 leading-none mt-1 uppercase">Tracker</span>
      </div>
    </div>
  );
};
