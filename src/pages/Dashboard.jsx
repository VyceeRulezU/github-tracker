import { useFetch } from '../hooks/useFetch';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { githubService } from '../services/githubService';
import { WeatherWidget } from '../components/features/WeatherWidget';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Loader';
import { GitBranch, CheckSquare, MessageSquare, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

export const Dashboard = () => {
  const { data: user, loading: userLoading } = useFetch(githubService.getUserUrl('VyceeRulezU'));
  const [tasks] = useLocalStorage('tasks', []);
  
  const incompleteTasks = tasks.filter(t => !t.completed).slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <WeatherWidget city="Lagos" />
        </div>
        
        <div className="flex-1">
          <Card className="h-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-premium-hover relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <img src={logoImg} className="w-40 h-40 object-contain invert grayscale" alt="" />
            </div>
            <CardHeader>
              <CardTitle className="text-white/80 text-sm font-semibold uppercase tracking-widest flex items-center space-x-2">
                <GitBranch size={16} />
                <span>GitHub Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-48 bg-white/20" />
                  <div className="flex space-x-6">
                    <Skeleton className="h-12 w-16 bg-white/20" />
                    <Skeleton className="h-12 w-16 bg-white/20" />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight">@{user?.login}</h3>
                    <p className="text-white/60 text-sm mt-1">{user?.name}</p>
                  </div>
                  <div className="flex space-x-8">
                    <div>
                      <p className="text-4xl font-bold tracking-tighter">{user?.public_repos}</p>
                      <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Repo Count</p>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div>
                      <p className="text-4xl font-bold tracking-tighter">{user?.followers}</p>
                      <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Followers</p>
                    </div>
                  </div>
                  <Link to="/github">
                    <button className="mt-4 text-xs font-bold uppercase tracking-widest bg-white/10 hover:bg-white/20 py-2.5 px-6 rounded-full transition-all flex items-center group">
                      Explore repos
                      <TrendingUp size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Tasks</CardTitle>
              <Link to="/tasks">
                <button className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">View all</button>
              </Link>
            </CardHeader>
            <CardContent>
              {incompleteTasks.length > 0 ? (
                <div className="space-y-3">
                  {incompleteTasks.map((task) => (
                    <div key={task.id} className="flex items-center space-x-4 p-4 bg-accent/30 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm font-semibold flex-1 truncate">{task.text}</span>
                      <span className="text-[10px] font-bold text-muted-foreground bg-accent px-2 py-1 rounded-md">{new Date(task.createdAt).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center bg-accent/20 rounded-3xl border-2 border-dashed border-border/50">
                  <CheckSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-20" />
                  <p className="text-sm text-muted-foreground font-medium">No pending tasks. Great job!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Goal Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-5 bg-orange-50 dark:bg-orange-900/10 rounded-3xl border border-orange-100 dark:border-orange-900/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <Zap className="text-white w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-orange-700 dark:text-orange-400">Weekly Goal</span>
                </div>
                <p className="text-xs text-orange-600/80 dark:text-orange-400/80 leading-relaxed font-medium">
                  Stay active! You've completed {tasks.filter(t => t.completed).length} tasks this week. Keep up the momentum.
                </p>
              </div>
              
              <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                <div className="flex justify-between items-end mb-2">
                  <h4 className="text-sm font-bold">Activity Progress</h4>
                  <span className="text-xs font-black text-primary">65%</span>
                </div>
                <div className="w-full bg-accent h-2.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-primary h-full" 
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-3 font-bold uppercase tracking-wider">65% of monthly target reached</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
