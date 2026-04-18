import { useState } from 'react';
import { Search, GitBranch, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import { githubService } from '../services/githubService';
import { ProfileCard } from '../components/features/ProfileCard';
import { RepoList } from '../components/features/RepoList';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ErrorState } from '../components/ui/ErrorState';

export const GitHubExplorer = () => {
  const [username, setUsername] = useState('VyceeRulezU');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: user, loading: userLoading, error: userError } = useFetch(
    username ? githubService.getUserUrl(username) : null
  );
  
  const { data: repos, loading: reposLoading, error: reposError } = useFetch(
    username ? githubService.getReposUrl(username) : null
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setUsername(searchQuery.trim());
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Search Header */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Explore GitHub</h1>
        <p className="text-muted-foreground text-lg">Analyze any developer profile and their digital impact.</p>
        
        <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Enter GitHub username..." 
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" size="lg">Search</Button>
        </form>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
        {/* Profile Sidebar - Sticky */}
        <div className="xl:col-span-1 space-y-6 sticky top-24">
          {userError ? (
            <ErrorState 
              message={`User "${username}" not found. Please check the spelling.`} 
              onRetry={() => setUsername('VyceeRulezU')}
            />
          ) : (
            <ProfileCard user={user} loading={userLoading} />
          )}

          {user && !userLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden xl:block p-6 rounded-2xl bg-primary/5 border border-primary/10"
            >
              <h4 className="font-bold flex items-center space-x-2 text-primary mb-3">
                <AlertCircle size={16} />
                <span>API Insights</span>
              </h4>
              <p className="text-sm text-primary/80 leading-relaxed font-medium">
                Browsing {user.public_repos} public repositories. Sorting by most recently updated helps you track live project momentum.
              </p>
            </motion.div>
          )}
        </div>

        {/* Repositories Main List - Fill Width Fix */}
        <div className="xl:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <GitBranch size={20} className="text-primary" />
              <span>Repositories</span>
            </h2>
            {repos && (
              <span className="text-xs font-bold px-4 py-1.5 bg-accent rounded-full text-muted-foreground border border-border/50">
                {repos.length} ProjectsFound
              </span>
            )}
          </div>

          {!userError && (
            <RepoList repos={repos} loading={reposLoading} />
          )}
        </div>
      </div>
    </motion.div>
  );
};
