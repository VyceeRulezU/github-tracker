import { Trash2, CheckCircle, Circle, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { twMerge } from 'tailwind-merge';

export const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className={twMerge(
      "group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300",
      task.completed 
        ? "bg-accent/30 border-border opacity-70" 
        : "bg-white border-border hover:border-primary/30 hover:shadow-sm"
    )}>
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => onToggle(task.id)}
          className={twMerge(
            "transition-colors duration-200",
            task.completed ? "text-primary" : "text-muted-foreground hover:text-primary"
          )}
        >
          {task.completed ? <CheckCircle size={22} fill="currentColor" className="text-primary" /> : <Circle size={22} />}
        </button>
        
        <div className="flex flex-col">
          <span className={twMerge(
            "text-sm font-medium transition-all duration-200",
            task.completed ? "line-through text-muted-foreground" : "text-foreground"
          )}>
            {task.text}
          </span>
          <div className="flex items-center space-x-1 text-[10px] text-muted-foreground mt-0.5">
            <Clock size={10} />
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full w-8 h-8 p-0 transition-opacity"
      >
        <Trash2 size={14} />
      </Button>
    </div>
  );
};
