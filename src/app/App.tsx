import { TasksPage } from '@/features/tasks';
import { Header } from './Header';

export function App() {
  return (
    <>
      <Header />
      <main className="mx-auto grid max-w-[72rem] gap-6 px-4 py-8">
        <h1 className="text-[clamp(1.5rem,1.2rem+1.5vw,2.25rem)] leading-tight font-bold">Mes tâches</h1>
        <TasksPage />
      </main>
    </>
  );
}
