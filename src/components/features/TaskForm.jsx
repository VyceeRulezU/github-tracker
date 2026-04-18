import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask({
        id: Date.now(),
        text: taskName,
        completed: false,
        createdAt: new Date().toISOString()
      });
      setTaskName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="text"
        placeholder="What needs to be done?"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="flex-1 rounded-2xl"
      />
      <Button type="submit" className="rounded-2xl px-6">
        <Plus size={18} className="mr-1" />
        Add
      </Button>
    </form>
  );
};
