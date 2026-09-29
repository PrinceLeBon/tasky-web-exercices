import { useState } from 'react';

/** Le jour local de l'utilisateur, au format « AAAA-MM-JJ » (leçon 12.3). */
export function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Le jour local, lu une fois au montage du composant (et non à chaque rendu :
 * un rendu doit rester pur). Suffisant pour Tasky, qu'on recharge chaque jour.
 */
export function useToday(): string {
  const [today] = useState(() => toLocalIsoDate(new Date()));
  return today;
}
