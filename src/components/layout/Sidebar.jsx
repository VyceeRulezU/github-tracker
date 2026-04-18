import { NavLink } from 'react-router-dom';
import { LayoutDashboard, GitBranch, CheckSquare, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/logo.png';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: GitBranch, label: 'GitHub Explorer', path: '/github' },
  { icon: CheckSquare, label: 'Task Manager', path: '/tasks' },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-premium border border-border"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar content */}
      <aside className={twMerge(
        "fixed top-0 left-0 bottom-0 w-64 bg-card border-r border-border z-40 transition-transform duration-300 transform lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3 mb-10 px-2 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 shadow-sm border border-border/50 transition-transform duration-500 group-hover:rotate-6">
              <img src={logoImg} alt="GitDash Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-extrabold tracking-tight leading-none">GITDASH</h1>
              <span className="text-[10px] uppercase tracking-widest font-bold text-orange-500 mt-1">Dashboard</span>
            </div>
          </motion.div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item, idx) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
              >
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => twMerge(
                    "flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              </motion.div>
            ))}
          </nav>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-6 border-t border-border"
          >
            <button className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground w-full transition-all duration-200">
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </motion.div>
        </div>
      </aside>
    </>
  );
};
