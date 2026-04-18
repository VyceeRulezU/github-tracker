import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

const titleMap = {
  '/': 'Dashboard Overview',
  '/github': 'GitHub Explorer',
  '/tasks': 'Task Manager'
};

export const Layout = () => {
  const location = useLocation();
  const title = titleMap[location.pathname] || 'Developer Dashboard';

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-300">
        <Header title={title} />
        <main className="flex-1 p-4 md:p-8 max-w-screen-2xl mx-auto w-full animate-fade-in">
          <Outlet />
        </main>
      </div>

    </div>
  );
};
