import { useRef, useState, type FormEvent } from 'react';
import { Button } from '@/shared/ui/Button';
import { PRIORITIES, PRIORITY_LABELS, type NewTask, type Priority } from '../model/task';

type NewTaskFormProps = {
  onAdd: (input: NewTask) => void;
};

export function NewTaskForm({ onAdd }: NewTaskFormProps) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [error, setError] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = title.trim();
    if (trimmed.length < 3) {
      setError('Le titre doit contenir au moins 3 caractères.');
      titleRef.current?.focus();
      return;
    }
    onAdd({ title: trimmed, priority, dueDate: dueDate || undefined });
    setTitle('');
    setDueDate('');
    setPriority('medium');
    setError(null);
    titleRef.current?.focus();
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="new-task-title" className="text-sm font-semibold">Titre de la tâche</label>
        <input
          ref={titleRef}
          id="new-task-title"
          maxLength={80}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-invalid={error !== null}
          aria-describedby={error ? 'new-task-title-error' : undefined}
          className="w-full rounded-md border border-line bg-bg px-3 py-2 aria-invalid:border-danger"
        />
        {error && <p id="new-task-title-error" className="text-sm text-danger">{error}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="new-task-due" className="text-sm font-semibold">Échéance</label>
        <input
          id="new-task-due"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          className="w-full rounded-md border border-line bg-bg px-3 py-2"
        />
      </div>
      <fieldset className="flex flex-wrap items-center gap-3 rounded-md border border-line p-3">
        <legend className="px-1 text-sm font-semibold">Priorité</legend>
        {PRIORITIES.map((value) => (
          <label key={value} className="flex items-center gap-1">
            <input
              type="radio"
              name="priority"
              checked={priority === value}
              onChange={() => setPriority(value)}
              className="accent-primary"
            />
            {PRIORITY_LABELS[value]}
          </label>
        ))}
      </fieldset>
      <Button type="submit">Ajouter la tâche</Button>
    </form>
  );
}
