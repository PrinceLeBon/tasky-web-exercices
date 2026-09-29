import { create } from 'zustand';
import { loadTasks, saveTasks } from '../data/task-storage';
import { addTask, createTask, deleteTask, toggleTask, type NewTask, type Task } from '../model/task';

type TaskState = {
  tasks: Task[];
  add: (input: NewTask) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
};

export const useTaskStore = create<TaskState>()((set) => ({
  tasks: loadTasks(),
  add: (input) => {
    const task = createTask(input);
    set((state) => ({ tasks: addTask(state.tasks, task) }));
  },
  toggle: (id) => set((state) => ({ tasks: toggleTask(state.tasks, id) })),
  remove: (id) => set((state) => ({ tasks: deleteTask(state.tasks, id) })),
}));

// Persistance : chaque changement de la liste est enregistré
useTaskStore.subscribe((state, previous) => {
  if (state.tasks !== previous.tasks) saveTasks(state.tasks);
});
