import { Star, GitFork, ExternalLink, Calendar, Terminal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Skeleton } from '../ui/Loader';
import { motion, AnimatePresence } from 'framer-motion';

// Component for a consistent Developer/Terminal Icon
const RepoLogo = () => {
  return (
    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center p-1.5 transition-transform group-hover:scale-110 shadow-sm border border-primary/20">
      <Terminal className="text-primary" size={20} />
    </div>
  );
};

export const RepoList = ({ repos, loading }) => {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('updated');

  const filteredRepos = useMemo(() => {
    if (!repos) return [];
    
    let result = repos.filter(repo => 
      repo.name.toLowerCase().includes(filter.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(filter.toLowerCase()))
    );

    if (sortBy === 'stars') {
      result.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else {
      result.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }

    return result;
  }, [repos, filter, sortBy]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-48 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input 
            type="text"
            placeholder="Filter repositories..."
            className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="flex bg-accent/30 p-1 rounded-xl border border-border/50">
          <button 
            onClick={() => setSortBy('updated')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${sortBy === 'updated' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
          >
            Recently Updated
          </button>
          <button 
            onClick={() => setSortBy('stars')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${sortBy === 'stars' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
          >
            Most Stars
          </button>
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredRepos.map((repo) => (
            <motion.div
              layout
              key={repo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="group h-full hover:shadow-premium-hover hover:border-primary/30 transition-all duration-300 border-border/40 overflow-hidden cursor-pointer bg-card/50 backdrop-blur-sm">

                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <RepoLogo />
                      <div>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors truncate max-w-[180px] lg:max-w-xs">{repo.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {repo.language && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                              {repo.language}
                            </span>
                          )}
                          {repo.private && <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-accent rounded-full">Private</span>}
                        </div>
                      </div>
                    </div>
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-accent transition-colors"
                    >
                      <ExternalLink size={16} className="text-muted-foreground" />
                    </a>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1 italic font-medium">
                    {repo.description || "No description provided for this repository."}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold">{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <GitFork size={14} />
                        <span className="text-xs font-bold">{repo.forks_count}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                      <Calendar size={12} />
                      <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredRepos.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground font-medium">No repositories found matching your filter.</p>
        </div>
      )}
    </div>
  );
};
