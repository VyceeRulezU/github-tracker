import { useLocalStorage } from '../hooks/useLocalStorage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { CheckSquare, Filter, LayoutGrid, List, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false, createdAt: new Date() }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    percent: tasks.length ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Task Manager</h1>
          <p className="text-muted-foreground font-medium">Coordinate your development workflow and track progress.</p>
        </div>
        
        <div className="flex bg-accent/30 p-1 rounded-xl border border-border/50">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all capitalize ${filter === f ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Task</CardTitle>
              <CardDescription>What are you working on today?</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={addTask} className="space-y-4">
                <textarea
                  placeholder="Type task description..."
                  className="w-full bg-accent/30 border border-border rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px] font-medium"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <Button type="submit" className="w-full h-11">
                  <Plus size={18} className="mr-2" />
                  Create Task
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground border-none shadow-lg shadow-primary/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <CheckCircle2 size={100} />
            </div>
            <CardHeader>
              <CardTitle className="text-white/80 text-sm font-bold uppercase tracking-widest">Progress Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-4xl font-black">{stats.percent}%</span>
                  <span className="text-sm font-bold text-white/60">{stats.completed}/{stats.total} Tasks</span>
                </div>
                <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.percent}%` }}
                    className="bg-white h-full" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredTasks.length > 0 ? (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <motion.div
                    layout
                    key={task.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`group flex items-center p-4 bg-card border rounded-2xl transition-all ${task.completed ? 'border-border/30 opacity-75' : 'border-border hover:border-primary/30 shadow-sm'}`}
                  >
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-colors ${task.completed ? 'bg-primary border-primary text-white' : 'border-muted-foreground/30 hover:border-primary'}`}
                    >
                      {task.completed && <CheckSquare size={14} />}
                    </button>
                    
                    <span className={`ml-4 flex-1 text-sm font-semibold transition-all ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {task.text}
                    </span>
                    
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-accent/10 rounded-3xl border-2 border-dashed border-border/50">
                <List className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-20" />
                <p className="text-sm text-muted-foreground font-medium">No tasks found. Time to plan something new!</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
